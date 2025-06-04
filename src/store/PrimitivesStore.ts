import { createEvent, createStore, combine } from "effector";
import { nanoid } from "nanoid";

export type PrimitiveType = "box" | "pyramid";

export type Primitive = {
  id: string;
  type: PrimitiveType;
  color: string;
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
};

export const addPrimitiveGroup = createEvent<{
  type: PrimitiveType;
  width: number;
  height: number;
  depth: number;
  count: number;
}>();

export const clearPrimitives = createEvent();
export const selectPrimitive = createEvent<string | null>();

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

const getRandomPosition = (): [number, number, number] => [
  (Math.random() - 0.5) * 10,
  (Math.random() + 0.5) * 2,
  (Math.random() - 0.5) * 10,
];

const $primitives = createStore<Primitive[]>([])
  .on(addPrimitiveGroup, (state, { type, width, height, depth, count }) => {
    const newPrimitives: Primitive[] = Array.from({ length: count }, () => ({
      id: nanoid(),
      type,
      color: getRandomColor(),
      position: getRandomPosition(),
      width,
      height,
      depth,
    }));

    return [...state, ...newPrimitives];
  })
  .reset(clearPrimitives);

const $selectedId = createStore<string | null>(null)
  .on(selectPrimitive, (_, id) => id)
  .reset(clearPrimitives);

export const $primitivesState = combine({
  list: $primitives,
  selectedId: $selectedId,
});

export { $primitives, $selectedId as selectPrimitiveId };
