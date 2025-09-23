"use client";

import styles from "./HeroSection.module.css";
import MainCarousal from "../HomeCarousal/MainCarousal";
import HeroSectionContent from "./HeroSectionContent";
import HeroSectionFooter from "./HeroSectionFooter";
import ShaadiExperience from "./ShaadiExperience";
// import RealStories from "./RealStories";

export default function HeroForm() {
    return (
        <>
            <div className={styles.wrapper}>
                <MainCarousal />
                <HeroSectionContent/>
                <HeroSectionFooter/>
            </div>
            
            <ShaadiExperience/>
            {/* <RealStories/> */}
        </>
    );
}