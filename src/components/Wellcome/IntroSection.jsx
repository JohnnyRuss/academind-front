import styles from "./wellcome.module.scss";

function IntroSection(props) {
  return (
    <section
      className={`${styles.wellComeSection} ${styles.introSection}`}
      id="registerNow"
    >
      <div className={`${styles.sectionWrapper} ${styles.introWrapper}`}>
        <h4 className={styles.introHeading}>where professors stay connected</h4>

        <figure className={styles.introFig}>
          <button className={styles.regBtn}>register now</button>
          <img src="/img/intro-section-bg.png" alt="intro fig" />
        </figure>
      </div>
    </section>
  );
}

export default IntroSection;
