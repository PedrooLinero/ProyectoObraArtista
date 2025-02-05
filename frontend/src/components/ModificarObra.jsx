import { Grid, Button, TextField, Typography, Stack, Select, FormControl, InputLabel, MenuItem, InputAdornment } from "@mui/material";
import { AttachMoney, DateRange, Description, Image, Person } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiUrl } from "../pages/config";

function ModificarObra() {
  const params = useParams();
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    idobra: params.idobra,
    nombre: "",
    descripcion: "",
    fecha: "",
    precio: "",
    imagen_url: "",
    idartista: "",
  });
  const [artistas, setArtistas] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const responseObra = await fetch(apiUrl + "/obras/" + datos.idobra);
        if (!responseObra.ok) throw new Error("Error al obtener la obra");
        const dataObra = await responseObra.json();
        setDatos(dataObra.datos);

        const responseArtistas = await fetch(apiUrl + "/artistas");
        if (!responseArtistas.ok) throw new Error("Error al obtener artistas");
        const dataArtistas = await responseArtistas.json();
        setArtistas(dataArtistas.datos);
      } catch (error) {
        console.error(error);
        alert(error.message);
        navigate("/");
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(apiUrl + "/obras/" + datos.idobra, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    });
    if (response.ok) {
      alert("Obra actualizada con éxito.");
      navigate(-1);
    } else {
      const data = await response.json();
      alert(data.mensaje);
    }
  };

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleChangeSel = (e) => {
    setDatos({ ...datos, idartista: e.target.value });
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 2, mb: 3, color: "#c98c26", fontWeight: "bold", fontFamily: "'Roboto', sans-serif" }}>
        Modificar Obra
      </Typography>

      <Grid container justifyContent="center" sx={{ mt: 2, mb: 4 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Stack component="form" onSubmit={handleSubmit} spacing={4} sx={{ p: 4, borderRadius: 2, boxShadow: 3, backgroundColor: "#f9f9f9" }}>
            <TextField label="Nombre" variant="standard" name="nombre" fullWidth value={datos.nombre} onChange={handleChange} InputProps={{ startAdornment: (<InputAdornment position="start"><Person sx={{ color: "#c98c26" }} /></InputAdornment>) }} />
            <TextField label="Fecha de Creación" variant="standard" type="date" name="fecha" fullWidth value={datos.fecha} onChange={handleChange} InputProps={{ startAdornment: (<InputAdornment position="start"><DateRange sx={{ color: "#c98c26" }} /></InputAdornment>) }} />
            <TextField label="Descripción" variant="standard" name="descripcion" multiline fullWidth value={datos.descripcion} onChange={handleChange} InputProps={{ startAdornment: (<InputAdornment position="start"><Description sx={{ color: "#c98c26" }} /></InputAdornment>) }} />
            <TextField label="Precio" variant="standard" name="precio" type="number" fullWidth value={datos.precio} onChange={handleChange} InputProps={{ startAdornment: (<InputAdornment position="start"><AttachMoney sx={{ color: "#c98c26" }} /></InputAdornment>) }} />
            <TextField label="Imagen (URL)" variant="standard" name="imagen_url" fullWidth value={datos.imagen_url} onChange={handleChange} InputProps={{ startAdornment: (<InputAdornment position="start"><Image sx={{ color: "#c98c26" }} /></InputAdornment>) }} />
            <FormControl fullWidth>
              <InputLabel id="idartista-label">Artista</InputLabel>
              <Select labelId="idartista-label" id="idartista" value={datos.idartista} onChange={handleChangeSel} label="Artista">
                {artistas.map((artista) => (
                  <MenuItem key={artista.idartista} value={artista.idartista}>
                    {artista.nombre} ({artista.paisDeNacimiento})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" type="submit" fullWidth sx={{ bgcolor: "#c98c26", "&:hover": { bgcolor: "#a76f1f" }, borderRadius: 2, fontWeight: "bold", padding: "12px", boxShadow: 2 }}>
              Modificar Obra
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}

export default ModificarObra;
