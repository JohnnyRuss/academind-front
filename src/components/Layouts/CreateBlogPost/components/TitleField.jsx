import styles from "./styles/titleFileld.module.scss"

function TitleField() {
  return (
    <div className={styles.titleBox} data-blog-post-field>
      <label htmlFor='blogPostTitle'>Title</label>
      <input type='text' id='blogPostTitle' placeholder='title' />
    </div>
  );
}

export default TitleField;
