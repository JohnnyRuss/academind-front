import { useScroll } from "../../hooks";
import styles from "./components/bookmarksContainer.module.scss";

function BookmarksContainer({ children }) {
  useScroll({
    target: "elem",
    scrollTo: "bookmark__page--container",
    options: { block: "start" },
  });

  return (
    <div className={styles.bookmarksConainer} id="bookmark__page--container">
      {children}
    </div>
  );
}

export default BookmarksContainer;
