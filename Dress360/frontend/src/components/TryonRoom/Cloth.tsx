import * as THREE from 'three';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    eyebrow001Mesh: THREE.SkinnedMesh;
    eyelashes03Mesh: THREE.SkinnedMesh;
    female_elegantsuit01Mesh: THREE.SkinnedMesh;
    ["high-polyMesh"]: THREE.SkinnedMesh;
    oldladuyMesh: THREE.SkinnedMesh;
    shoes03Mesh: THREE.SkinnedMesh;
    short03Mesh: THREE.SkinnedMesh;
    teeth_baseMesh: THREE.SkinnedMesh;
    tongue01Mesh: THREE.SkinnedMesh;
    spine: THREE.Bone;
    spine_1: THREE.Bone;
  };
  materials: {
    ["eyebrow001.001"]: THREE.MeshStandardMaterial;
    ["eyelashes03.001"]: THREE.MeshStandardMaterial;
    ["female_elegantsuit01.001"]: THREE.MeshStandardMaterial;
    ["high-poly.001"]: THREE.MeshStandardMaterial;
    ["oldladuy.001"]: THREE.MeshStandardMaterial;
    ["shoes03.001"]: THREE.MeshStandardMaterial;
    ["short03.001"]: THREE.MeshStandardMaterial;
    ["teeth_base.001"]: THREE.MeshStandardMaterial;
    ["tongue01.001"]: THREE.MeshStandardMaterial;
  };
  animations: THREE.AnimationClip[];
};

export function Model(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF(
    "../../../blenderStuff/changeCloth/Cloth.glb"
  ) as GLTFResult;

  // Change the color of short03 to blue
  materials["short03.001"].color = new THREE.Color('black');
  materials["female_elegantsuit01.001"].color = new THREE.Color('blue');
  materials["shoes03.001"].color = new THREE.Color('brown');

  return (
    <group {...props} dispose={null} position={[0, -2, 0]} scale={[0.58, 0.58, 0.58]}>
      <group
        position={[1.036, 2.124, -1.945]}
        rotation={[0.141, -0.205, -0.119]}
      >
        <primitive object={nodes.spine} />
      </group>
      <group position={[0, 0.161, -0.139]}>
        <primitive object={nodes.spine_1} />
        <skinnedMesh
          geometry={nodes.eyebrow001Mesh.geometry}
          material={materials["eyebrow001.001"]}
          skeleton={nodes.eyebrow001Mesh.skeleton}
        />
        <skinnedMesh
          geometry={nodes.eyelashes03Mesh.geometry}
          material={materials["eyelashes03.001"]}
          skeleton={nodes.eyelashes03Mesh.skeleton}
        />
        <skinnedMesh
          geometry={nodes.female_elegantsuit01Mesh.geometry}
          material={materials["female_elegantsuit01.001"]}
          skeleton={nodes.female_elegantsuit01Mesh.skeleton}
        />
        <skinnedMesh
          geometry={nodes["high-polyMesh"].geometry}
          material={materials["high-poly.001"]}
          skeleton={nodes["high-polyMesh"].skeleton}
        />
        <skinnedMesh
          geometry={nodes.oldladuyMesh.geometry}
          material={materials["oldladuy.001"]}
          skeleton={nodes.oldladuyMesh.skeleton}
        />
        <skinnedMesh
          geometry={nodes.shoes03Mesh.geometry}
          material={materials["shoes03.001"]}
          skeleton={nodes.shoes03Mesh.skeleton}
        />
        <skinnedMesh
          geometry={nodes.short03Mesh.geometry}
          material={materials["short03.001"]}
          skeleton={nodes.short03Mesh.skeleton}
        />
        <skinnedMesh
          geometry={nodes.teeth_baseMesh.geometry}
          material={materials["teeth_base.001"]}
          skeleton={nodes.teeth_baseMesh.skeleton}
        />
        <skinnedMesh
          geometry={nodes.tongue01Mesh.geometry}
          material={materials["tongue01.001"]}
          skeleton={nodes.tongue01Mesh.skeleton}
        />
      </group>
    </group>
  );
}

useGLTF.preload('../../../blenderStuff/changeCloth/Cloth.glb')
