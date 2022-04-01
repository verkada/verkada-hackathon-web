import { useState } from "react";
import UploadQueue from "./UploadQueue";
import styles from "./DevUIContents.module.css";

function DevUIContents({ open }) {
  const [tab, setTab] = useState("audio");

  return (
    <div>
      <header className={styles.header}>
        <button
          className={`${styles.button} ${tab === "audio" ? styles.selected : null}`}
          onClick={() => setTab("audio")}
        >
          Audio
        </button>
        <button
          className={`${styles.button} ${
            tab === "video" ? styles.selected : ""
          }`}
          onClick={() => setTab("video")}
        >
          Video
        </button>
      </header>

      {open && <UploadQueue key={tab} type={tab} />}
    </div>
  );
}
export default DevUIContents;
