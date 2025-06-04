import { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import SceneCanvas from "./components/SceneCanvas";
import { PrimitiveForm } from "./components/PrimitiveForm";
import { clearPrimitives } from "./store/PrimitivesStore";
import PrimitiveList from "./components/PrimitiveList";

export default function App() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box
        sx={{
          width: "20%",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #ccc",
          p: 2,
        }}
      >
        <Box>
          <Box
            sx={{ flexGrow: 1, overflowY: "auto", maxHeight: "70vh", mb: 2 }}
          >
            <PrimitiveList />
          </Box>
        </Box>

        <Stack spacing={2}>
          <Button variant="contained" onClick={() => setOpenForm(true)}>
            Add group
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => clearPrimitives()}
          >
            Clear scene
          </Button>
        </Stack>
      </Box>

      <Box sx={{ width: "80%", height: "100%" }}>
        <SceneCanvas />
      </Box>

      <PrimitiveForm open={openForm} onClose={() => setOpenForm(false)} />
    </Box>
  );
}
