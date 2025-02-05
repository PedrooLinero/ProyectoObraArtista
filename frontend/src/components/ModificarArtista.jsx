import { Grid2, TextField, Button, Typography, Stack, InputAdornment } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiUrl } from "../pages/config";
import { Person, DateRange, Public } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

function ModificarArtista() {
  const params = useParams();
  const [datos, setDatos] = useState({
    idartista: params.idartista,
    nombre: "",
    apellidos: "",
    fechaNacimiento: "",
    tipoArte: "",
    paisDeNacimiento: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function getArtistaById() {
      let response = await fetch(apiUrl + "/artistas/" + datos.idartista);
      if (response.ok) {
        let data = await response.json();
        setDatos(data.datos);
      } else if (response.status === 404) {
        let data = await response.json();
        alert(data.mensaje);
        navigate("/");
      }
    }
    getArtistaById();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(apiUrl + "/artistas/" + datos.idartista, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    if (response.ok) {
      alert("Artista actualizado con éxito.");
      navigate(-1);
    } else {
      const data = await response.json();
      alert(data.mensaje);
    }
  };

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  return (
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
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mt: 2,
              mb: 3,
              color: "#c98c26",
              fontWeight: "bold",
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            Modificar Artista
          </Typography>

          <Grid2 container spacing={3}>
            <Grid2 item size={{ xs: 12, sm: 6 }}>
              <TextField
                label="Nombre"
                variant="standard"
                name="nombre"
                fullWidth
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
              <TextField
                label="Fecha de Nacimiento"
                variant="standard"
                type="date"
                name="fechaNacimiento"
                fullWidth
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
              <TextField
                label="País de Nacimiento"
                variant="standard"
                name="paisDeNacimiento"
                fullWidth
                value={datos.paisDeNacimiento}
                onChange={handleChange}
                slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Public sx={{ color: "#c98c26" }} />
                        </InputAdornment>
                      ),
                    },
                  }}
              />
            </Grid2>
          </Grid2>

          <FormControl fullWidth>
            <InputLabel>Tipo de Arte</InputLabel>
            <Select
              label="Tipo de Arte"
              name="tipoArte"
              value={datos.tipoArte}
              onChange={handleChange}
            >
              <MenuItem value="abstracto">Abstracto</MenuItem>
              <MenuItem value="creativo">Creativo</MenuItem>
              <MenuItem value="realista">Realista</MenuItem>
              <MenuItem value="surrealista">Surrealista</MenuItem>
              <MenuItem value="contemporaneo">Contemporáneo</MenuItem>
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#c98c26",
              "&:hover": { bgcolor: "#a76f1f" },
              borderRadius: 2,
              fontWeight: "bold",
              padding: "12px",
              boxShadow: 2,
            }}
          >
            Actualizar Artista
          </Button>
        </Stack>
      </Grid2>
    </Grid2>
  );
}

export default ModificarArtista;
