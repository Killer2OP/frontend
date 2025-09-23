import { useState } from "react";
import styles from "./sindhisociety.module.css";
import { Wrapper, SectionHeader } from "../mainLayout";

export default function SindhiSociety() {

    const [language, setLanguage] = useState("en"); // default English

    const content = {
        en: {
            headerTitle: "Sindhi Society",
            headerDesc:
                "Sindhi Maitryuen is dedicated to preserving Sindhi culture, building connections, and strengthening our community with trust, transparency, and shared values.",
            bureauTitle: "Sindhi Maitryuen Melap Bureau",
            bureauPara1:
                "Biodata of eligible bride and groom can be downloaded free of cost from our website. This service is designed to help families connect directly, while all information provided by both parties must be verified by themselves. The society does not hold responsibility for mediation or authenticity of details.",
            bureauPara2:
                "A search facility is available to find biodata based on age, education, income, or city. Once a match is found, families are encouraged to connect and take the discussion forward.",
            experienceTitle: "Our Experience & Mediation",
            experiencePara1:
                "In the last two years, Sindhi Panch Mediation & Legal Consultancy Center has successfully resolved over 200 husband-wife disputes. Drawing from this experience, Sindhi Maitryuen Melap Bureau was established to promote harmony and transparency in matrimonial discussions.",
            experiencePara2:
                "To ensure fairness, families are required to share essential details such as income (bank statement), financial records (balance sheet), and a joint family photo. Before finalizing meetings, both sides must exchange a short 1–2 minute residential and business video.",
            experiencePara3:
                "A dedicated meeting room has also been set up in our office for in-person interactions between the bride, groom, and their families.",
            subscriptionTitle: "Quarterly Matching Facility",
            subscriptionPara:
                "To further support families, matching biodata will be sent by post on a quarterly basis for up to one year. A documentation fee of ₹2000 per year is applicable for this service.",
            teamTitle: "Our Team",
            teamPara:
                "At Sindhi Maitryuen, our strength lies in people united by a shared vision—to preserve Sindhi culture, foster connections, and drive community growth with passion and commitment. Our dedicated team works tirelessly to bring transparency, support families, and maintain the cultural values of our community.",
        },

        hi: {
            headerTitle: "सिन्धी सोसाइटी",
            headerDesc:
                "सिन्धी मैत्रीयून का उद्देश्य सिन्धी संस्कृति को संरक्षित करना, रिश्तों को जोड़ना और हमारे समाज को विश्वास, पारदर्शिता और साझा मूल्यों के साथ सशक्त बनाना है।",
            bureauTitle: "सिन्धी मैत्रीयून मेलाप ब्यूरो",
            bureauPara1:
                "विवाह योग्य वर-वधू का बायोडाटा वेबसाइट पर निःशुल्क डाउनलोड किया जा सकता है। इस सेवा में दोनों पक्षों द्वारा दी गई जानकारी की जांच आपको स्वयं करनी होगी। संस्था किसी भी प्रकार की मध्यस्थता या सत्यता की ज़िम्मेदारी नहीं लेगी।",
            bureauPara2:
                "आयु, शिक्षा, आय या शहर के आधार पर बायोडाटा खोजने की सुविधा उपलब्ध है। मेल मिलने पर परिवार सीधे संपर्क कर बातचीत आगे बढ़ा सकते हैं।",
            experienceTitle: "हमारा अनुभव व मध्यस्थता",
            experiencePara1:
                "पिछले दो वर्षों में, सिन्धी पंच मध्यस्थता व विधिक परामर्श केंद्र ने 200 से अधिक पति-पत्नी विवादों को सफलतापूर्वक सुलझाया है। इसी अनुभव के आधार पर सिन्धी मैत्रीयून मेलाप ब्यूरो की स्थापना की गई ताकि विवाह संबंधों में सामंजस्य व पारदर्शिता बनी रहे।",
            experiencePara2:
                "निष्पक्षता सुनिश्चित करने के लिए, परिवारों से आय (बैंक स्टेटमेंट), वित्तीय अभिलेख (बैलेंस शीट), और एक संयुक्त पारिवारिक फोटो साझा करने की अपेक्षा की जाती है। मुलाकात से पहले दोनों पक्षों को 1–2 मिनट का आवासीय और व्यावसायिक वीडियो भी साझा करना होगा।",
            experiencePara3:
                "वर-वधू और परिवारों की प्रत्यक्ष मुलाकात के लिए हमारे कार्यालय में एक अलग बैठक कक्ष की व्यवस्था भी की गई है।",
            subscriptionTitle: "त्रैमासिक मिलान सुविधा",
            subscriptionPara:
                "परिवारों को और सहयोग देने हेतु, मिलान किया गया बायोडाटा सालभर तक हर 3 महीने में डाक द्वारा भेजा जाएगा। इस सेवा हेतु 2000 रुपये वार्षिक शुल्क लागू है।",
            teamTitle: "हमारी टीम",
            teamPara:
                "सिन्धी मैत्रीयून की ताकत उन लोगों में है जो एक साझा दृष्टिकोण से जुड़े हैं—सिन्धी संस्कृति को संरक्षित करना, रिश्ते बनाना और समाज की प्रगति के लिए मिलकर काम करना। हमारी समर्पित टीम पारदर्शिता लाने, परिवारों की मदद करने और समाज की सांस्कृतिक परंपराओं को बनाए रखने में निरंतर कार्यरत है।",
        },
    };

    return (

        <div className={styles.relativeClass}>
            
            <Wrapper>

                <SectionHeader
                    title={content[language].headerTitle}
                    description={content[language].headerDesc}
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

                    {/* Marriage Bureau Section */}
                    <section className={styles.section}>
                        <h2>{content[language].bureauTitle}</h2>
                        <p>{content[language].bureauPara1}</p>
                        <p>{content[language].bureauPara2}</p>
                    </section>

                    {/* Experience & Mediation Section */}
                    <section className={styles.section}>
                        <h2>{content[language].experienceTitle}</h2>
                        <p>{content[language].experiencePara1}</p>
                        <p>{content[language].experiencePara2}</p>
                        <p>{content[language].experiencePara3}</p>
                    </section>

                    {/* Subscription Section */}
                    <section className={styles.section}>
                        <h2>{content[language].subscriptionTitle}</h2>
                        <p>{content[language].subscriptionPara}</p>
                    </section>

                    {/* Team Section */}
                    <section className={styles.section}>
                        <h2>{content[language].teamTitle}</h2>
                        <p>{content[language].teamPara}</p>
                    </section>

                </div>
            </Wrapper>
        </div>
    );
}
