import styles from "./footer.module.css";

export default function Footer() {
  return (
    <div className="footerdiv">
      <p className="copyright">© 2024</p>
      <ul className="socialLinks">
        <li className="socialLinkItem">Twitter</li>
        <li className="socialLinkItem">Facebook</li>
        <li className="socialLinkItem">LinkedIn</li>
        <li className="socialLinkItem">Instagram</li>
      </ul>
    </div>
  );
}