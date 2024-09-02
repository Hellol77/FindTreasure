import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RefObject, useCallback, useRef } from "react";
import { ActionName } from "../Character";
import * as THREE from "three";
import { RapierRigidBody } from "@react-three/rapier";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export const RUN_SPEED = 3;

export default function useUpdateFrame(
  actions: {
    idle: THREE.AnimationAction | null;
    run: THREE.AnimationAction | null;
  },
  refModel: React.MutableRefObject<THREE.Group>,
  refRigid: RefObject<RapierRigidBody>,
  refOrbitControls: RefObject<OrbitControlsImpl>
) {
  const [, getKeys] = useKeyboardControls();
  const refSpeed = useRef(0);
  const refPlayingActionName = useRef<ActionName>();
  const playAction = useCallback(
    (actionName: ActionName) => {
      if (refPlayingActionName.current === actionName) return;
      const action = actions[actionName];
      const prevAction = actions[refPlayingActionName.current!];

      action?.reset().fadeIn(0.5).play();
      prevAction?.fadeOut(0.5);
      refPlayingActionName.current = actionName;
    },
    [actions]
  );

  const getDirectionOffset = useCallback(
    (keys: {
      [K in string]: boolean;
    }) => {
      let directionOffset = 0; // w
      if (keys.forward) {
        if (keys.leftward) {
          directionOffset = Math.PI / 4; // w+a (45)
        } else if (keys.rightward) {
          directionOffset = -Math.PI / 4; // w+d (-45)
        }
      } else if (keys.backward) {
        if (keys.leftward) {
          directionOffset = Math.PI / 4 + Math.PI / 2; // s+a (135)
        } else if (keys.rightward) {
          directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d (-135)
        } else {
          directionOffset = Math.PI; // s (180)
        }
      } else if (keys.leftward) {
        directionOffset = Math.PI / 2; // a (90)
      } else if (keys.rightward) {
        directionOffset = -Math.PI / 2; // d (-90)
      }
      return directionOffset;
    },
    []
  );

  useFrame((state, delta) => {
    const keys = getKeys();

    console.log(keys);

    const camera = state.camera;
    const model = refModel.current;

    const modelPosition = new THREE.Vector3();
    model?.getWorldPosition(modelPosition);

    if (keys.forward || keys.backward || keys.leftward || keys.rightward) {
      playAction("run");
      refSpeed.current = RUN_SPEED;
    } else {
      playAction("idle");
      refSpeed.current = 0;
    }

    const angleCameraDirectionAxisY =
      Math.atan2(camera.position.x - modelPosition.x, camera.position.z - modelPosition.z) +
      Math.PI +
      getDirectionOffset(keys);

    const rotateQuaternion = new THREE.Quaternion();
    rotateQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), angleCameraDirectionAxisY);
    model.quaternion.rotateTowards(rotateQuaternion, THREE.MathUtils.degToRad(5));

    const walkDirection = new THREE.Vector3();
    camera.getWorldDirection(walkDirection);
    walkDirection.y = 0;
    walkDirection.normalize();
    walkDirection.applyAxisAngle(new THREE.Vector3(0, 1, 0), getDirectionOffset(keys));
    const dx = walkDirection.x * (refSpeed.current * delta);
    const dz = walkDirection.z * (refSpeed.current * delta);

    if (refRigid.current) {
      const cx = refRigid.current.translation().x + dx;
      const cy = refRigid.current.translation().y;
      const cz = refRigid.current.translation().z + dz;
      refRigid.current.setTranslation({ x: cx, y: cy, z: cz }, true);

      camera.position.x += dx;
      camera.position.z += dz;
      if (refOrbitControls.current) {
        refOrbitControls.current.target.set(cx, cy, cz);
      }
    }
  });
}
