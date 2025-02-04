import { Typography, TextField, Stack, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../pages/config";

function AltaArtistas() {
  const [datos, setDatos] = useState({
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    tipoArte: "",
    paisDeNacimiento: "", // Añadido para capturar el país de nacimiento
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl + "/artistas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      if (response.ok) {
        const respuesta = await response.json();
        alert(respuesta.mensaje);
        if (respuesta.ok) {
          navigate("/"); // Volver a la página principal
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error:", error);
    }
  };

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Typography
        variant="h4"
        align="center"
        sx={{
          mt: 2,
          mb: 3,
          color: "#c98c26",
          fontWeight: "bold",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        Alta de Artistas
      </Typography>

      <Grid2 container justifyContent="center" sx={{ mt: 2, mb: 4 }}>
        <Grid2 item xs={12} sm={10} md={8}>
          <Stack
            component="form"
            onSubmit={handleSubmit}
            spacing={4}
            sx={{
              p: 4,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#f9f9f9",
            }}
          >
            {/* Nombre y Apellidos en la misma fila */}
            <Grid2 container spacing={3}>
              <Grid2 xs={12} sm={6}>
                <TextField
                  label="Nombre"
                  variant="outlined"
                  name="nombre"
                  fullWidth
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  value={datos.nombre}
                  onChange={handleChange}
                />
              </Grid2>
              <Grid2 xs={12} sm={6}>
                <TextField
                  label="Apellidos"
                  variant="outlined"
                  name="apellidos"
                  fullWidth
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  value={datos.apellidos}
                  onChange={handleChange}
                />
              </Grid2>
            </Grid2>

            {/* Fecha de Nacimiento */}
            <TextField
              label="Fecha de Nacimiento"
              variant="outlined"
              type="date"
              name="fechaNacimiento"
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              value={datos.fechaNacimiento}
              onChange={handleChange}
            />

            {/* Tipo de Arte */}
            <FormControl fullWidth>
              <InputLabel>Tipo de Arte</InputLabel>
              <Select
                label="Tipo de Arte"
                name="tipoArte"
                value={datos.tipoArte}
                onChange={handleChange}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              >
                <MenuItem value="abstracto">Abstracto</MenuItem>
                <MenuItem value="creativo">Creativo</MenuItem>
                <MenuItem value="realista">Realista</MenuItem>
                <MenuItem value="surrealista">Surrealista</MenuItem>
                <MenuItem value="contemporaneo">Contemporáneo</MenuItem>
              </Select>
            </FormControl>

            {/* País de Nacimiento */}
            <TextField
              label="País de Nacimiento"
              variant="outlined"
              name="paisDeNacimiento"
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              value={datos.paisDeNacimiento}
              onChange={handleChange}
            />

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
              Añadir Artista
            </Button>
          </Stack>
        </Grid2>
      </Grid2>
    </>
  );
}

export default AltaArtistas;
