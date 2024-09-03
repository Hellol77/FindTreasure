import { useFrame } from "@react-three/fiber";
import { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
export default function useFollewShadowLight({
  refLight,
  refCharacterRigid,
}: {
  refLight: React.MutableRefObject<THREE.DirectionalLight>;
  refCharacterRigid: React.RefObject<RapierRigidBody>;
}) {
  useFrame(() => {
    if (refCharacterRigid.current) {
      const { x: cx, y: cy, z: cz } = refCharacterRigid.current.translation();
      const cPos = new THREE.Vector3(cx, cy, cz);
      const lightRevDir = new THREE.Vector3(0, 1, 1).normalize();
      const newPos = lightRevDir.multiplyScalar(2).add(cPos);
      if (refLight.current) {
        refLight.current.target.position.copy(cPos);
        refLight.current.position.copy(newPos);
      }
    }
  });
}
