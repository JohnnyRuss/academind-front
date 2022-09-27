import styles from './styles/categories.module.scss';
import { CloseIcon } from '../../Icons/icons';

function Categories({ addCategory, category, setCategory, categories }) {
  return (
    <form className={styles.categories} onSubmit={addCategory} data-blog-post-field>
      <label htmlFor='blogPostCategories'>Category</label>
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
  );
}

export default Categories;
