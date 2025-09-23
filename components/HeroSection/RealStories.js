"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./RealStories.module.css";
import WrapperComponent from "@/app/container/HomePageWrapper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ajinkya_ashwini from "../../app/assets/ajinkya_ashwini.jpg";
import piyas_anindita from "../../app/assets/piyas_anindita.jpg";


const successStories = [
    {
        name: "Ajinkya & Ashwini",
        text: "Thank you Shaadi.com! I found my soulmate here. After chatting, we involved our families—now we're happily engaged as of 9th May 2025!",
        image: ajinkya_ashwini,
        alt: "Ajinkya and Ashwini",
    },
    {
        name: "Rohit & Sonam",
        text: "We met on Shaadi.com and found our perfect match. Thank you for helping me find my soulmate and begin this beautiful new chapter of life!",
        image: piyas_anindita,
        alt: "Rohit and Sonam",
    },
    {
        name: "Ajinkya & Ashwini",
        text: "Thank you Shaadi.com! I found my soulmate here. After chatting, we involved our families—now we're happily engaged as of 9th May 2025!",
        image: piyas_anindita,
        alt: "Ajinkya and Ashwini",
    },
    {
        name: "Rohit & Sonam",
        text: "We met on Shaadi.com and found our perfect match. Thank you for helping me find my soulmate and begin this beautiful new chapter of life!",
        image: ajinkya_ashwini,
        alt: "Rohit and Sonam",
    },
    {
        name: "Ajinkya & Ashwini",
        text: "Thank you Shaadi.com! I found my soulmate here. After chatting, we involved our families—now we're happily engaged as of 9th May 2025!",
        image: ajinkya_ashwini,
        alt: "Ajinkya and Ashwini",
    },
    {
        name: "Rohit & Sonam",
        text: "We met on Shaadi.com and found our perfect match. Thank you for helping me find my soulmate and begin this beautiful new chapter of life!",
        image: piyas_anindita,
        alt: "Rohit and Sonam",
    },
    {
        name: "Ajinkya & Ashwini",
        text: "Thank you Shaadi.com! I found my soulmate here. After chatting, we involved our families—now we're happily engaged as of 9th May 2025!",
        image: piyas_anindita,
        alt: "Ajinkya and Ashwini",
    },
    {
        name: "Rohit & Sonam",
        text: "We met on Shaadi.com and found our perfect match. Thank you for helping me find my soulmate and begin this beautiful new chapter of life!",
        image: ajinkya_ashwini,
        alt: "Rohit and Sonam",
    },
];

export default function SuccessStoriesSection() {
    
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevStory = () => {
        setCurrentIndex((prev) =>
            prev === 0 ? successStories.length - 2 : prev - 2
        );
    };

    const nextStory = () => {
        setCurrentIndex((prev) =>
            prev >= successStories.length - 2 ? 0 : prev + 2
        );
    };

    // Pick 2 stories at a time
    const visibleStories = successStories.slice(
        currentIndex,
        currentIndex + 2
    );

    // If at the end, wrap around
    if (visibleStories.length < 2) {
        visibleStories.push(successStories[0]);
    }

    const progressPercentage =
        ((currentIndex + 2) / successStories.length) * 100;

    return (
        <WrapperComponent>
            <section>
                <div className={styles.container}>
                    <div className={styles.left}>
                        <h2 className={styles.title}>
              Real Stories, True
              <br />
              Connections
            </h2>
                        <p className={styles.lead}>
Discover how Shaadi has united countless couples through genuine connections and shared values. From meaningful conversations to family involvement, every journey is unique—and your success story could be the next inspiring tale of love and togetherness!                        </p>
                        <Link href="/stories" className={styles.cta}>
                            Know more →
                        </Link>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.cards}>
                            {
                                visibleStories.map((story, index) => (
                                    <article className={styles.card} key={index}>
                                        <div className={styles.cardImage}>
                                            <Image
                                                src={story.image}
                                                alt={story.alt}
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <div className={styles.cardBody}>
                                            <h3 className={styles.cardTitle}>{story.name}</h3>
                                            <p className={styles.cardText}>{story.text}</p>
                                        </div>
                                    </article>
                                ))
                            }
                        </div>

                        <div className={styles.progressWrap}>
                            <div className={styles.progressBar}>
                                <div
                                    className={styles.progressActive}
                                    style={{ width: `${progressPercentage}%` }}
                                />
                            </div>

                            <div className={styles.controls}>
                                <button
                                    className={styles.ctrlBtn}
                                    aria-label="previous"
                                    onClick={prevStory}
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    className={styles.ctrlBtn}
                                    aria-label="next"
                                    onClick={nextStory}
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </WrapperComponent>
    );
}