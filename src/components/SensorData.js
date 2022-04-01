import { useEffect, useState } from "react";
import { HOST, USER_ID, USER_TOKEN } from "../constants";

function SensorData() {
  const [sensorData, setSensorData] = useState({ state: "loading" });

  useEffect(() => {
    async function run() {
      setSensorData({ state: "loading" });
      const end = Math.floor(Date.now() / 1000);
      const start = end - 60 * 60;
      const resp = await fetch(
        `${HOST}/sensors/e4e9157f-d08c-49e2-a7b0-162d6a15285b/sensor_data?start=${start}&end=${end}&user=${USER_ID}&token=${USER_TOKEN}`
      );
      if (resp.ok) {
        const json = await resp.json();
        setSensorData({ state: "loaded", data: json });
      } else {
        setSensorData({ state: "error" });
      }
    }
    run();
  }, []);

  return (
    <div>
      <h3>Example Sensor Data </h3>
      {sensorData.state === "loading" ? "Loading" : null}
      {sensorData.state === "error" ? "Error" : null}
      {sensorData.state === "loaded" ? (
        <pre>
          {JSON.stringify([sensorData.data[0], sensorData.data[1]], null, 2)}
        </pre>
      ) : null}
    </div>
  );
}
export default SensorData;
