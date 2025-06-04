import { useRef, useEffect } from "react";
import * as THREE from "three";
import { createBox } from "../geometries/CreateBox";
import { createPyramid } from "../geometries/CreatePyramid";
import { useUnit } from "effector-react";
import { selectPrimitive } from "../store/PrimitivesStore";

type Props = {
  id: string;
  position: [number, number, number];
  color: string;
  selected: boolean;
  width: number;
  height: number;
  depth: number;
};

export function BoxGeometryMesh({
  id,
  position,
  color,
  selected,
  width,
  height,
  depth,
}: Props) {
  const ref = useRef<THREE.Group>(null);
  const select = useUnit(selectPrimitive);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.clear();

    const box = createBox(width, height, depth);
    if (selected) {
      box.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.forEach((mat: THREE.MeshStandardMaterial) => {
            mat.color.set("yellow");
          });
        }
      });
    }

    ref.current.add(box);
  }, [width, height, depth, color, selected]);
  return (
    <group
      ref={ref}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        select(id);
      }}
    />
  );
}

export function PyramidGeometryMesh({
  id,
  position,
  selected,
  width,
  height,
  depth,
}: Props) {
  const ref = useRef<THREE.Group>(null);
  const select = useUnit(selectPrimitive);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.clear();

    const pyramid = createPyramid(width, height, depth);

    if (selected) {
      pyramid.children.forEach((child) => {
        if (child instanceof THREE.Mesh) {
          child.material.forEach((mat: THREE.MeshStandardMaterial) => {
            mat.color.set("yellow");
          });
        }
      });
    }

    ref.current.add(pyramid);
  }, [width, height, depth, selected]);

  return (
    <group
      ref={ref}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        select(id);
      }}
    />
  );
}
