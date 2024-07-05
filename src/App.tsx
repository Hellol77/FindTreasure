import { KeyboardControls } from "@react-three/drei";
import "./App.css";
import Experience from "./Experience";
import { Canvas } from "@react-three/fiber";
function App() {
  return (
    <>
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "left", keys: ["ArrowLeft", "KeyA"] },
          { name: "right", keys: ["ArrowRight", "KeyD"] },
        ]}
      >
        <Canvas>
          <Experience />
        </Canvas>
      </KeyboardControls>
    </>
  );
}

export default App;
