import { useSelector } from "react-redux";

import { selectActiveUserShortInfo } from "../../../store/selectors/activeUserSelectors";

import {
  UserIdentifier,
  TextAreaWithTag,
  SelectAudience,
  Modal,
  BTN,
  InlineStandSpinner,
} from "../";
import styles from "./components/styles/createBlogPostModal.module.scss";
import { TitleField, Categories, CreateBlogPostMedia } from "./components";

function CreateBlogPost({
  isOpen,
  setIsOpen,
  audience,
  handleAudience,
  title,
  handleTitle,
  text,
  handleText,
  category,
  setCategory,
  categories,
  handleAddCategory,
  handleRemoveCategory,
  tags,
  handleAddTag,
  handleRemoveTag,
  handleMediaFiles,
  handleRemoveMediaFile,
  publishPost,
  files,
  loading,
}) {
  const { userName, image } = useSelector(selectActiveUserShortInfo);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className={styles.createBlogPostModal}
    >
      <div className={styles.fields}>
        {loading && <InlineStandSpinner />}
        <UserIdentifier
          userName={userName}
          img={image}
          withTime={false}
          className={styles.blogPostIdentifier}
        >
          <div className={styles.blogPostAudience}>
            <SelectAudience
              audience={audience}
              handleAudience={handleAudience}
              isBlogPostAudience={true}
            />
          </div>
        </UserIdentifier>
        <div className={styles.titleAndCategoryBox}>
          <TitleField value={title} setTitle={handleTitle} />
          <Categories
            addCategory={handleAddCategory}
            removeCategory={handleRemoveCategory}
            category={category}
            setCategory={setCategory}
            categories={categories}
          />
        </div>
        <div className={styles.articleField}>
          <label>Article</label>
          <TextAreaWithTag
            submitHandler={publishPost}
            text={text}
            setText={handleText}
            tags={tags}
            setTag={handleAddTag}
            removeTag={handleRemoveTag}
            className={styles.blogPostTextField}
            placeholder="article"
            maxRows={8}
          />
        </div>
        <CreateBlogPostMedia
          handleMediaFiles={handleMediaFiles}
          files={files}
          handleRemoveMediaFile={handleRemoveMediaFile}
        />
        <div className={styles.publishBtnBox}>
          <BTN className={styles.publishBlogPostBtn} onClick={publishPost}>
            POST
          </BTN>
        </div>
      </div>
    </Modal>
  );
}

export default CreateBlogPost;
