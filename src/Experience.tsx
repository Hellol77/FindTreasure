import { OrbitControls, Sky } from "@react-three/drei";
import Character from "./components/characters/Character";
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useThree } from "@react-three/fiber";
import { Perf } from "r3f-perf";

export default function Experience() {
  const refOrbitControls = useRef<OrbitControlsImpl>(null);
  const refLight = useRef<THREE.DirectionalLight>(null!);
  const refShadowCameraHelper = useRef<THREE.CameraHelper>();
  const refRigid = useRef<RapierRigidBody>(null);

  const scene = useThree((state) => state.scene);
  useEffect(() => {
    const light = refLight.current;
    refShadowCameraHelper.current = new THREE.CameraHelper(light.shadow.camera);
    scene.add(refShadowCameraHelper.current);
    scene.add(light.target);
    return () => {
      scene.remove(refShadowCameraHelper.current!);
      scene.remove(light.target);
    };
  }, [scene]);

  return (
    <>
      <Perf />
      <Sky />
      <OrbitControls
        ref={refOrbitControls}
        enableZoom
        minDistance={5}
        maxDistance={8}
        enablePan={false}
        minPolarAngle={Math.PI / 3} // 상하 이동 제한
        maxPolarAngle={Math.PI / 3}
      />
      {/* <ambientLight intensity={0.2} /> */}
      <directionalLight
        ref={refLight}
        position={[0, 1, 2]}
        intensity={10}
        castShadow
        shadow-mapSize-width={2048} // 그림자 해상도 증가
        shadow-mapSize-height={2048} // 그림자 해상도 증가
        shadow-camera-near={0.5} // 가까운 그림자 거리
        shadow-camera-far={50} // 먼 그림자 거리
        shadow-camera-left={-10} // 그림자 범위 확장
        shadow-camera-right={10} // 그림자 범위 확장
        shadow-camera-top={10} // 그림자 범위 확장
        shadow-camera-bottom={-10} // 그림자 범위 확장
      />
      <Physics debug>
        <RigidBody type="fixed">
          <mesh receiveShadow rotation-x={THREE.MathUtils.degToRad(-90)} scale={100}>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#5d6d72" />
          </mesh>
        </RigidBody>
        <Character refRigid={refRigid} refOrbitControls={refOrbitControls} />
      </Physics>
    </>
  );
}
