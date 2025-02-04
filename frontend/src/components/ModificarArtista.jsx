import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiUrl } from "../pages/config";
import { Stack } from "@mui/material";

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
        setDatos(data.datos); // Se asume que los datos están dentro de "datos"

      } else if (response.status === 404) {
        let data = await response.json();
        console.log("Error al obtener el artista.");
        alert(data.mensaje);
        navigate("/");
      }
    }

    getArtistaById();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Vamos a hacer el fecth");
    const response = await fetch(apiUrl + "/artistas/" + datos.idartista, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
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
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Card
        sx={{ maxWidth: 500, width: "100%", margin: "0 auto", mt: 2, mb: 2 }}
      >
        <CardContent>
          <Stack component="form" spacing={2} onSubmit={handleSubmit}>
            <Typography variant="h4" gutterBottom align="center">
              Modificar Artista
            </Typography>
            <TextField
              label="Nombre"
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Apellidos"
              name="apellidos"
              value={datos.apellidos}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Fecha de Nacimiento"
              name="fechaNacimiento"
              type="date"
              value={datos.fechaNacimiento}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Tipo de Arte"
              name="tipoArte"
              value={datos.tipoArte} 
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="País de Nacimiento"
              name="paisDeNacimiento"
              value={datos.paisDeNacimiento}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                alignContent: "center",
                display: "block",
                margin: "0 auto",
                mt: 2,
              }}
            >
              Actualizar Artista
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default ModificarArtista;
