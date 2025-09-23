"use client";

import { CheckCircle } from 'lucide-react';
import { SectionHeader, Wrapper } from '../mainLayout';
import styles from './aboutUs.module.css';
import CountUp from 'react-countup';
import Image from 'next/image';
import aboutFirst from "../assets/aboutFirst.png";
import aboutSecond from "../assets/aboutSecond.png";

const Headings = ({ title }) => {
    return (
        <div className={styles.internalPagesHeadingContainer}>
            <h2 className={styles.internalPagesTitle}>{title}</h2>
            <div className={styles.internalPagesDivider}>
                <span className={styles.dividerIcon}>💍</span>
            </div>
        </div>
    );
};

export default function About() {

    const features = [
        {
            heading: "Verified Profiles",
            img: aboutFirst,
            items: [
                "100% verified user profiles",
                "Genuine identity & background checks",
                "Safe and secure platform",
                "Multiple profile verification levels",
                "Active monitoring against fraud",
                "Trustworthy matchmaking system",
            ]
        },
        {
            heading: "Personalized Matches",
            img: aboutSecond,
            items: [
                "Smart matchmaking algorithm",
                "Filter by community, profession, lifestyle",
                "AI-based compatibility suggestions",
                "Daily match recommendations",
                "Advanced search with preferences",
                "High response success rate",
            ]
        },
        {
            heading: "Dedicated Support",
            img: aboutFirst,
            items: [
                "24x7 customer assistance",
                "Personal relationship managers (premium)",
                "Profile guidance and improvement tips",
                "Seamless communication tools",
                "Event & offline meet-up options",
                "Privacy-first interaction system",
            ]
        }
    ];

    const stats = [
        { number: 20000, suffix: "+", label: "Happy Marriages" },
        { number: 500000, suffix: "+", label: "Verified Profiles" },
        { number: 100, suffix: "+", label: "Cities Covered" },
        { number: 24, suffix: "x7", label: "Support Available" },
    ];

    const whyChooseUS = [
        "Trusted platform with thousands of successful stories",
        "Completely verified and safe profiles",
        "AI-powered matchmaking with human touch",
        "End-to-end support from signup to marriage",
        "Transparency and privacy at every step",
    ];

    return (
        <Wrapper>
            <div className={styles.container}>

                <SectionHeader
                    title={"About Us"}
                    description={"We aim to redefine the matrimony experience by making it secure, personalized, and stress-free. Our mission is to connect individuals and families with the right matches and create happy marriages built on trust and compatibility."}
                />

                <div className={styles.cardGrid}>
                    {features.map((section, index) => (
                        <div key={index}>
                            <Headings title={section.heading} />
                              <div className={styles.card}>
                                      <Image src={section.img} alt={section.heading} className={styles.cardImage} />
                                    <div className={styles.cardOverlay}>
                                        <ul className={styles.cardList}>
                                            {
                                                section.items.map((item, idx) => (
                                                    <li key={idx}>
                                                        <CheckCircle className={styles.icon} />
                                                        <span>{item}</span>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                        </div>
                    ))}
                </div>

                <div className={styles.ourStoryGrid}>
                    <div>
                        <Headings title={"Our Story"} />
                        <p className={styles.storyParagraph}>
                            Metrimoni was founded with a vision to bring trust, transparency, and technology together for marriage seekers. 
                            What started as a small community-driven initiative has now become a trusted platform connecting thousands of families 
                            and helping create countless successful marriages.
                        </p>
                    </div>

                    <div>
                        <Headings title={"Why Us ?"} />
                        <ul className={styles.valueList}>
                            {whyChooseUS.map((item, index) => (
                                <li key={index}>
                                    <CheckCircle className={styles.icon}/> <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={styles.statsSection}>
                    <Headings title={"Our Journey in Numbers"} />
                    <div className={styles.statsGrid}>
                        {stats.map((item, index) => (
                            <div key={index} className={styles.statCard}>
                                <h3>
                                    <CountUp end={item.number} duration={2} />
                                    {item.suffix}
                                </h3>
                                <p>{item.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </Wrapper>
    );
}
