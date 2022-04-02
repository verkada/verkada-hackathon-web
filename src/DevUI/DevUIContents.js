import { useState } from "react";
import { Speakers } from "./constants";
import UploadQueue from "./UploadQueue";
import styles from "./DevUIContents.module.css";

function DevUIContents({ open }) {
  const [tab, setTab] = useState("audio");

  const [selectedSpeaker, setSelectedSpeaker] = useState(Speakers[0].id);
  return (
    <div>
      <header className={styles.header}>
        <button
          className={`${styles.button} ${
            tab === "audio" ? styles.selected : null
          }`}
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

      {tab === "audio" ? (
        <select
          onChange={(e) => setSelectedSpeaker(e.target.value)}
          value={selectedSpeaker}
        >
          {Speakers.map((speaker) => (
            <option key={speaker.id} value={speaker.id}>
              {speaker.name}
            </option>
          ))}
        </select>
      ) : null}

      {open && (
        <UploadQueue
          key={`${tab}_${selectedSpeaker}`}
          type={tab}
          device={tab === "audio" ? selectedSpeaker : null}
        />
      )}
    </div>
  );
}
export default DevUIContents;
