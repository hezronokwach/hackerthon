import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footerdiv}>
      <p className={styles.copyright}>© 2024 LifeShare. Saving Lives Together.</p>
      <ul className={styles.socialLinks}>
        <li className={styles.socialLinkItem}>Twitter</li>
        <li className={styles.socialLinkItem}>Facebook</li>
        <li className={styles.socialLinkItem}>LinkedIn</li>
        <li className={styles.socialLinkItem}>Instagram</li>
      </ul>
    </div>
  );
}