import { useState } from 'react';
import { Modal, MultiCarousel } from '../';
import { TextField } from '../../Interface';
import { CloseIcon } from '../Icons/icons';
import styles from './createBlogPost.module.scss';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1280 },
    items: 4,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1280, min: 960 },
    items: 4,
    slidesToSlide: 3,
  },
  tablet_portrate: {
    breakpoint: { max: 960, min: 464 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

function CreateBlogPost() {
  const [open, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');

  const [medias, setMedias] = useState([]);

  function addCategory(e) {
    e.preventDefault();
    if (category.startsWith('#')) {
      setCategories((prev) => [...prev, category.replace('#', '')]);
      setCategory('');
    }
  }

  function handleMediaFiles(e) {
    setMedias(Object.values(e.target.files));
  }

  return (
    <>
      <Modal isOpen={open} setIsOpen={setIsOpen} className={styles.createBlogPostModal}>
        <div className={styles.fields}>
          <div className={styles.titleBox}>
            <label htmlFor='blogPostTitle'>Title</label>
            <input type='text' id='blogPostTitle' placeholder='title' />
          </div>
          <form className={styles.categories} onSubmit={addCategory}>
            <label htmlFor='blogPostCategories'>Title</label>
            <input
              type='text'
              id='blogPostCategories'
              placeholder='#category'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <div className={styles.categoriesList}>
              {categories.map((category, i) => (
                <span key={`category-${i}`}>
                  {category}
                  <button>
                    <CloseIcon />
                  </button>
                </span>
              ))}
            </div>
          </form>
          <div className={styles.blogPostMediaBox}>
            <label htmlFor='blogPostMedia'>media</label>
            <input type='file' id='blogPostMedia' hidden multiple onChange={handleMediaFiles} />
            <MultiCarousel responsiveness={responsive} arrows={true}>
              {medias.map((media, i) => (
                <figure className={styles.blogPostFigure} key={`blog-post-media-${i}`}>
                  <img src={URL.createObjectURL(media)} alt='blog post media' />
                </figure>
              ))}
            </MultiCarousel>
          </div>
          <TextField minRows={4} />
        </div>
      </Modal>
      <button onClick={() => setIsOpen(true)}>open modal</button>
    </>
  );
}

export default CreateBlogPost;
