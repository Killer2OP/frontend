import styles from "./style.module.css";

export default function WrapperComponent({children}) {
    return (
        <div className={styles.wrapper}>
           {children}
        </div>
    );
}
