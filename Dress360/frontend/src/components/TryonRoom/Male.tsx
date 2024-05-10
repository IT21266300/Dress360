import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import * as Three from "three";

type GLTFResult = {
  nodes: {
    Asset3DLoadersceneRoot: THREE.Mesh;
  };
  materials: Record<string, THREE.Material>;
};



export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes } = useGLTF("../../../blenderStuff/male.gltf") as any;

  // Create a new material with dark gray color
  const darkGrayMaterial = new THREE.MeshBasicMaterial({ color: "#565657" });

  return (
    <group {...props} dispose={null}>
      {/* Apply the new material to the mesh */}
      <mesh
        geometry={(nodes.Asset3DLoadersceneRoot as THREE.Mesh).geometry}
        material={darkGrayMaterial}
        position={[0, -10, 0]} // Adjust the y-position to move the model downwards
      />
    </group>
  );
}

useGLTF.preload('../../../blenderStuff/male.gltf');
