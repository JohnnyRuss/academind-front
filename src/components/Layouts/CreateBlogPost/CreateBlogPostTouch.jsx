import { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  usePostQuery,
  useCreateBlogPost,
  useRestrictBodyOverflow,
} from "../../../hooks";
import { selectCreateBlogPost } from "../../../store/selectors/createPostSelectors";
import { selectActiveUserShortInfo } from "../../../store/selectors/activeUserSelectors";

import { fixLineBreaks } from "../../../lib";

import styles from "./components/styles/createBlogPostTouch.module.scss";
import CreateBlogPostModal from "./CreateBlogPostModal";
import { MultiMediaIcon } from "../Icons/icons";
import { UserIdentifier } from "../";

function CreateBlogPostTouch({ className }) {
  const { userName, image } = useSelector(selectActiveUserShortInfo);

  const {
    createBlogPostIsOpen,
    title,
    text,
    tags,
    labels,
    category,
    files,
    loadingState: { loading, error, message },
    audience,
    blogPostError,
  } = useSelector(selectCreateBlogPost);

  const {
    // activation
    activateModal,
    // audience
    handleAudience,
    // title
    handleTitle,
    // article
    handleText,
    // labels
    label,
    setLabel,
    handleAddLabel,
    handleRemoveLabel,
    // category
    handleCategory,
    //tags
    handleAddTag,
    handleRemoveTag,
    // media files
    handleMediaFiles,
    handleRemoveMediaFile,
  } = useCreateBlogPost({ key: "publish", error: blogPostError });

  const { publishPostQuery } = usePostQuery();

  function publishPost() {
    publishPostQuery({
      params: {
        type: "blogPost",
        operationType: "publish",
      },
      credentials: {
        audience,
        title,
        article: fixLineBreaks(text),
        media: files,
        tags: JSON.stringify(tags.map((tag) => tag._id)),
        labels: JSON.stringify(labels),
        category: category,
      },
    });
  }

  const { restrictScroll } = useRestrictBodyOverflow();

  useEffect(() => {
    if (!createBlogPostIsOpen) restrictScroll(false);
  }, [createBlogPostIsOpen, restrictScroll]);

  return (
    <>
      <div
        onClick={() => activateModal(true)}
        className={`${styles.createBlogPostTouch} ${className || ""}`}
      >
        <UserIdentifier userName={userName} img={image} withTime={false} />
        <input type="text" placeholder="article..." />
        <label
          htmlFor="blogPostMedia"
          className={styles.mediaLabel}
          onClick={() => activateModal(true)}
        >
          <MultiMediaIcon />
          Media
        </label>
      </div>

      {createBlogPostIsOpen && (
        <CreateBlogPostModal
          // loading state
          loading={loading}
          error={error}
          message={message}
          // validation
          validationError={blogPostError}
          // activation
          isOpen={createBlogPostIsOpen}
          setIsOpen={activateModal}
          // audience
          audience={audience}
          handleAudience={handleAudience}
          // title
          title={title}
          handleTitle={handleTitle}
          // article
          text={text}
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
          files={files}
          // publish
          publishPost={publishPost}
        />
      )}
    </>
  );
}

export default CreateBlogPostTouch;
