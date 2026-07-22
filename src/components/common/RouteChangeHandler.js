"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";

export default function RouteChangeHandler() {
    const pathname = usePathname();

    useEffect(() => {
        if (typeof window === "undefined") return;

        window._suppressAnimationErrors = true;

        // Reset browser scroll
        try {
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        } catch (error) {
            // Silent
        }

        // Reset Lenis scroll instance if active
        if (window.__lenis__) {
            try {
                window.__lenis__.scrollTo(0, { immediate: true });
                window.__lenis__.resize();
            } catch (error) {
                // Silent
            }
        }

        // Delayed refresh to ensure new page DOM, fonts, and images settle
        const t1 = setTimeout(() => {
            try {
                if (window.__lenis__) window.__lenis__.resize();
                ScrollTrigger.refresh();
            } catch (e) {
                // Silent
            }
        }, 100);

        const t2 = setTimeout(() => {
            try {
                if (window.__lenis__) window.__lenis__.resize();
                ScrollTrigger.refresh();
            } catch (e) {
                // Silent
            }
            window._suppressAnimationErrors = false;
        }, 400);

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
        };
    }, [pathname]);

    return null;
}
