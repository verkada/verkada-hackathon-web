import { useEffect, useState } from "react";
import { Sensors, HOST, USER_ID, USER_TOKEN } from "../constants";

function SensorData() {
  const [sensorData, setSensorData] = useState({ state: "loading" });

  const [sensorId, setSensorId] = useState(Sensors[0].id);

  useEffect(() => {
    async function run() {
      setSensorData({ state: "loading" });
      const end = Math.floor(Date.now() / 1000);
      const start = end - 10 * 60;
      const resp = await fetch(
        `${HOST}/sensors/${sensorId}/sensor_data?start=${start}&end=${end}&user=${USER_ID}&token=${USER_TOKEN}`
      );
      if (resp.ok) {
        const json = await resp.json();
        setSensorData({ state: "loaded", data: json });
      } else {
        const text = await resp.text();
        setSensorData({ state: "error", errorMessage: text });
      }
    }
    run();
  }, [sensorId]);

  return (
    <div>
      <h3>Example Sensor Data </h3>
      <div>
        <select onChange={(e) => setSensorId(e.target.value)} value={sensorId}>
          {Sensors.map((sensor) => (
            <option key={sensor.id} value={sensor.id}>
              {sensor.name}
            </option>
          ))}
        </select>
      </div>
      {sensorData.state === "loading" ? "Loading" : null}
      {sensorData.state === "error"
        ? `Error: ${sensorData.errorMessage}`
        : null}
      {sensorData.state === "loaded" ? (
        <pre>
          {JSON.stringify([sensorData.data[0], sensorData.data[1]], null, 2)}
        </pre>
      ) : null}
    </div>
  );
}
export default SensorData;
