"use client";

import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { MainCarouselData } from "./MainCarousalData";
import Image from "next/image";
import styles from "./MainCarousal.module.css";

const MainCarousal = () => {
    
    // const responsive = {
    //     0: { items: 1 },       // 1 item on very small screens (e.g., mobile phones)
    //     480: { items: 1 },     // 2 items on small screens (e.g., larger mobile devices)
    //     768: { items: 1 },     // 3 items on tablets and up
    //     1024: { items: 1 },    // 4 items on desktops and larger screens
    // };

    const coursalImages = MainCarouselData.map((item, index) => (
        <div key={index} className={styles.carouselItem}>
            <Image
                src={item.image}
                alt=""
                role="presentation"
                className={styles.carouselImage}
                fill
                priority
            />
        </div>
    ));

    return (
        <AliceCarousel
            items={coursalImages}
            disableButtonsControls
            disableDotsControls
            autoPlay
            autoPlayInterval={2500}
            infinite
        // responsive={responsive}
        // controlsStrategy="alternate"
        // mouseTracking
        // disableDotsControls
        />
    );
};

export default MainCarousal;

// const responsive = {
//     0: { items: 1 },       // 1 item on very small screens (e.g., mobile phones)
//     480: { items: 1 },     // 2 items on small screens (e.g., larger mobile devices)
//     768: { items: 1 },     // 3 items on tablets and up
//     1024: { items: 1 },    // 4 items on desktops and larger screens
// };