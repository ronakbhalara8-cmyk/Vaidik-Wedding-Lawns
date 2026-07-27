"use client";

import { forwardRef, useEffect, useRef, useState } from "react";

/**
 * Keeps a video's URL out of the DOM until it is actually needed.  This is
 * important because `preload="none"` alone can still be ignored by browsers
 * when a video is set to autoplay.
 */
const LazyVideo = forwardRef(function LazyVideo(
  {
    active = false,
    loadWhenVisible = true,
    rootMargin = "200px",
    src,
    children,
    ...videoProps
  },
  forwardedRef
) {
  const videoRef = useRef(null);
  // Always render the initial HTML without a media URL. This prevents the
  // browser from discovering and downloading videos during the first paint.
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (active) setShouldLoad(true);
  }, [active]);

  useEffect(() => {
    if (!loadWhenVisible || shouldLoad || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [loadWhenVisible, rootMargin, shouldLoad]);

  const setRef = (node) => {
    videoRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <video ref={setRef} {...videoProps} preload={shouldLoad ? videoProps.preload : "none"}>
      {shouldLoad && (src ? <source src={src} type="video/mp4" /> : children)}
    </video>
  );
});

export default LazyVideo;
