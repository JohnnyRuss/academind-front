import { useSelector } from 'react-redux';

import { selectActiveUserInfo } from '../../../store/selectors/userSelectors';

import { Modal } from '../';
import { BTN, InlineStandSpinner } from '../../Interface';
import { UserIdentifier, TextAreaWithTag } from '../';
import styles from './components/styles/createBlogPostModal.module.scss';
import { TitleField, Categories, CreateBlogPostMedia } from './components';

function CreateBlogPost({
  isOpen,
  setIsOpen,
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
  const { userName, image } = useSelector(selectActiveUserInfo);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} className={styles.createBlogPostModal}>
      <div className={styles.fields}>
        {loading && <InlineStandSpinner />}
        <UserIdentifier
          userName={userName}
          img={image}
          withTime={false}
          className={styles.blogPostIdentifier}
        />
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
        <div data-blog-post-field className={styles.articleField}>
          <label>Article</label>
          <TextAreaWithTag
            submitHandler={publishPost}
            text={text}
            setText={handleText}
            tags={tags}
            setTag={handleAddTag}
            removeTag={handleRemoveTag}
            className={styles.blogPostTextField}
            placeholder='article'
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
