import {
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { useUnit } from "effector-react";
import {
  $primitives,
  selectPrimitiveId,
  selectPrimitive,
} from "../store/PrimitivesStore";

export default function PrimitiveList() {
  const primitives = useUnit($primitives);
  const selectedId = useUnit(selectPrimitiveId);
  const select = useUnit(selectPrimitive);

  return (
    <List dense sx={{ width: "100%" }}>
      {primitives.map((prim, index) => {
        const isSelected = prim.id === selectedId;
        return (
          <ListItem key={prim.id} disablePadding>
            <ListItemButton
              selected={isSelected}
              onClick={() => select(prim.id)}
              sx={{
                "&.Mui-selected": {
                  borderLeft: "3px solid #1976d2",
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                },
              }}
            >
              <ListItemAvatar>
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    backgroundColor: prim.color,
                    borderRadius: "4px",
                    border: "1px solid #000",
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    fontWeight={isSelected ? "bold" : "normal"}
                  >
                    {prim.type}: {index + 1}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption">
                    pos({prim.position[0].toFixed(1)},{" "}
                    {prim.position[1].toFixed(1)}, {prim.position[2].toFixed(1)}
                    )
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
