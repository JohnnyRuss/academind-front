import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import styles from './components/createPost.module.scss';
import { CreatePostTouch } from './components';
import CreatePostModal from './CreatePostModal';

function CreatePost({ className, handlePost }) {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescriptionn] = useState('');

  const activeSelectedMedia = useSelector(({ createPost }) => createPost.activeSelectedMedia);

  const handleDescription = (e) => setDescriptionn(e.target.value);

  const handlePostSubmit = () => handlePost(description);

  useEffect(() => {
    if (activeSelectedMedia) setIsOpen(true);
  }, [activeSelectedMedia]);

  return (
    <div className={`${styles.createPost} ${className || ''}`}>
      <CreatePostTouch setIsOpen={setIsOpen} />
      {isOpen && (
        <CreatePostModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          handleDescription={handleDescription}
          handlePost={handlePostSubmit}
        />
      )}
    </div>
  );
}

export default CreatePost;
