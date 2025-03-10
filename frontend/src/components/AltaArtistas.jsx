import {
  Typography,
  TextField,
  Stack,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../pages/config";
import { DateRange, Person } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import PublicIcon from "@mui/icons-material/Public";

/**
 * Componente para el formulario de alta de artistas.
 * @component
 */
function AltaArtistas() {
  /**
   * Estado para almacenar los datos del formulario.
   * @type {Object}
   */
  const [datos, setDatos] = useState({
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    tipoArte: "",
    paisDeNacimiento: "", // Añadido para capturar el país de nacimiento
  });

  const navigate = useNavigate();

  /**
   * Manejar el envío del formulario.
   * @param {Object} e - Evento de envío.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Datos enviados:", datos);

    try {
      const response = await fetch(apiUrl + "/artistas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      console.log("Respuesta del servidor:", response);

      if (response.ok) {
        const respuesta = await response.json();
        console.log("Respuesta JSON:", respuesta);
        alert(respuesta.mensaje);
        if (respuesta.ok) {
          navigate("/"); // Volver a la página principal
        }
      } else {
        const errorData = await response.json();
        console.error("Error en la respuesta:", errorData);
        alert("Error: " + errorData.mensaje);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error en la solicitud:", error);
    }
  };

  /**
   * Manejar cambios en los campos del formulario.
   * @param {Object} e - Evento de cambio.
   */
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
        <Grid2 item size={{ xs: 12, sm: 8, md: 6 }}>
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
              <Grid2 item size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Nombre"
                  variant="standard"
                  name="nombre"
                  fullWidth
                  sx={{ "& .MuiInput-root": { borderRadius: 2 } }}
                  value={datos.nombre}
                  onChange={handleChange}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: "#c98c26" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid2>
              <Grid2 item size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Apellidos"
                  variant="standard"
                  name="apellidos"
                  fullWidth
                  sx={{ "& .MuiInput-root": { borderRadius: 2 } }}
                  value={datos.apellidos}
                  onChange={handleChange}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: "#c98c26" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid2>
            </Grid2>

            <Grid2 container spacing={3}>
              <Grid2 item size={{ xs: 12, sm: 6 }}>
                {/* Fecha de Nacimiento */}
                <TextField
                  label="Fecha de Nacimiento"
                  variant="standard"
                  type="date"
                  name="fechaNacimiento"
                  fullWidth
                  sx={{ "& .MuiInput-root": { borderRadius: 2 } }}
                  value={datos.fechaNacimiento}
                  onChange={handleChange}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <DateRange sx={{ color: "#c98c26" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid2>

              <Grid2 item size={{ xs: 12, sm: 6 }}>
                {/* País de Nacimiento */}
                <TextField
                  label="País de Nacimiento"
                  variant="standard"
                  name="paisDeNacimiento"
                  fullWidth
                  sx={{ "& .MuiInput-root": { borderRadius: 2 } }}
                  value={datos.paisDeNacimiento}
                  onChange={handleChange}
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PublicIcon sx={{ color: "#c98c26" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Grid2>
            </Grid2>

            {/* Tipo de Arte */}
            <FormControl fullWidth>
              <InputLabel>Tipo de Arte</InputLabel>
              <Select
                label="Tipo de Arte"
                name="tipoArte"
                value={datos.tipoArte}
                onChange={handleChange}
                sx={{ "& .MuiInput-root": { borderRadius: 2 } }}
              >
                <MenuItem value="abstracto">Abstracto</MenuItem>
                <MenuItem value="creativo">Creativo</MenuItem>
                <MenuItem value="realista">Realista</MenuItem>
                <MenuItem value="surrealista">Surrealista</MenuItem>
                <MenuItem value="contemporaneo">Contemporáneo</MenuItem>
              </Select>
            </FormControl>

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