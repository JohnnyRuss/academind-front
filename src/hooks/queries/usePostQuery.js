import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  createPost,
  setCreateBlogPostError,
} from "../../store/reducers/createPostReducer";

import {
  updatePost,
  sharePost,
  setUpdateBlogPostError,
} from "../../store/reducers/portalReducer";

import {
  deletePost,
  reactOnPost,
  savePost,
  changePostAudience,
  // NaN API Tasks
  resetErrorOnPost,
} from "../../store/reducers/postsDataReducer";

import { useValidateCreatePost } from "../";

function usePostQuery() {
  const dispatch = useDispatch();

  const { validateCreateBlogPost, validateCreatePost } =
    useValidateCreatePost();

  const [startDeletion, setStartDeletion] = useState(false);

  // includes post publish and update requests
  // const handlePostPublish = ({ operationType, type, description, media, tags, postId }) => {}
  const publishPostQuery = ({ params, credentials }) => {
    credentials.type = params.type;

    // const type = params.type;
    // const isMediaAndTags =
    //   JSON.parse(credentials.tags)[0] && credentials.media[0];

    // if (
    //   (type === "post" && !isMediaAndTags && !credentials.description) ||
    //   (type === "blogPost" && !isMediaAndTags && !credentials.article)
    // ) {
    //   return;
    // }

    configureMediasFiles({ credentials });

    function publisher() {
      if (params.operationType === "update")
        dispatch(
          updatePost({
            params: { postId: credentials.postId },
            body: credentials,
          })
        );
      else if (params.operationType === "publish")
        dispatch(createPost(credentials));
    }

    if (params.type === "post") {
      const error = validateCreatePost(credentials);
      const { error: isError } = error;
      // console.log(credentials);
      if (isError) return;

      // publisher();
    } else if (params.type === "blogPost") {
      const error = validateCreateBlogPost(credentials);
      const { error: isError } = error;
      // console.log(credentials);
      if (isError && params.operationType === "publish")
        return dispatch(setCreateBlogPostError(error));
      if (isError && params.operationType === "update")
        return dispatch(setUpdateBlogPostError(error));

      publisher();
    }
  };

  function deletePostQuery(postId) {
    setStartDeletion(true);
    dispatch(deletePost(postId));
  }

  function reactOnPostQuery({ postReaction, postId }) {
    const reaction = JSON.parse(postReaction);
    dispatch(reactOnPost({ postId, body: { reaction } }));
  }

  function sharePostQuery(postId, credentials) {
    const body = {
      description: credentials.description,
      audience: credentials.audience,
      tags: JSON.stringify(credentials.tags?.map((tag) => tag._id)),
    };

    dispatch(sharePost({ postId, body }));
  }

  function savePostQuery(postId) {
    dispatch(savePost(postId));
  }

  function changePostAudienceQuery(postId, audience) {
    dispatch(changePostAudience({ params: { postId }, body: { audience } }));
  }

  // NaN API Tasks
  function handleResetPostError() {
    dispatch(resetErrorOnPost());
  }

  return {
    publishPostQuery,
    deletePostQuery,
    reactOnPostQuery,
    sharePostQuery,
    savePostQuery,
    changePostAudienceQuery,
    startDeletion,
    // NaN API Tasks
    handleResetPostError,
  };
}

export default usePostQuery;

function configureMediasFiles({ credentials }) {
  /*
    when user tries to update post which one already has media files, we need to separate old and new media files in different properties. images variable will hold new media files which will be uploaded on db and media property will hold the existng media files, even if user deletes on the post all old media files, we need to send empty array on db and then db will compare each other old and new media properties and files which will not be matched will be deleted from db 
    */
  const oldMedia = credentials.media.filter(
    (media) => typeof media === "string"
  );

  const newFiles = credentials.media.filter(
    (media) => typeof media === "object"
  );

  credentials.media = JSON.stringify(oldMedia);
  if (newFiles[0]) credentials.images = newFiles;
}
