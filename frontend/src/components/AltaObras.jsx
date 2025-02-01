import { Typography, TextField, Stack, Button } from "@mui/material";
import Grid2 from "@mui/material/Grid2";

function AltaObras() {
  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2, mb: 3, color: "#c98c26", fontWeight: "bold", fontFamily: "'Roboto', sans-serif" }}>
        Alta de Obras
      </Typography>
      <Grid2 container spacing={3} sx={{ mt: 2, justifyContent: "center", alignItems: "center" }}>
        <Grid2 xs={12} sm={8} md={6}>
          <Stack component="form" spacing={3} sx={{ mx: 2, padding: 3, borderRadius: 2, boxShadow: 3, backgroundColor: "#f9f9f9" }}>
            
            {/* Nombre y Fecha de Creación en la misma fila */}
            <Grid2 container spacing={3}>
              <Grid2 item xs={12} sm={6}>
                <TextField
                  label="Nombre"
                  variant="outlined"
                  name="nombre"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                    "& .MuiInputLabel-root": {
                      color: "#888",
                    },
                  }}
                />
              </Grid2>
              <Grid2 item xs={12} sm={6}>
                <TextField
                  label="Fecha de Creación"
                  variant="outlined"
                  type="date"
                  name="fechaCreacion"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                    "& .MuiInputLabel-root": {
                      color: "#888",
                    },
                  }}
                />
              </Grid2>
            </Grid2>

            {/* Descripción debajo de Nombre y Fecha, ocupa hasta donde llega el campo Precio */}
            <Grid2 container spacing={6}>
              <Grid2 item xs={12} sm={8}>
                <TextField
                  label="Descripción"
                  variant="outlined"
                  name="descripcion"
                  multiline
                  rows={3}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                    "& .MuiInputLabel-root": {
                      color: "#888",
                    },
                  }}
                />
              </Grid2>
            </Grid2>

            {/* Artista y Precio en la misma fila */}
            <Grid2 container spacing={3}>
              <Grid2 item xs={12} sm={8}>
                <TextField
                  label="Artista"
                  variant="outlined"
                  name="artista"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                    "& .MuiInputLabel-root": {
                      color: "#888",
                    },
                  }}
                />
              </Grid2>
              <Grid2 item xs={12} sm={4}>
                <TextField
                  label="Precio"
                  variant="outlined"
                  name="precio"
                  type="number"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                    "& .MuiInputLabel-root": {
                      color: "#888",
                    },
                  }}
                />
              </Grid2>
            </Grid2>

            {/* Botón centrado */}
            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                bgcolor: "#c98c26",
                "&:hover": { bgcolor: "#a76f1f" },
                borderRadius: 2,
                fontWeight: "bold",
                padding: "12px",
                boxShadow: 2,
              }}
            >
              Añadir Obra
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
    </>
  );
}

export default AltaObras;
