import React, { useState } from 'react';
import styles from "./ourteam.module.css";
import { SectionHeader, Wrapper } from '../mainLayout';

export default function OurTeam() {

    const [language, setLanguage] = useState("en"); // default English

    // Panch Sunvai Team Data
    const panchSunvaiTeam = {
        en: {
            Monday: ["Draupadi Rizhwani", "Aishwarya Udasi", "Kamal Israni", "Girish Bhagwani"],
            Tuesday: ["Reshma Bhatia", "Priya Rohida", "Prem Sawalni", "Hemant Ahuja"],
            Wednesday: ["Chanda Khatri", "Radha Tirthani", "Nikhil Basantani", "Jagdish Ferwani"],
            Thursday: ["Kiran Chawla", "Puran Behrani", "Lalit Belani", "Manohar Motwani"],
            Friday: ["Amla Sharma", "Kanhaiyalal Manghani", "Narendra Ahuja", "Chhavikant Ramnani"]

        },
        hi: {
            सोमवार: ["द्रौपदी रिझवानी", "ऐश्वर्या उदासी", "कमल ईसरानी", "गिरीश भागवानी"],
            मंगलवार: ["रेशमा भाटिया", "प्रिया रोहिदा", "प्रेम सावलनी", "हेमंत आहूजा"],
            बुधवार: ["चंदा खत्री", "राधा तीर्थानी", "निखिल बसंतानी", "जगदीश फेरवानी"],
            गुरुवार: ["किरण चावला", "पुरन बेहरानी", "ललित बेलानी", "मनोहर मोटवानी"],
            शुक्रवार: ["अमला शर्मा", "कन्हैयालाल मंघानी", "नरेंद्र आहूजा", "छविकान्त रामनानी"],
        }
    };

    // Vishesh Team Data
    const visheshTeam = {
        en: [
            "Kishor Kodwani", "Manohar Mamtani", "Sudesh Haswani", "Suresh Ferwani",
            "Gopaldas Pariyani", "Jayshri Virani", "Dr. Madhav Hasani", "Dinesh Rawat",
            "Jayesh Gurnani", "Sanjay Verma", "Deepika Chotwani", "Pankhuri Masand",
            "Ramesh Mulchandani", "Shrichand Bhatia"
        ],
        hi: [
            "किशोर कोडवानी", "मनोहर ममतानी", "सुदेश हासवानी", "सुरेश फेरवानी",
            "गोपालदास परियानी ", "जयश्री विरानी", "डॉ. माधव हसानी", "दिनेश रावत",
            "जयेश गुरनानी", "संजय वर्मा", "दीपिका छोटवानी", "पंखुड़ी मसंद",
            "रमेश मूलचंदानी", "श्रीचंद भाटिया"
        ]
    };

    // Jijnas Team Data
    const jijnasTeam = {
        en: [
            "Rohit Nagdev", "Dilip Mata", "Anil Fatehchandani", "Ghanshyam Ahuja",
            "Namosh Talreja", "Rajkumar Gulani", "Shankar Malkani", "Dev Lalwani",
            "Kartik Israni", "Kishor Pariyani", "Santosh Motlani", "Trilok Gulani",
            "Jagdish Fatehchandani", "Shiv Ku. Jagwani", "Honey Punjabi",
            "Dharmendra Bhatia", "Dharmapal Gangwani"
        ],
        hi: [
            "रोहित नागदेव", "दिलीप माटा", "अनिल फतेहचंदानी", "घनश्याम आहूजा",
            "नमोश तलरेजा", "राजकुमार गुलानी", "शंकर मलकानी", "देव लालवानी",
            "कार्तिक इसरानी", "किशोर परियानी", "संतोष मोटलानी", "त्रिलोक गुलानी",
            "जगदीश फतेहचंदानी", "शिव कु. जगवानी", "हनी पंजाबी",
            "धर्मेन्द्र भाटिया", "धर्मपाल गंगवानी"
        ]
    };

    // Bureau Team Data
    const bureauTeam = {
        en: [
            "Naresh Jadavani", "Suresh Wadhwa", "Vasdev Ghidwani", "Govind Rupani",
            "Hiranand Ahuja", "Roshanlal Kataria", "Anil Karmchandani",
            "Amarlal Punjabi", "Nandlal Jamwani"
        ],
        hi: [
            "नरेश जादवानी", "सुरेश वाधवा", "वासदेव घिडवानी", "गोविंद रुपानी",
            "हीरानंद आहूजा", "रोशनलाल कटारिया", "अनिल करमचंदानी",
            "अमरलाल पंजाबी", "नंदलाल जामवानी"
        ]
    };

    const renderTeamSection = (title, members) => (
        <section>
            <h2 className={styles.subHeading}>{title}</h2>
            <ul className={styles.list}>
                {
                    members.map((name, index) => (
                        <li key={index}>{name}</li>
                    ))
                }
            </ul>
        </section>
    );

    return (
        <div className={styles.relativeClass}>
            <Wrapper>

                <SectionHeader
                    title={language === "en" ? "Our Team" : "हमारी टीम"}
                    description={
                        language === "en"
                            ? "At Sindhi Maitryuen, our strength lies in people united by a shared vision—to preserve Sindhi culture, foster connections, and drive community growth with passion and commitment."
                            : "सिंधी मैत्री में, हमारी ताकत उन लोगों में है जो एक साझा दृष्टिकोण से जुड़े हैं—सिंधी संस्कृति को संरक्षित करने, संबंधों को बढ़ावा देने और समुदाय की वृद्धि को जुनून और प्रतिबद्धता के साथ आगे बढ़ाने के लिए।"
                    }
                />

                <div className={styles.toggleWrapper}>
                    <button
                        className={styles.toggleBtn}
                        onClick={() => setLanguage(language === "en" ? "hi" : "en")}
                    >
                        {language === "en" ? "हिन्दी" : "English"}
                    </button>
                </div>

                <div className={styles.container}>

                    {/* Panch Sunvai Team */}
                    <section>
                        <h2 className={styles.subHeading}>
                            {language === "en" ? "Panch Sunvai Team" : "पंच सुनवाई टीम"}
                        </h2>
                        <div className={styles.grid}>
                            {Object.entries(panchSunvaiTeam[language]).map(([day, members]) => (
                                <div key={day} className={styles.card}>
                                    <h3 className={styles.day}>{day}</h3>
                                    <ul className={styles.members}>
                                        {members.map((name, idx) => (
                                            <li key={idx}>{name}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </section>

                    {renderTeamSection(language === "en" ? "Vishesh Team" : "विशेष टीम", visheshTeam[language])}

                    {renderTeamSection(language === "en" ? "Jijnas Team" : "जिज्ञास टीम", jijnasTeam[language])}

                    {renderTeamSection(language === "en" ? "Bureau Team" : "ब्यूरो टीम", bureauTeam[language])}

                </div>
            </Wrapper>
        </div>
    );
}
