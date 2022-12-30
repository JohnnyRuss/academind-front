import styles from "./styles/categories.module.scss";
import { CloseIcon } from "../../Icons/icons";

function Labels({ addLaebel, removeLabel, label, setLabel, labels, error }) {
  return (
    <div className={styles.categoriesBox} data-blog-post-field>
      <form className={styles.categoriesForm} onSubmit={addLaebel}>
        <label
          title="is required min 1 label and it must starts with '#'"
          htmlFor="blogPostCategories"
        >
          Labels
        </label>
        <input
          type="text"
          id="blogPostCategories"
          placeholder="#label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </form>
      {error.hasError && <p data-create-blogpost-error-box>{error.message}</p>}
      <div className={styles.categoriesList}>
        {labels &&
          labels?.map((category, i) => (
            <span key={`category-${i}`}>
              {category}
              <button onClick={(e) => removeLabel(category)}>
                <CloseIcon />
              </button>
            </span>
          ))}
      </div>
    </div>
  );
}

export default Labels;
