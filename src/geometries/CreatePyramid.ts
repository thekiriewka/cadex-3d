import * as THREE from "three";

function getRandomColor() {
  return new THREE.Color(Math.random(), Math.random(), Math.random());
}

export function createPyramid(
  width: number,
  height: number,
  depth: number
): THREE.Group {
  const geometry = new THREE.BufferGeometry();

  const hw = width / 2;
  const hd = depth / 2;

  const vertices = new Float32Array([
    -hw,
    0,
    -hd,
    hw,
    0,
    -hd,
    hw,
    0,
    hd,
    -hw,
    0,
    hd,
    0,
    height,
    0,
  ]);

  const indices = [0, 1, 2, 2, 3, 0, 0, 1, 4, 1, 2, 4, 2, 3, 4, 3, 0, 4];

  geometry.setIndex(indices);
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  geometry.computeVertexNormals();

  const materials = [];
  for (let i = 0; i < 6; i++) {
    materials.push(
      new THREE.MeshStandardMaterial({
        color: getRandomColor(),
        side: THREE.DoubleSide,
      })
    );
  }

  const groups = [
    { start: 0, count: 6, materialIndex: 0 },
    { start: 6, count: 3, materialIndex: 1 },
    { start: 9, count: 3, materialIndex: 2 },
    { start: 12, count: 3, materialIndex: 3 },
    { start: 15, count: 3, materialIndex: 4 },
  ];
  geometry.clearGroups();
  groups.forEach((group) =>
    geometry.addGroup(group.start, group.count, group.materialIndex)
  );

  const mesh = new THREE.Mesh(geometry, materials);

  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
  const edgeLines = new THREE.LineSegments(edges, lineMaterial);

  const group = new THREE.Group();
  group.add(mesh);
  group.add(edgeLines);

  return group;
}
