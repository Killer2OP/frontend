// mainLayout.js

import React from 'react';
import styles from './mainLayout.module.css';

export const SectionHeader = ({ title, description }) => {
    return (
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            <div className={styles.divider}>
                <span className={styles.dividerIcon}>💍</span>
            </div>
            <p className={styles.description}>{description}</p>
        </div>
    );
};

export const Wrapper = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            {children}
        </div>
    );
};

export const InternalPageWrapper = ({ children }) => {
    return (
        <div className={styles.InternalPageWrapper}>
            {children}
        </div>
    );
};

export const InternalPageHeading = ({ title }) => {
    return (
        <div className={styles.internalPagesHeadingContainer}>
            <h1 className={styles.internalPagesTitle}>{title}</h1>
            <div className={styles.internalPagesDivider}>
                <span className={styles.dividerIcon}>💍</span>
            </div>
        </div>
    );
};
