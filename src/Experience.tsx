import { OrbitControls } from "@react-three/drei";
import Character from "./components/characters/Character";
import { Physics, RigidBody } from "@react-three/rapier";

export default function Experience() {
  return (
    <>
      <OrbitControls
        enableZoom
        minDistance={5}
        maxDistance={8}
        enablePan={false}
        minPolarAngle={Math.PI / 3} // 상하 이동 제한
        maxPolarAngle={Math.PI / 3}
      />
      {/* <ambientLight intensity={0.2} /> */}
      <directionalLight
        position={[0, 3, 5]}
        intensity={11}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={10}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <Physics debug>
        <RigidBody type="fixed">
          <mesh position-y={-0.05} receiveShadow={true}>
            <boxGeometry args={[100, 0.1, 100]} />
            <meshStandardMaterial color="#5d6d72" />
          </mesh>
        </RigidBody>
        <Character />
      </Physics>
    </>
  );
}
