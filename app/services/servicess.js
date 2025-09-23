"use client"

import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./servicess.module.css";
import { SectionHeader, Wrapper } from '../mainLayout';
import { FaUserFriends, FaComments, FaCheckCircle, FaVideo, FaGlassCheers } from 'react-icons/fa';

const servicesData = {
    en: [
        {
            id: 1,
            icon: <FaUserFriends />,
            title: "Marriage Services",
            description: `Sindhi matrimonial services
Facility to download bride and groom biodata
Search based on age, education, and income`
        },
        {
            id: 2,
            icon: <FaComments />,
            title: "Mediation Services",
            description: `Sindhi Panch Mediation & Legal Advice Center
Resolution of husband-wife disputes
Experience resolving 200+ family disputes
Mediation in family conflicts`
        },
        {
            id: 3,
            icon: <FaCheckCircle />,
            title: "Legal Consultancy",
           description: `Legal consultancy center
Guidance on family, marriage, property, and inheritance disputes
Document and agreement drafting
Support in court and mediation
Efficient dispute resolution`
        },
        {
            id: 4,
            icon: <FaVideo />,
            title: "Counseling Services",
            description: `Family counseling
Assistance in improving relationships
Free meeting facility for both parties`
        },
        {
            id: 5,
            icon: <FaGlassCheers />,
            title: "Other Services",
            description: `Income verification
                Financial balance sheet analysis
                Family photography services
                Video documentation (2-minute videos mandatory)`
        }
    ],
    hi: [
        {
            id: 1,
            icon: <FaUserFriends />,
            title: "विवाह सेवा",
            description: `सिंधी मैट्रिमोनियल सेवाएँ
दुल्हन और दूल्हे का बायोडाटा डाउनलोड करने की सुविधा
आयु, शिक्षा और आय के आधार पर खोज सुविधा`
        },
        {
            id: 2,
            icon: <FaComments />,
            title: "मध्यस्थता सेवा",
            description: `सिंधी पंच मध्यस्थता एवं कानूनी परामर्श केंद्र
पति-पत्नी विवादों का समाधान
200+ पारिवारिक विवादों का अनुभव
पारिवारिक संघर्ष में मध्यस्थता`
        },
        {
            id: 3,
            icon: <FaCheckCircle />,
            title: "कानूनी सलाह",
          description: `कानूनी परामर्श केंद्र
पति-पत्नी, विवाह, संपत्ति और विरासत विवाद में मार्गदर्शन
दस्तावेज़ और समझौतों का निर्माण
अदालत और मध्यस्थता में सहायता
विवादों का कुशल समाधान`
        },
        {
            id: 4,
            icon: <FaVideo />,
            title: "परामर्श सेवाएँ",
            description: `पारिवारिक परामर्श
रिश्तों में सुधार में सहायता
दोनों पक्षों के लिए मुफ्त मीटिंग सुविधा`
        },
        {
            id: 5,
            icon: <FaGlassCheers />,
            title: "अन्य सेवाएँ",
            description: `आय सत्यापन
वित्तीय बैलेंस शीट विश्लेषण
पारिवारिक फोटोग्राफी सेवाएँ
वीडियो दस्तावेज़ीकरण (2 मिनट का वीडियो अनिवार्य)`
        }
    ]
};

const Services = () => {
    const [language, setLanguage] = useState("en");

    return (

        <div className={styles.relativeClass}>
            <Wrapper>
                <SectionHeader
                    title={language === "en" ? "Our Services" : "हमारी सेवाएँ"}
                    description={
                        language === "en"
                            ? "Explore our services designed to make your matchmaking journey seamless, personalized, and secure, helping you build meaningful connections with confidence."
                            : "हमारी सेवाओं का अन्वेषण करें जो आपकी मैचमेकिंग यात्रा को सहज, व्यक्तिगत और सुरक्षित बनाने के लिए डिज़ाइन की गई हैं, ताकि आप आत्मविश्वास के साथ सार्थक संबंध बना सकें।"
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
                    <div className={styles.servicesGrid}>
                        {servicesData[language].map((service, index) => (
                            <motion.div
                                key={service.id}
                                className={styles.serviceCard}
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <div className={styles.icon} aria-label={service.title}>{service.icon}</div>
                                <h2 className={styles.title}>{service.title}</h2>
                                <p className={styles.description}>{service.description}</p>
                                <button className={styles.ctaButton}>
                                    {language === "en" ? "Learn More" : "अधिक जानें"}
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default Services;