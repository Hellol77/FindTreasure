import React, { useEffect } from "react";
import * as THREE from "three";

export default function useApplyShadow({
  refTarget,
}: {
  refTarget: React.MutableRefObject<THREE.Object3D>;
}) {
  useEffect(() => {
    refTarget.current.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });
  }, [refTarget]);
}
