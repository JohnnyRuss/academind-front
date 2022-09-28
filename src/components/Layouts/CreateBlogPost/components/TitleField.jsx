import styles from './styles/titleFileld.module.scss';

function TitleField({ value, setTitle }) {
  return (
    <div className={styles.titleBox} data-blog-post-field>
      <label htmlFor='blogPostTitle'>Title</label>
      <input
        type='text'
        id='blogPostTitle'
        value={value}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='title'
      />
    </div>
  );
}

export default TitleField;
