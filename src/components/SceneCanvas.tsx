import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useUnit } from "effector-react";
import { $primitives, selectPrimitiveId } from "../store/PrimitivesStore";
import { BoxGeometryMesh, PyramidGeometryMesh } from "./Primitives";

export default function SceneCanvas() {
  const primitives = useUnit($primitives);
  const selectedId = useUnit(selectPrimitiveId);

  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      camera={{ position: [0, 5, 10], fov: 90 }}
    >
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />

      {primitives.map((primitive) => {
        const isSelected = primitive.id === selectedId;
        const commonProps = {
          position: primitive.position,
          color: primitive.color,
          selected: isSelected,
          id: primitive.id,
          width: primitive.width,
          height: primitive.height,
          depth: primitive.depth,
        };

        return primitive.type === "box" ? (
          <BoxGeometryMesh key={primitive.id} {...commonProps} />
        ) : (
          <PyramidGeometryMesh key={primitive.id} {...commonProps} />
        );
      })}
    </Canvas>
  );
}
