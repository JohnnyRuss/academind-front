import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setFile, removeFiles } from '../../../store/reducers/createPostReducer';
import { selectActiveUserInfo } from '../../../store/selectors/userSelectors';

import { Modal } from '../';
import { BTN } from '../../Interface';
import { UserIdentifier, TextAreaWithTag } from '../';
import styles from './components/styles/createBlogPostModal.module.scss';
import { TitleField, Categories, CreateBlogPostMedia } from './components';

function CreateBlogPost({ activateModal }) {
  const dispatch = useDispatch();

  const { userName, image } = useSelector(selectActiveUserInfo);
  const { createBlogPostIsOpen, files } = useSelector(({ createPost }) => createPost);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);

  function addCategory(e) {
    e.preventDefault();
    if (category.startsWith('#')) {
      setCategories((prev) => [...prev, category.replace('#', '')]);
      setCategory('');
    }
  }

  const removeCategory = (category) =>
    setCategories(categories.filter((item) => item !== category));

  const handleMediaFiles = (e) => dispatch(setFile(e.target.files));

  const handleRemoveMediaFile = (media) => dispatch(removeFiles(media));

  const handleTag = (tag) => setTags((prev) => [...prev, tag]);

  const handleRemoveTag = (id) => setTags((prev) => prev.filter((tag) => tag._id !== id));

  function handler(article, tags) {
    const body = {
      article,
      tags,
      title,
      categories,
      type: 'blogPost',
      images: files,
    };
    console.log(body);
    setTitle('');
    setTags([]);
    setCategories([]);
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
          <TitleField value={title} setTitle={setTitle} />
          <Categories
            addCategory={addCategory}
            removeCategory={removeCategory}
            category={category}
            setCategory={setCategory}
            categories={categories}
          />
        </div>
        <div data-blog-post-field className={styles.articleField}>
          <label>Article</label>
          <TextAreaWithTag
            handler={handler}
            text={text}
            setText={setText}
            tags={tags}
            setTag={handleTag}
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
          <BTN className={styles.publishBlogPostBtn}>POST</BTN>
        </div>
      </div>
    </Modal>
  );
}

export default CreateBlogPost;
