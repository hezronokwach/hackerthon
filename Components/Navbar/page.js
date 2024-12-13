import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles["nav-link"]}>Home</Link>
      <Link href="/about" className={styles["nav-link"]}>About Us</Link>
      <Link href="/contact" className={styles["nav-link"]}>Contact</Link>
      <Link href="/FAQs" className={styles["nav-link"]}>FAQs</Link>
    </nav>
  );
}