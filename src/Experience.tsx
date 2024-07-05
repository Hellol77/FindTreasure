import { Environment, OrbitControls } from "@react-three/drei";
import Character from "./components/characters/Character";
export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault enablePan={false} />
      {/* <ambientLight intensity={0.2} /> */}
      <directionalLight position={[10, 10, 5]} intensity={0.1} />
      <Environment preset="city" />
      <mesh position={[0, -2, 0]} rotation-y={-0.05}>
        <boxGeometry args={[100, 1, 100]} /> <meshBasicMaterial color="gray" />
      </mesh>
      <Character />
    </>
  );
}
