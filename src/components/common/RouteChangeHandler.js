"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

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

        // Let the new route commit before recalculating Lenis. Calling a
        // global ScrollTrigger.refresh() twice on every click forces costly
        // layout work and made navbar navigation feel unresponsive.
        const frame = requestAnimationFrame(() => {
            try {
                if (window.__lenis__) window.__lenis__.resize();
            } catch (e) {
                // Silent
            }
            window._suppressAnimationErrors = false;
        });

        return () => {
            cancelAnimationFrame(frame);
        };
    }, [pathname]);

    return null;
}
