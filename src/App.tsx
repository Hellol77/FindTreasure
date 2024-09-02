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
          { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
          { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        ]}
      >
        <Canvas shadows>
          <Experience />
        </Canvas>
      </KeyboardControls>
    </>
  );
}

export default App;
