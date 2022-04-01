import { useCallback, useMemo, useState } from "react";
import { HOST, USER_ID, USER_TOKEN } from "../constants";
import Video from "./Video";

import styles from "./VideoTest.module.css";

const ONE_MINUTE_SECONDS = 60 * 1000;

function VideoTest() {
  const { start, end } = useMemo(
    () => ({
      start: Math.floor((Date.now() - 5 * ONE_MINUTE_SECONDS) / 1000),
      end: Math.floor((Date.now() - 4 * ONE_MINUTE_SECONDS) / 1000),
    }),
    []
  );

  const [videoMode, setVideoMode] = useState("live");
  const src =
    videoMode === "historical"
      ? `${HOST}/devices/1c2dee60-5fe2-4eca-b969-29b88a68eaae/history/video.m3u8?user=${USER_ID}&token=${USER_TOKEN}&start=${start}&end=${end}`
      : `${HOST}/devices/1c2dee60-5fe2-4eca-b969-29b88a68eaae/liveVideo.m3u8?user=${USER_ID}&token=${USER_TOKEN}`;

  const onVideoElement = useCallback((ref) => {
    // Ref is the `video` element
  }, []);

  return (
    <div>
      <h3>Example Video</h3>
      <div>
        <select
          onChange={(e) => setVideoMode(e.target.value)}
          value={videoMode}
        >
          <option value="live">Live</option>
          <option value="historical">Historical</option>
        </select>
      </div>
      <Video className={styles.video} ref={onVideoElement} src={src} />
    </div>
  );
}
export default VideoTest;
