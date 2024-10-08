/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.18 ./public/character1.glb -o ./src/components/Character.tsx
*/

import * as THREE from "three";
import { RefObject, useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useControls } from "leva";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { CapsuleCollider, RigidBody, RapierRigidBody } from "@react-three/rapier";
import useUpdateFrame from "./hooks/useUpdateFrame";
import { GroupProps } from "@react-three/fiber";
import useApplyShadow from "./hooks/useApplyShadow";

export const CHARACTER_HEIGHT = 1.8;
export const CAPSULE_RADIUS = 0.3;

type GLTFResult = GLTF & {
  nodes: {
    EyeLeft001: THREE.SkinnedMesh;
    EyeRight001: THREE.SkinnedMesh;
    Wolf3D_Body001: THREE.SkinnedMesh;
    Wolf3D_Hair001: THREE.SkinnedMesh;
    Wolf3D_Head001: THREE.SkinnedMesh;
    Wolf3D_Outfit_Bottom001: THREE.SkinnedMesh;
    Wolf3D_Outfit_Footwear001: THREE.SkinnedMesh;
    Wolf3D_Outfit_Top001: THREE.SkinnedMesh;
    Wolf3D_Teeth001: THREE.SkinnedMesh;
    mixamorigHips: THREE.Bone;
  };
  materials: {
    ["Wolf3D_Eye.020"]: THREE.MeshStandardMaterial;
    ["Wolf3D_Body.020"]: THREE.MeshStandardMaterial;
    ["Wolf3D_Hair.020"]: THREE.MeshStandardMaterial;
    ["Wolf3D_Skin.020"]: THREE.MeshStandardMaterial;
    ["Wolf3D_Outfit_Bottom.020"]: THREE.MeshStandardMaterial;
    ["Wolf3D_Outfit_Footwear.020"]: THREE.MeshStandardMaterial;
    ["Wolf3D_Outfit_Top.020"]: THREE.MeshStandardMaterial;
    ["Wolf3D_Teeth.020"]: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

export type ActionName = "idle" | "run";
interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}
// // type ContextType = Record<string, React.ForwardRefExoticComponent<JSX.IntrinsicElements['skinnedMesh'] | JSX.IntrinsicElements['bone']>>
// type CharacterProps = {
//   refOrbitControls: RefObject<OrbitControlsImpl>;

interface CharacterProps extends GroupProps {
  refOrbitControls: RefObject<OrbitControlsImpl>;
  refRigid: RefObject<RapierRigidBody>;
}
export default function Character({ refOrbitControls, refRigid, ...props }: CharacterProps) {
  const refModel = useRef<THREE.Group>(null!);
  const { nodes, materials, animations } = useGLTF("/character1.glb") as GLTFResult;
  const { actions } = useAnimations(animations, refModel);

  const animationNames = Object.keys(actions);
  const { animationName } = useControls({
    animationName: {
      value: animationNames[0],
      options: animationNames,
    },
  });

  useEffect(() => {
    const action = actions[animationName as ActionName];
    action?.reset().fadeIn(0.5).play();
    return () => {
      action?.fadeOut(0.5);
    };
  }, [animationName, actions]);

  useEffect(() => {
    const meshes = [
      nodes.EyeLeft001,
      nodes.EyeRight001,
      nodes.Wolf3D_Body001,
      nodes.Wolf3D_Hair001,
      nodes.Wolf3D_Head001,
      nodes.Wolf3D_Outfit_Bottom001,
      nodes.Wolf3D_Outfit_Footwear001,
      nodes.Wolf3D_Outfit_Top001,
      nodes.Wolf3D_Teeth001,
    ];

    meshes.forEach((mesh) => {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
    });
  }, [nodes]);

  useEffect(() => {
    refRigid.current?.lockRotations(true, false);
  }, [refRigid]);

  useUpdateFrame(actions, refModel, refRigid, refOrbitControls);
  useApplyShadow({ refTarget: refModel });
  return (
    <>
      <RigidBody colliders={false} position={[0, 2, 0]} ref={refRigid}>
        <CapsuleCollider args={[CHARACTER_HEIGHT / 2 - CAPSULE_RADIUS, CAPSULE_RADIUS]} />
        <group ref={refModel} {...props} dispose={null} position-y={-CHARACTER_HEIGHT / 2}>
          <group name="Scene">
            <group name="Armature001" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
              <primitive object={nodes.mixamorigHips} />
              <skinnedMesh
                name="EyeLeft001"
                geometry={nodes.EyeLeft001.geometry}
                material={materials["Wolf3D_Eye.020"]}
                skeleton={nodes.EyeLeft001.skeleton}
              />
              <skinnedMesh
                name="EyeRight001"
                geometry={nodes.EyeRight001.geometry}
                material={materials["Wolf3D_Eye.020"]}
                skeleton={nodes.EyeRight001.skeleton}
              />
              <skinnedMesh
                name="Wolf3D_Body001"
                geometry={nodes.Wolf3D_Body001.geometry}
                material={materials["Wolf3D_Body.020"]}
                skeleton={nodes.Wolf3D_Body001.skeleton}
              />
              <skinnedMesh
                name="Wolf3D_Hair001"
                geometry={nodes.Wolf3D_Hair001.geometry}
                material={materials["Wolf3D_Hair.020"]}
                skeleton={nodes.Wolf3D_Hair001.skeleton}
              />
              <skinnedMesh
                name="Wolf3D_Head001"
                geometry={nodes.Wolf3D_Head001.geometry}
                material={materials["Wolf3D_Skin.020"]}
                skeleton={nodes.Wolf3D_Head001.skeleton}
              />
              <skinnedMesh
                name="Wolf3D_Outfit_Bottom001"
                geometry={nodes.Wolf3D_Outfit_Bottom001.geometry}
                material={materials["Wolf3D_Outfit_Bottom.020"]}
                skeleton={nodes.Wolf3D_Outfit_Bottom001.skeleton}
              />
              <skinnedMesh
                name="Wolf3D_Outfit_Footwear001"
                geometry={nodes.Wolf3D_Outfit_Footwear001.geometry}
                material={materials["Wolf3D_Outfit_Footwear.020"]}
                skeleton={nodes.Wolf3D_Outfit_Footwear001.skeleton}
              />
              <skinnedMesh
                name="Wolf3D_Outfit_Top001"
                geometry={nodes.Wolf3D_Outfit_Top001.geometry}
                material={materials["Wolf3D_Outfit_Top.020"]}
                skeleton={nodes.Wolf3D_Outfit_Top001.skeleton}
              />
              <skinnedMesh
                name="Wolf3D_Teeth001"
                geometry={nodes.Wolf3D_Teeth001.geometry}
                material={materials["Wolf3D_Teeth.020"]}
                skeleton={nodes.Wolf3D_Teeth001.skeleton}
              />
            </group>
          </group>
        </group>
      </RigidBody>
    </>
  );
}

useGLTF.preload("/character1.glb");
