import styles from "./components/styles/settingsContainer.module.scss";

function SettingsContainer({ children }) {
  return <div className={styles.settingsContainer}>{children}</div>;
}

export default SettingsContainer;
