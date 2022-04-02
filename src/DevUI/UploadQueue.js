import { useEffect, useRef, useState, useCallback } from "react";
import useInterval from "./useInterval";
import { HOST, USER_ID, USER_TOKEN } from "../constants";

import styles from "./UploadQueue.module.css";

const videoConfig = {
  name: "video",
  device: "",
  accept: "video/mp4",
  uploadEndpoint: `${HOST}/video/upload?user=${USER_ID}&token=${USER_TOKEN}`,
  queueEndpoint: `${HOST}/video/queue?user=${USER_ID}&token=${USER_TOKEN}`,
};

const audioConfig = {
  name: "audio",
  accept: "audio/wav",
  uploadEndpoint: `${HOST}/audio/DEVICE_ID/upload?user=${USER_ID}&token=${USER_TOKEN}`,
  queueEndpoint: `${HOST}/audio/DEVICE_ID/queue?user=${USER_ID}&token=${USER_TOKEN}`,
};

function UploadQueue({ type, device }) {
  const { name, accept, uploadEndpoint, queueEndpoint } =
    type === "audio" ? audioConfig : videoConfig;

  const fileRef = useRef();

  const [queue, setQueue] = useState({ state: "loading" });
  const updateQueue = useCallback(async () => {
    try {
      const resp = await fetch(queueEndpoint.replaceAll("DEVICE_ID", device));
      if (resp.ok) {
        const data = await resp.json();
        setQueue({
          state: "loaded",
          data,
        });
      } else {
        setQueue({
          state: "error",
        });
      }
    } catch (e) {
      setQueue({
        state: "error",
      });
    }
  }, [queueEndpoint, device]);

  useEffect(() => {
    updateQueue();
  }, [updateQueue]);

  useInterval(updateQueue, null);

  const [formState, setFormState] = useState({ state: "idle" });
  async function upload(event) {
    event.preventDefault();
    const fileInput = event.target.elements[0];
    if (fileInput.length < 1) {
      setFormState({ state: "error", errorMessage: "You must select a file." });
      return;
    }

    try {
      setFormState({ state: "submitting" });

      const resp = await fetch(uploadEndpoint.replaceAll("DEVICE_ID", device), {
        method: "post",
        body: new FormData(event.target),
      });
      if (resp.ok) {
        updateQueue();
        setFormState({ state: '"idle"' });
      } else {
        const respText = await resp.text();
        setFormState({ state: "error", errorMessage: respText });
      }
    } catch (e) {
      console.log(e);
      setFormState({ state: "error", errorMessage: e.message });
    }
  }

  let content = null;
  switch (queue.state) {
    case "loading":
      content = "Loading";
      break;
    case "error":
      content = "Error Retrieving Queue";
      break;
    case "loaded":
      const { data } = queue;
      if (data.length > 0) {
        content = (
          <ul className={styles.queueList}>
            {queue.data.map((entry, index) => (
              <li key={index}>
                {entry[0] === USER_ID ? "Yours" : "Competitors"}
              </li>
            ))}
          </ul>
        );
      } else {
        content = (
          <ul className={styles.queueList}>
            <li>Empty</li>
          </ul>
        );
      }
      break;
    default:
      break;
  }
  return (
    <div className={styles.UploadQueue}>
      <form className={styles.form} onSubmit={upload}>
        <div>
          <label htmlFor={name}>
            Select {type === "audio" ? "an" : "a"} {type} file to upload
          </label>
          <input name={name} ref={fileRef} type="file" accept={accept} />
        </div>
        {formState.state === "error" ? (
          <>
            {formState.errorMessage}
            <br />
          </>
        ) : null}
        {formState.state === "submitting" ? (
          <>
            Uploading…
            <br />
          </>
        ) : null}
        <br />
        <button disabled={formState.state === "submitting"}>Upload</button>
      </form>
      <div>
        <div>
          <b>Queue</b>
        </div>
        {content}
      </div>
    </div>
  );
}
export default UploadQueue;
