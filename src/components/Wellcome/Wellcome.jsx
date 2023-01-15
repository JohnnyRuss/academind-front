import styles from "./wellcome.module.scss";
import WellComeNav from "./WellComeNav";
import IntroSection from "./IntroSection";

import { VALID_BLOG_POST_CATEGORIES } from "../../lib/config";

function Wellcome(props) {
  return (
    <div className={styles.wellComeContainer}>
      <WellComeNav />
      <IntroSection />
      <section className={styles.wellComeSection} id="aboutUs">
        <div className={`${styles.sectionWrapper} ${styles.aboutWrapper}`}>
          <blockquote className={styles.aboutText}>
            <i>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              omnis optio, error in vitae temporibus sunt praesentium quaerat et
              quam illo recusandae laborum eaque odio est soluta eveniet quis
              molestias, ullam velit consequatur dolorum qui. Architecto,
              laborum. Doloremque, quos provident. Culpa perferendis nemo dicta
              itaque! Numquam sit sint asperiores odio.
            </i>
          </blockquote>

          <h4 className={styles.aboutHeading}>
            see our articles on wide selection of topics
          </h4>

          <div className={styles.figsBox}>
            <figure className={styles.figBoxItem}>
              <img src="/img/top-rated-publishers.webp" alt="" />
            </figure>
            <figure className={styles.figBoxItem}>
              <img src="/img/top-rated-posts.webp" alt="" />
            </figure>
            <div className={`${styles.categoriesBox} ${styles.figBoxItem}`}>
              {VALID_BLOG_POST_CATEGORIES.map((category) => (
                <span key={category}>{category}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Wellcome;
