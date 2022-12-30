/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

import { useCreateBlogPost } from "../../hooks";
import { useSelector } from "react-redux";

import { usePostQuery, useRestrictBodyOverflow } from "../../hooks";
import { selectUpdateBlogPostPortal } from "../../store/selectors/portalSelectors";

import { fixLineBreaks, inverseLineBreaks } from "../../lib";

import { CreateBlogPostModal } from "../Layouts";

function UpdateBlogPostPortal() {
  const {
    updateBlogPostModalIsOpen,
    updatePostData,
    updatePostMediaFiles,
    updatePostLoadingState: { loading, error, message },
    updateBlogPostError,
  } = useSelector(selectUpdateBlogPostPortal);

  const { _id, title, article, labels, tags, category } = updatePostData;

  const {
    activateModal,
    handleAudience,
    handleTitle,
    handleText,
    label,
    setLabel,
    handleAddLabel,
    handleRemoveLabel,
    handleCategory,
    handleAddTag,
    handleRemoveTag,
    handleMediaFiles,
    handleRemoveMediaFile,
  } = useCreateBlogPost({ key: "update", error: updateBlogPostError });

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
        labels: JSON.stringify(labels),
        category: category,
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
        // loading state
        loading={loading}
        error={error}
        message={message}
        // validation
        validationError={updateBlogPostError}
        // activation
        isOpen={updateBlogPostModalIsOpen}
        setIsOpen={activateModal}
        // audience
        audience={updatePostData.audience}
        handleAudience={handleAudience}
        // title
        title={title}
        handleTitle={handleTitle}
        // article
        text={inverseLineBreaks(article)}
        handleText={handleText}
        // labels
        label={label}
        setLabel={setLabel}
        labels={labels}
        handleAddLabel={handleAddLabel}
        handleRemoveLabel={handleRemoveLabel}
        // category
        category={category}
        handleCategory={handleCategory}
        // tags
        tags={tags}
        handleAddTag={handleAddTag}
        handleRemoveTag={handleRemoveTag}
        // media files
        handleMediaFiles={handleMediaFiles}
        handleRemoveMediaFile={handleRemoveMediaFile}
        files={updatePostMediaFiles}
        // publish
        publishPost={publishPost}
      />
    )
  );
}

export default UpdateBlogPostPortal;
