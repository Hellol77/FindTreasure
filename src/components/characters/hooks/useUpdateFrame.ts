import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useRef } from "react";
import { ActionName } from "../Character";

export default function useUpdateFrame(actions: {
  idle: THREE.AnimationAction | null;
  run: THREE.AnimationAction | null;
}) {
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
  useFrame(() => {
    const keys = getKeys();
    console.log(keys);

    if (keys.forward || keys.backward || keys.left || keys.right) {
      playAction("run");
    } else {
      playAction("idle");
    }
  });
}
