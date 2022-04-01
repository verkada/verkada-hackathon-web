import Hls from "hls.js";
import { forwardRef, useEffect, useRef, useState } from "react";

function mergeRefs(refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        ref.current = value;
      }
    });
  };
}

const Video = forwardRef(({ className, src }, ref) => {
  const [videoElement, setVideoElement] = useState();

  const hlsInstanceRef = useRef();

  useEffect(() => {
    if (!videoElement) {
      return;
    }

    if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
      videoElement.src = src;
    } else if (Hls.isSupported()) {
      if (!hlsInstanceRef.current) {
        const hlsInstance = new Hls();
        hlsInstance.attachMedia(videoElement);
        hlsInstanceRef.current = hlsInstance;
      }

      const hls = hlsInstanceRef.current;
      hls.loadSource(src);
    }

    return () => {
      if (hlsInstanceRef.current) {
        hlsInstanceRef.current.destroy();
        hlsInstanceRef.current = null;
      }

      if (videoElement) {
        videoElement.src = "";
      }
    };
  }, [videoElement, src]);

  return (
    <video
      className={className}
      controls
      autoPlay
      muted
      ref={mergeRefs([ref, setVideoElement])}
    />
  );
});
export default Video;
