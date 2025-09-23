"use client"

import React from "react"
import styles from "./HeroSectionContent.module.css"
import Link from "next/link"

const HeroSectionContent = () => {


    return (
        <div className={styles.overlay}>
          
            <div className={styles.content}>
                <h1 className={styles.title}>
                    No. 1 Matchmaking Service for Elites
                </h1>
                {/* <p className={styles.subtitle}>
                    5 Times higher success rates | Assured meetings | Top consultants
                </p> */}
            </div>

            <div className={styles.btnContainer}>
                <Link href={"/register"} className={styles.button}>
                    Register →
                </Link>
            </div>
        </div>
    )
}

export default HeroSectionContent;