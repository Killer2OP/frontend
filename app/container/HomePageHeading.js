import styles from "./style.module.css";

export default function Heading({ title, subtitle }) {
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{title}</h1>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
    );
}
