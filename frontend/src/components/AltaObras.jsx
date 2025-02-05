import {
  Typography,
  TextField,
  Stack,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../pages/config";
import {
  Person,
  DateRange,
  Description,
  AttachMoney,
  Image,
} from "@mui/icons-material"; // Importar los íconos

function AltaObras() {
  const [datos, setDatos] = useState({
    nombre: "",
    descripcion: "",
    fecha: "",
    precio: "",
    idartista: "",
    imagen_url: "", // Aquí se almacena la URL de la imagen
  });

  const [artistas, setArtistas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getArtistas() {
      try {
        const response = await fetch(apiUrl + "/artistas");

        if (response.ok) {
          const data = await response.json();
          setArtistas(data.datos); // Se asegura de que los datos del artista se reciban correctamente
        } else {
          console.error("Error al obtener los artistas.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }

    getArtistas();
  }, []);

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeSel = (event) => {
    setDatos({
      ...datos,
      idartista: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(apiUrl + "/obras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      });

      const respuesta = await response.json();

      if (response.ok) {
        alert(respuesta.mensaje);
        navigate("/"); // Redirige a la página principal
      } else {
        alert("Error: " + respuesta.mensaje);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Ocurrió un error. Inténtalo de nuevo.");
    }
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
        Alta de Obras
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
            <Grid2 container spacing={3}>
              <Grid2 item size={{ xs: 12, sm: 6 }}>
                <TextField
                  label="Nombre"
                  variant="standard" // Cambiado a 'standard'
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
                  label="Fecha de Creación"
                  variant="standard" // Cambiado a 'standard'
                  type="date"
                  name="fecha"
                  fullWidth
                  sx={{ "& .MuiInput-root": { borderRadius: 2 } }}
                  value={datos.fecha}
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
            </Grid2>

            <TextField
              label="Descripción"
              variant="standard" // Cambiado a 'standard'
              name="descripcion"
              multiline
              fullWidth
              sx={{ "& .MuiInput-root": { borderRadius: 2 } }}
              value={datos.descripcion}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Description sx={{ color: "#c98c26" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Precio"
              variant="standard" // Cambiado a 'standard'
              name="precio"
              type="number"
              fullWidth
              sx={{ "& .MuiInput-root": { borderRadius: 2 } }}
              value={datos.precio}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoney sx={{ color: "#c98c26" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              label="Imagen (URL)"
              variant="standard" // Cambiado a 'standard'
              name="imagen_url"
              fullWidth
              sx={{ "& .MuiInput-root": { borderRadius: 2 } }}
              value={datos.imagen_url}
              onChange={handleChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <Image sx={{ color: "#c98c26" }} />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <FormControl fullWidth>
              <InputLabel id="idartista-label">Artista</InputLabel>
              <Select
                labelId="idartista-label"
                id="idartista"
                value={datos.idartista}
                onChange={handleChangeSel}
                label="Artista"
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              >
                {artistas.map((artista) => (
                  <MenuItem key={artista.idartista} value={artista.idartista}>
                    {artista.nombre} ({artista.paisDeNacimiento})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
