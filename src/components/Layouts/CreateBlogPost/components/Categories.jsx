import styles from './styles/categories.module.scss';
import { CloseIcon } from '../../Icons/icons';

function Categories({ addCategory, removeCategory, category, setCategory, categories }) {
  return (
    <div className={styles.categoriesBox} data-blog-post-field>
      <form className={styles.categoriesForm} onSubmit={addCategory}>
        <label htmlFor='blogPostCategories'>Category</label>
        <input
          type='text'
          id='blogPostCategories'
          placeholder='#category'
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </form>
      <div className={styles.categoriesList}>
        {categories &&
          categories?.map((category, i) => (
            <span key={`category-${i}`}>
              {category}
              <button onClick={(e) => removeCategory(category)}>
                <CloseIcon />
              </button>
            </span>
          ))}
      </div>
    </div>
  );
}

export default Categories;
