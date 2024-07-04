import { OrbitControls } from "@react-three/drei";

export default function Experience() {
  return (
    <>
      <OrbitControls makeDefault enablePan={false} />
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh position={[0, 1, 1]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh rotation-y={-0.05}>
        <boxGeometry args={[100, 1, 100]} />{" "}
        <meshBasicMaterial color="orange" />
      </mesh>
    </>
  );
}
