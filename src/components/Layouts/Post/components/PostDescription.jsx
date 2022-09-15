import styles from './styles/postDescription.module.scss';

function PostDescription({ description, className }) {
  return <p className={`${styles.postDescription} ${className}`}>{description}</p>;
}

export default PostDescription;
