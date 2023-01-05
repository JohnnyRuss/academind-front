import styles from "./styles/stand.module.scss";
import { MultiCarousel, Image } from "../../../Layouts";

function Stand() {
  return (
    <div className={styles.stand}>
      <MultiCarousel
        className={styles.slider}
        sliderClass={styles.standCarousel}
      >
        <div className={styles.slide}>
          <Image src="/img/blog-bg-1.webp" className={styles.sliderBg} />
          <div className={styles.firstStand}>
            <p className={styles.firstStandTitle}>
              your chance <br /> to access <br />
              <span className={styles.firstStandTitleColorised}>
                global audience
              </span>
            </p>
            <ul className={styles.firstStandList}>
              <li>
                publish your post as a blog post and introduce your opinion all
                of the users
              </li>
              <li>see top rates publlishers and their blog posts</li>
              <li>
                take a quick jump into your interest with category shortcuts
              </li>
              <li>take your role in global interaction</li>
            </ul>
          </div>
        </div>
        <div className={styles.slide}>
          <Image src="/img/blog-bg-2.webp" className={styles.sliderBg} />
          <p className={styles.secondStand}>
            posts which you will publish as a blog post will be accessable{" "}
            <br /> only on the blog page so they not be shown in your friends
            feed
          </p>
        </div>
        <div className={styles.slide}>
          <Image src="/img/blog-bg-3.webp" className={styles.sliderBg} />
          <p className={styles.thirdStand}>
            over the <span className={styles.thirdStandNums}>1 000 000</span>{" "}
            blog post on the page
            <br /> <span className={styles.thirdStandNums}>215</span> post per
            day
          </p>
        </div>
      </MultiCarousel>
    </div>
  );
}

export default Stand;
