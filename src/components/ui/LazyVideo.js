"use client";

import { useEffect, useRef, useState } from "react";

export default function LazyVideo({
  src,
  shouldLoad = true,
  rootMargin = "700px",
  autoPlay = false,
  preload = "metadata",
  className = "",
  children,
  ...props
}) {
  const videoRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldLoad) return;

    if (!("IntersectionObserver" in window)) {
      queueMicrotask(() => setIsNearViewport(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [rootMargin, shouldLoad]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay || !isNearViewport || !shouldLoad) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
  }, [autoPlay, isNearViewport, shouldLoad, src]);

  const canLoad = shouldLoad && isNearViewport;

  return (
    <video
      ref={videoRef}
      src={canLoad ? src : undefined}
      autoPlay={canLoad ? autoPlay : false}
      preload={canLoad ? preload : "none"}
      className={className}
      {...props}
    >
      {children}
    </video>
  );
}
