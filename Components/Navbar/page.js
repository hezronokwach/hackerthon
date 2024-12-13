import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={`${styles.nav} flex items-center justify-between`}>
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-red-600 mr-6">SavePulse</h1>
      </div>
      <div className="flex space-x-4">
        <Link href="/" className={styles["nav-link"]}>Home</Link>
        <Link href="/about" className={styles["nav-link"]}>About Us</Link>
        <Link href="/contact" className={styles["nav-link"]}>Contact</Link>
        <Link href="/FAQs" className={styles["nav-link"]}>FAQs</Link>
      </div>
    </nav>
  );
}