/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  resetUpdateState,
  setTitle,
  setText,
  addCategory,
  removeCategory,
  addUpdateTag,
  removeUpdateTag,
  setUpdateFile,
  removeUpdateFiles,
  setUpdateAudience,
} from "../../store/reducers/portalReducer";
import { usePostQuery, useRestrictBodyOverflow } from "../../hooks";
import { selectUpdateBlogPostPortal } from "../../store/selectors/portalSelectors";

import { fixLineBreaks, inverseLineBreaks } from "../../lib";

import { CreateBlogPostModal } from "../Layouts";

function UpdateBlogPostPortal() {
  const dispatch = useDispatch();

  const {
    updateBlogPostModalIsOpen,
    updatePostData,
    updatePostMediaFiles,
    updatePostLoadingState: { loading },
  } = useSelector(selectUpdateBlogPostPortal);

  const { _id, title, article, categories, tags } = updatePostData;

  function activateModal() {
    dispatch(resetUpdateState());
  }

  const handleAudience = (audience) => dispatch(setUpdateAudience(audience));

  const handleTitle = (e) => dispatch(setTitle(e.target.value));

  const handleText = (value) => dispatch(setText(value));

  const [category, setCategory] = useState("");

  function handleAddCategory(e) {
    e.preventDefault();
    if (category.startsWith("#")) {
      dispatch(addCategory(category.replace("#", "")));
      setCategory("");
    }
  }

  const handleRemoveCategory = (category) => dispatch(removeCategory(category));

  const handleAddTag = (tag) => dispatch(addUpdateTag(tag));

  const handleRemoveTag = (id) => dispatch(removeUpdateTag(id));

  const handleMediaFiles = (e) => dispatch(setUpdateFile(e.target.files));

  const handleRemoveMediaFile = (media) => dispatch(removeUpdateFiles(media));

  const { publishPostQuery } = usePostQuery();

  function publishPost() {
    publishPostQuery({
      params: {
        operationType: "update",
      },
      credentials: {
        title,
        article: fixLineBreaks(article),
        audience: updatePostData.audience,
        media: updatePostMediaFiles,
        tags: JSON.stringify(tags.map((tag) => tag._id)),
        categories: JSON.stringify(categories),
        postId: _id,
      },
    });
  }

  const { restrictScroll } = useRestrictBodyOverflow();

  useEffect(() => {
    return () => restrictScroll(false);
  }, []);

  return (
    updateBlogPostModalIsOpen && (
      <CreateBlogPostModal
        loading={loading}
        audience={updatePostData.audience}
        handleAudience={handleAudience}
        isOpen={updateBlogPostModalIsOpen}
        setIsOpen={activateModal}
        title={title}
        handleTitle={handleTitle}
        text={inverseLineBreaks(article)}
        handleText={handleText}
        category={category}
        setCategory={setCategory}
        categories={categories}
        handleAddCategory={handleAddCategory}
        handleRemoveCategory={handleRemoveCategory}
        tags={tags}
        handleAddTag={handleAddTag}
        handleRemoveTag={handleRemoveTag}
        handleMediaFiles={handleMediaFiles}
        handleRemoveMediaFile={handleRemoveMediaFile}
        publishPost={publishPost}
        files={updatePostMediaFiles}
      />
    )
  );
}

export default UpdateBlogPostPortal;
