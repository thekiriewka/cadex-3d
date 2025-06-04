import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { addPrimitiveGroup } from "../store/PrimitivesStore";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function PrimitiveForm({ open, onClose }: Props) {
  const [type, setType] = useState<"box" | "pyramid">("box");
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [depth, setDepth] = useState(1);
  const [count, setCount] = useState(1);

  const handleAdd = () => {
    addPrimitiveGroup({
      type,
      width,
      height,
      depth,
      count,
    });

    onClose();
    setCount(1);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            select
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value as "box" | "pyramid")}
          >
            <MenuItem value="box">Box</MenuItem>
            <MenuItem value="pyramid">Pyramid</MenuItem>
          </TextField>

          <TextField
            label="width"
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
          />
          <TextField
            label="height"
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
          />
          <TextField
            label="lenght"
            type="number"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
          />
          <TextField
            label="number"
            type="number"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAdd} variant="contained">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
