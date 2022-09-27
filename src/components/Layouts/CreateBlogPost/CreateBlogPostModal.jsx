import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFile, removeFiles } from '../../../store/reducers/createPostReducer';

import { selectActiveUserInfo } from '../../../store/selectors/userSelectors';

import { Modal } from '../';
import { TextField, BTN } from '../../Interface';
import { UserIdentifier } from '../';
import styles from './components/styles/createBlogPostModal.module.scss';
import { TitleField, Categories, CreateBlogPostMedia } from './components';

function CreateBlogPost({ activateModal }) {
  const dispatch = useDispatch();

  const { userName, image } = useSelector(selectActiveUserInfo);
  const { createBlogPostIsOpen, files } = useSelector(({ createPost }) => createPost);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');

  function addCategory(e) {
    e.preventDefault();
    if (category.startsWith('#')) {
      setCategories((prev) => [...prev, category.replace('#', '')]);
      setCategory('');
    }
  }

  function handleMediaFiles(e) {
    dispatch(setFile(e.target.files));
  }

  function handleRemoveMediaFile(media) {
    dispatch(removeFiles(media));
  }

  return (
    <Modal
      isOpen={createBlogPostIsOpen}
      setIsOpen={activateModal}
      className={styles.createBlogPostModal}>
      <div className={styles.fields}>
        <UserIdentifier
          userName={userName}
          img={image}
          withTime={false}
          className={styles.blogPostIdentifier}
        />
        <div className={styles.titleAndCategoryBox}>
          <TitleField />
          <Categories
            addCategory={addCategory}
            category={category}
            setCategory={setCategory}
            categories={categories}
          />
        </div>
        <div data-blog-post-field className={styles.articleField}>
          <label>Article</label>
          <TextField
            minRows={4}
            maxRows={15}
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
          <BTN className={styles.publishBlogPostBtn}>POST</BTN>
        </div>
      </div>
    </Modal>
  );
}

export default CreateBlogPost;
