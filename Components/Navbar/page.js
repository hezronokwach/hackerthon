
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="nav">
      <Link href="/" className="nav-link">Home</Link>
      <Link href="/about" className="nav-link">About Us</Link>
      <Link href="/contact" className="nav-link">Contact</Link>
      <Link href="/FAQs" className="nav-link">FAQs</Link>
    </nav>
  );
}