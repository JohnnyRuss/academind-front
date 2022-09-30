import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectActiveUserInfo } from '../../../store/selectors/userSelectors';
import {
  setCreateBlogPostIsOpen,
  setTitle,
  setText,
  addCategory,
  removeCategory,
  addTag,
  removeTag,
  setFile,
  removeFiles,
} from '../../../store/reducers/createPostReducer';
import { usePostQuery, useRestrictBodyOverflow } from '../../../hooks';

import styles from './components/styles/createBlogPostTouch.module.scss';
import { MultiMediaIcon } from '../Icons/icons';
import { UserIdentifier } from '../';
import CreateBlogPostModal from './CreateBlogPostModal';

function CreateBlogPostTouch() {
  const dispatch = useDispatch();

  const { userName, image } = useSelector(selectActiveUserInfo);
  const {
    createBlogPostIsOpen,
    title,
    text,
    tags,
    categories,
    files,
    loadingState: { loading },
  } = useSelector(({ createPost }) => createPost);

  function activateModal(order) {
    dispatch(setCreateBlogPostIsOpen(order));
  }

  const handleTitle = (e) => dispatch(setTitle(e.target.value));

  const handleText = (value) => dispatch(setText(value));

  const [category, setCategory] = useState('');

  function handleAddCategory(e) {
    e.preventDefault();
    if (category.startsWith('#')) {
      dispatch(addCategory(category.replace('#', '')));
      setCategory('');
    }
  }

  const handleRemoveCategory = (category) => dispatch(removeCategory(category));

  const handleAddTag = (tag) => dispatch(addTag(tag));

  const handleRemoveTag = (id) => dispatch(removeTag(id));

  const handleMediaFiles = (e) => dispatch(setFile(e.target.files));

  const handleRemoveMediaFile = (media) => dispatch(removeFiles(media));

  const { handlePostPublish } = usePostQuery();

  function publishPost() {
    handlePostPublish({
      params: {
        type: 'blogPost',
        operationType: 'publish',
      },
      credentials: {
        title,
        article: text,
        media: files,
        tags: JSON.stringify(tags.map((tag) => tag._id)),
        categories: JSON.stringify(categories),
      },
    });
  }

  const { restrictScroll } = useRestrictBodyOverflow();

  useEffect(() => {
    if (!createBlogPostIsOpen) restrictScroll(false);
  }, [createBlogPostIsOpen, restrictScroll]);

  return (
    <>
      <div onClick={() => activateModal(true)} className={styles.createBlogPostTouch}>
        <UserIdentifier userName={userName} img={image} withTime={false} />
        <input type='text' placeholder='article...' />
        <label
          htmlFor='blogPostMedia'
          className={styles.mediaLabel}
          onClick={() => activateModal(true)}>
          <MultiMediaIcon />
          Media
        </label>
      </div>
      {createBlogPostIsOpen && (
        <CreateBlogPostModal
          loading={loading}
          isOpen={createBlogPostIsOpen}
          setIsOpen={activateModal}
          title={title}
          handleTitle={handleTitle}
          text={text}
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
          files={files}
        />
      )}
    </>
  );
}

export default CreateBlogPostTouch;
