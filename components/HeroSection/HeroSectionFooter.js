import styles from "./HeroSectionFooter.module.css";
import { Map } from "lucide-react";

export default function Footer() {
    return (
        <footer className={styles.footer}>

            <div className={styles.location}>
                <Map size={20} className={styles.icon} />
                <span>Madhya Pradesh, India</span>
            </div>
            
            <div className={styles.right}>© 2025 Sindhi Maitryuen</div>
            
            <div className={styles.right}>Organized by SindhuMuhinji Jijal, Indore</div>
        </footer>
    );
}
