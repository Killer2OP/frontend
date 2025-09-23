"use client"

import Heading from "@/app/container/HomePageHeading";
import styles from "./ShaadiExperience.module.css";
import Image from "next/image";


import cashback from "../../app/assets/cashback.png";
import tick from "../../app/assets/tick.png";
import ai from "../../app/assets/ai.png";
import expert from "../../app/assets/ExpertAdvice.png";
import verified from "../../app/assets/profile.png";
import success from "../../app/assets/SuccessStories.png";
import shaadi from "../../app/assets/shaadi.png";
import WrapperComponent from "@/app/container/HomePageWrapper";

const cardsData = [
    {
        id: 1,
        image: cashback,
        alt: "Money Back",
        title: "30 Day Money Back Guarantee",
        description:
            "Get matched with someone special within 30 days, or we’ll refund your money—guaranteed!"
    },
    {
        id: 2,
        image: tick,
        alt: "Blue Tick",
        title: "Blue Tick to find your Green Flag",
        description:
            "Did you know our blue-tick profiles get 40% more connection requests than others?"
    },
    {
        id: 3,
        image: ai,
        alt: "AI",
        title: "Matchmaking Powered by AI",
        description:
            'Cutting-edge technology with two decades of matchmaking expertise to help you find "the one".'
    },
    {
        id: 4,
        image: expert, // replace with your imported image
        alt: "Expert Advice",
        title: "Expert Advice Anytime",
        description: "Get personalized guidance from our matchmaking experts whenever you need it."
    },
    {
        id: 5,
        image: verified,
        alt: "Verified Profiles",
        title: "Verified Profiles Only",
        description: "Every member is verified to ensure safety and authenticity."
    },
    {
        id: 6,
        image: success,
        alt: "Success Stories",
        title: "Real Success Stories",
        description: "Read stories of couples who found love through our platform."
    }
];

export default function ShaadiExperience() {
    return (
        <WrapperComponent>
               
            <Heading title="The Shaadi Experience" />

            <section className={styles.container}>
             
                <div className={styles.cards}>
                    {
                        cardsData.map( (card) => (
                            <div key={card.id} className={styles.card}>
                                <div className={styles.icon}>
                                    <Image className={styles.cardImage} src={card.image} alt={card.alt} />
                                </div>
                                <h3>{card.title}</h3>
                                <p>{card.description}</p>
                            </div>
                        ))
                    }
                </div>

                <div className={styles.banner}>
                    <div className={styles.bannerImageContainer}>
                        <Image src={shaadi} alt="Vip Shaadi" className={styles.bannerImage} />
                    </div>
                    <div className={styles.bannerText}>
                        <h2 className={styles.bannerTitle}>Discover the Art of Exclusive Matchmaking</h2>
                        <p className={styles.bannerDescription}>
                            With Shaadi.com Elite, experience tailored connections, absolute privacy, and a personalized journey towards finding your perfect partner.
                        </p>
                        <button className={styles.button}>Free Consultation</button>
                    </div>
                </div>

            </section>

        </WrapperComponent>
    );
}