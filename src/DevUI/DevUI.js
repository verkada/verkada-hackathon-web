import { useState } from "react";
import DevUIContents from "./DevUIContents";

import styles from "./DevUI.module.css";

function DevUI() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className={`${styles.DevUI} ${open ? styles.open : null}`}>
      <button className={styles.toggle} onClick={toggle}>
        DevUI
      </button>
      <div className={styles.DevUIContainer}>
        <DevUIContents open={open} />
      </div>
    </div>
  );
}

export default DevUI;
