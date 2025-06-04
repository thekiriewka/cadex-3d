import * as THREE from "three";

export function createBox(
  width: number,
  height: number,
  depth: number
): THREE.Group {
  const group = new THREE.Group();
  const geometry = new THREE.BoxGeometry(width, height, depth);

  const materials = [];
  for (let i = 0; i < 6; i++) {
    materials.push(
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(Math.random(), Math.random(), Math.random()),
      })
    );
  }

  const mesh = new THREE.Mesh(geometry, materials);

  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: "black" });
  const lines = new THREE.LineSegments(edges, lineMaterial);

  group.add(mesh, lines);
  return group;
}
