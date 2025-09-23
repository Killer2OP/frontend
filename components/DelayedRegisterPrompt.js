"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// A lightweight site-wide prompt that appears after 1 minute for new visitors
// who haven't logged in/registered. It auto-hides on auth pages and admin routes.
export default function DelayedRegisterPrompt() {
    const pathname = usePathname();
    const router = useRouter();
    const [show, setShow] = useState(false);

    const isAdmin = pathname?.startsWith("/admin");
    const onAuthPage = pathname === "/login" || pathname?.startsWith("/register");
    const onSuppressedPage = pathname?.startsWith("/services");

    // Do not render at all on admin or auth pages
    const shouldMount = useMemo(() => {
        if (isAdmin) return false;
        if (onAuthPage) return false;
        if (onSuppressedPage) return false;
        return true;
    }, [isAdmin, onAuthPage, onSuppressedPage]);

    useEffect(() => {
        if (!shouldMount) return;

        // If user has previously dismissed, don't show again in this browser for 1 day
        const dismissedAt = localStorage.getItem("register_prompt_dismissed_at");
        if (dismissedAt) {
            const elapsed = Date.now() - Number(dismissedAt);
            const oneDayMs = 24 * 60 * 60 * 1000;
            if (elapsed < oneDayMs) return; // still within cool-off
        }

        // If authenticated (has client_auth cookie), don't show
        const hasAuth = typeof document !== "undefined" && document.cookie.includes("client_auth=");
        if (hasAuth) return;

        // Delay 1 minute before showing prompt
        const timer = setTimeout(() => {
            // Re-check auth right before showing
            const hasAuthNow = document.cookie.includes("client_auth=");
            if (!hasAuthNow) setShow(true);
        }, 60000);

        return () => clearTimeout(timer);
    }, [shouldMount]);

    const close = () => {
        setShow(false);
        localStorage.setItem("register_prompt_dismissed_at", String(Date.now()));
    };

    const goRegister = () => {
        // Save dismissal so we don't keep nagging
        localStorage.setItem("register_prompt_dismissed_at", String(Date.now()));
        router.push("/register");
    };

    if (!shouldMount || !show) return null;

    return (
        <div style={backdropStyles} role="dialog" aria-modal="true" aria-label="Registration prompt">
            <div style={panelStyles}>
                <h3 style={{ margin: "0 0 8px", fontSize: 18 }}>Join our community</h3>
                <p style={{ margin: "0 0 16px", color: "#444" }}>
                    It looks like you&apos;re new here. Create a free account to explore more features.        </p>
                <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <button onClick={close} style={secondaryBtn}>Maybe later</button>
                    <button onClick={goRegister} style={primaryBtn}>Register now</button>
                </div>
            </div>
        </div>
    );
}

const backdropStyles = {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 60,
};

const panelStyles = {
    width: "min(520px, 92vw)",
    background: "#fff",
    borderRadius: 12,
    padding: 16,
    boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
};

const primaryBtn = {
    background: "#7c3aed",
    color: "#fff",
    border: "none",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
};

const secondaryBtn = {
    background: "#f3f4f6",
    color: "#111827",
    border: "1px solid #e5e7eb",
    padding: "10px 14px",
    borderRadius: 8,
    cursor: "pointer",
};
