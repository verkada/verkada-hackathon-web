import SensorData from "./components/SensorData";
import VideoTest from "./components/VideoTest";
import DevUI from "./DevUI/DevUI";

import "./App.css";

function App() {
  return (
    <div className="App">
      <VideoTest />
      <SensorData />
      <DevUI />
    </div>
  );
}

export default App;
