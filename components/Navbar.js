"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoSrc from "../app/assets/logo.png"; // replace with your actual path
import styles from "./Navbar.module.css";
import useMediaQuery from "../app/hooks/MediaQuery";



export default function Navbar() {


    const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
    const isMobile = useMediaQuery("(max-width: 767px)");
    const isDesktop = useMediaQuery("(min-width: 1024px)");


    const [mobileOpen, setMobileOpen] = useState(false);


    useEffect( () => {
        if (!isMobile && mobileOpen) {  // close mobile menu if switching to tablet or desktop view
            setMobileOpen(false);
        }
    }, [isMobile, isTablet, isDesktop, mobileOpen]);
    

 



const navLinks = [
    // { href: "/", label: "Home" },
    // { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/sindhisociety", label: "Sindhi Society" },
    { href: "/ourteam", label: "Our Team" },
    { href: "/contact", label: "Contact Us" }
];



    return (
        <header className={styles.header}>

            <div className={styles.navContainer}>

                <nav className={styles.desktopNav}>
                    
                    <Link
                        href="/"
                        aria-label="Sindhi Maitryuen Matrimony - Home"
                        className={styles.logoContainer}
                    >
                        <Image
                            src={logoSrc}
                            alt="Sindhi Maitryuen Matrimony"
                            width={44}
                            height={44}
                            className="rounded-full"
                        />
                        <div className={styles.logoTextContainer}>
                            <span className={styles.logoTitle}>
                                Sindhi Maitryuen
                            </span>
                        </div>
                    </Link>

                   
                    {  // links and auth buttons 
                        (isDesktop || isTablet) ? (
                            <>
                                <div className={styles.desktopLinks}>
                                    {
                                        navLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={styles.desktopLink}
                                            >
                                                {link.label}
                                                <span className={styles.underline}></span>
                                            </Link>
                                        ))
                                    }
                                </div>

                                <div className={styles.authButtons}>
                                    {/* <Link
                                        href="/register"
                                        className={styles.registerButton}
                                    >
                                        Register
                                    </Link> */}
                                    <Link
                                        href="/login"
                                        className={styles.loginButton}
                                    >
                                        Login
                                    </Link>
                                </div>
                            </>
                        )    
                        : 
                        (   // mobile menu button
                            <div className={styles.mobileNav}>
                                <button
                                    onClick={ () => setMobileOpen(!mobileOpen)}
                                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                                    aria-controls="mobile-menu"
                                    aria-expanded={mobileOpen}
                                    className={styles.mobileMenuButton}
                                >
                                    {
                                        mobileOpen ? (
                                            <svg
                                                className="w-6 h-6"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        ) : (
                                            <svg
                                                className="w-6 h-6"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4 6h16M4 12h16M4 18h16"
                                                />
                                            </svg>
                                        )
                                    }
                                </button>
                            </div>
                        )
                    }
                </nav>

            </div>

            {/* Mobile menu panel */}
            {
                isMobile && (
                    <div
                        id="mobile-menu"
                        aria-hidden={!mobileOpen}
                        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuVisible : styles.mobileMenuHidden}`}
                    >
                        {/* Backdrop */}
                        <div
                            className={`${styles.mobileBackdrop} ${mobileOpen ? styles.mobileBackdropVisible : styles.mobileBackdropHidden
                                }`}
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Panel */}
                        <div
                            className={`${styles.mobilePanel} ${mobileOpen ? styles.mobilePanelVisible : styles.mobilePanelHidden
                                }`}
                        >
                            <div className={styles.mobilePanelContent}>
                                {/* Logo + close */}
                                <div className={styles.mobilePanelHeader}>
                                    <Link href="/" className={styles.logoContainer}>
                                        <Image
                                            src={logoSrc}
                                            alt="Logo"
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                        />
                                        <div>
                                            <span className={styles.logoTitle}>
                                                Sindhi Maitryuen
                                            </span>
                                        </div>
                                    </Link>
                                    <button
                                        onClick={() => setMobileOpen(false)}
                                        aria-label="Close menu"
                                        className={styles.mobileCloseButton}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* Links */}
                                <div className={styles.navLinks}>
                                    {navLinks.map((link, index) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={styles.link}
                                            aria-label={link.label}
                                        
                                        >
                                            {link.label}
                                            <span className={styles.linkUnderline}></span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </header>
    );
}