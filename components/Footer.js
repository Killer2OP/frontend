// components/Footer.jsx
import React from 'react';
import Link from 'next/link';
import {
    Facebook,
    Twitter,
    Instagram,
    // Mail,
    Phone,
    MapPin,
    Video,
    Star,
    Award,
    Home,
    User,
    CheckCircle,
    ThumbsUp
} from 'lucide-react';

import styles from './Footer.module.css';

const iconMap = {
    "Home": <Home size={16} className={styles.iconInline} />,
    "About Us": <User size={16} className={styles.iconInline} />,
    "Services": <CheckCircle size={16} className={styles.iconInline} />,
    "Contact": <Phone size={16} className={styles.iconInline} />
};

const iconMapCustomerCenter = {
    "Customer Video": <Video size={16} className={styles.iconInline} />,
    "Customer Photos": <Star size={16} className={styles.iconInline} />,
    "Reviews": <ThumbsUp size={16} className={styles.iconInline} />,
    "Awards & Certifications": <Award size={16} className={styles.iconInline} />
};

function Footer() {

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* About */}
                    <div className={styles.section}>
                        <h4 className={styles.title}>SindhiMaitryuen.com</h4>
                        <p className={styles.text}>
                            A trusted platform for Sindhi families to connect, interact, and explore matrimonial opportunities in a safe and welcoming environment.
                        </p>
                        <div className={styles.socialIcons}>
                            <Link href="/" aria-label="Facebook" className={styles.icon}>
                                <Facebook size={20} />
                            </Link>
                            <Link href="/" aria-label="Twitter" className={styles.icon}>
                                <Twitter size={20} />
                            </Link>
                            <Link href="/" aria-label="Instagram" className={styles.icon}>
                                <Instagram size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className={styles.section}>
                        <h4 className={styles.title}>Quick Links</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/" className={styles.link}>{iconMap["Home"]} Home</Link></li>
                            <li><Link href="/about" className={styles.link}>{iconMap["About Us"]} About Us</Link></li>
                            <li><Link href="/services" className={styles.link}>{iconMap["Services"]} Services</Link></li>
                            <li><Link href="/contact" className={styles.link}>{iconMap["Contact"]} Contact</Link></li>
                        </ul>
                    </div>

                    {/* Customer Center */}
                    <div className={styles.section}>
                        <h4 className={styles.title}>Customer Center</h4>
                        <ul className={styles.linkList}>
                            <li><Link href="/videos" className={styles.link}>{iconMapCustomerCenter["Customer Video"]} Customer Video</Link></li>
                            <li><Link href="/photos" className={styles.link}>{iconMapCustomerCenter["Customer Photos"]} Customer Photos</Link></li>
                            <li><Link href="/reviews" className={styles.link}>{iconMapCustomerCenter["Reviews"]} Reviews</Link></li>
                            <li><Link href="/awards" className={styles.link}>{iconMapCustomerCenter["Awards & Certifications"]} Awards & Certifications</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className={styles.section}>
                        <h4 className={styles.title}>Contact</h4>
                        <ul className={styles.infoList}>
                            <li>
                                <MapPin size={18} className={styles.iconInline} /> Verma Hall, Devshree Talkies Complex, Loha Mandi Road, Indore 452012
                            </li>
                            <li>
                                <Phone size={18} className={styles.iconInline} /> +91 96857 40080
                            </li>
                            {/* <li>
                                <Mail size={18} className={styles.iconInline} /> info@sindhimaitryuen.com
                            </li> */}
                        </ul>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <p>&copy; 2025 SindhiMaitryuen.com. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
