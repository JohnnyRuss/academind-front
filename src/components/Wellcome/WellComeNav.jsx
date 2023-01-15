import styles from "./wellcome.module.scss";

function WellComeNav(props) {
  return (
    <nav className={styles.wellComeNav}>
      <a href="#registerNow">register now</a>
      <a href="#aboutUs">about us</a>
      <a href="#section3">testimonials</a>
      <a href="#section4">who we are</a>
    </nav>
  );
}

export default WellComeNav;
