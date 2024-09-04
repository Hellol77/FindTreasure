import { Environment, OrbitControls, Sky } from "@react-three/drei";
import Character from "./components/characters/Character";
import { Physics, RapierRigidBody, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useThree } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import useFollewShadowLight from "./hooks/useFollewShadowLight";
import { Model as Stage } from "./Stage";
export default function Experience() {
  const refOrbitControls = useRef<OrbitControlsImpl>(null);
  const refLight = useRef<THREE.DirectionalLight>(null!);
  const refShadowCameraHelper = useRef<THREE.CameraHelper>();
  const refRigid = useRef<RapierRigidBody>(null);
  const shadowCameraSize = 20;
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

  useFollewShadowLight({ refLight, refCharacterRigid: refRigid });

  return (
    <>
      <Perf />
      <Sky />
      <OrbitControls
        ref={refOrbitControls}
        enableZoom
        minDistance={5}
        maxDistance={8}
        makeDefault
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
        shadow-normalBias={0.1}
        shadow-mapSize={[1024 * 4, 1024 * 4]}
        shadow-camera-near={1}
        shadow-camera-far={25}
        shadow-camera-top={shadowCameraSize}
        shadow-camera-bottom={-shadowCameraSize}
        shadow-camera-right={shadowCameraSize}
        shadow-camera-left={-shadowCameraSize}
      />
      <Environment preset="city" />
      <Sky />
      <Physics>
        <RigidBody type="fixed" colliders="trimesh">
          <Stage />
        </RigidBody>

        <Character refRigid={refRigid} refOrbitControls={refOrbitControls} />
      </Physics>
    </>
  );
}
