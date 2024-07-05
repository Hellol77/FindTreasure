import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import { ActionName } from "../Character";
import * as THREE from "three";

export default function useUpdateFrame(
  actions: {
    idle: THREE.AnimationAction | null;
    run: THREE.AnimationAction | null;
  },
  refModel: React.MutableRefObject<THREE.Group>
) {
  const [, getKeys] = useKeyboardControls();

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
  useFrame((state) => {
    const keys = getKeys();
    console.log(keys);

    const camera = state.camera;
    const model = refModel.current;

    const modelPosition = new THREE.Vector3();
    model?.getWorldPosition(modelPosition);

    const angleCameraDirectionAxisY =
      Math.atan2(
        camera.position.x - modelPosition.x,
        camera.position.z - modelPosition.z
      ) + Math.PI;

    const rotateQuaternion = new THREE.Quaternion();
    rotateQuaternion.setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      angleCameraDirectionAxisY
    );
    model.quaternion.rotateTowards(
      rotateQuaternion,
      THREE.MathUtils.degToRad(5)
    );

    if (keys.forward || keys.backward || keys.left || keys.right) {
      playAction("run");
    } else {
      playAction("idle");
    }
  });
}
