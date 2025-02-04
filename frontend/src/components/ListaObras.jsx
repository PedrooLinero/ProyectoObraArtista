import { Typography, Grid2, Card, CardContent, CardMedia, Box } from "@mui/material";
import { useState, useEffect } from "react";
import { apiUrl } from "../pages/config";

function ListaObras() {
  const [obras, setObras] = useState([]);
  const [artistas, setArtistas] = useState({});

  useEffect(() => {
    async function getObras() {
      try {
        const response = await fetch(apiUrl + "/obras");

        if (response.ok) {
          const data = await response.json();
          setObras(data.datos); // Suponiendo que la respuesta tiene una propiedad "datos" con las obras
        } else {
          console.error("Error al obtener las obras.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }

    async function getArtistas() {
      try {
        const response = await fetch(apiUrl + "/artistas");

        if (response.ok) {
          const data = await response.json();
          const artistasMap = data.datos.reduce((acc, artista) => {
            acc[artista.idartista] = artista.nombre; // Creamos un mapa de idartista -> nombre
            return acc;
          }, {});
          setArtistas(artistasMap); // Guardamos el mapa de artistas
        } else {
          console.error("Error al obtener los artistas.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }

    getObras();
    getArtistas();
  }, []);

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 5, mb: 3 }}>
        Listado de Obras
      </Typography>

      <Grid2 container spacing={3} sx={{ mt: 3, justifyContent: "center" }}>
        {obras.map((obra) => (
          <Grid2 item xs={12} sm={6} md={4} key={obra.idobra}>
            <Card
              sx={{
                maxWidth: 345,
                borderRadius: 3,
                boxShadow: 10,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={obra.imagen || "default_image.jpg"} // Si no hay imagen, usa una por defecto
                alt={obra.nombre}
                sx={{
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ padding: 3 }}>
                <Typography variant="h6" component="div" sx={{ fontWeight: "bold", textAlign: "center" }}>
                  {obra.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mt: 1 }}>
                  {obra.descripcion}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Precio: ${obra.precio}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Artista: {artistas[obra.idartista] || "Desconocido"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}

export default ListaObras;
