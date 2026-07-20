import styles from "../navbar/Navbar.module.css"
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate()
  return (
    <nav className={styles.navbar}>
      <div className={styles.leftNav}>
        <div className={styles.menuBtn} id="menuBtn">
          ☰
        </div>

        <div className={styles.logo}>
          <span className={styles.logoBox}>
            Razor<span className={styles.logoText}>pay</span>
          </span>
        </div>
      </div>
      <div className={styles.navActions}>
        <button className={styles.proBtn}>Unlock Pro</button>
      </div>
    </nav>
  );
};
