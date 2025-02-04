import { Typography, Grid2, Card, CardContent, CardMedia, CardActions, Box, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { apiUrl } from "../pages/config";
import { useNavigate } from "react-router-dom";

function ListaObras() {
  const [obras, setObras] = useState([]);
  const [artistas, setArtistas] = useState({});
  const [obraAEliminar, setObraAEliminar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getObras() {
      try {
        const response = await fetch(apiUrl + "/obras");

        if (response.ok) {
          const data = await response.json();
          setObras(data.datos);
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
            acc[artista.idartista] = artista.nombre;
            return acc;
          }, {});
          setArtistas(artistasMap);
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

  const handleEdit = (idobra) => {
    navigate(`/modificarobra/${idobra}`);
  };

  const handleDelete = async () => {
    if (!obraAEliminar) return;
    try {
      const response = await fetch(`${apiUrl}/obras/${obraAEliminar.idobra}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setObras(obras.filter((obra) => obra.idobra !== obraAEliminar.idobra));
        setObraAEliminar(null);
      } else {
        console.error("Error al eliminar la obra.");
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
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
        Listado de Obras
      </Typography>

      <Grid2 container spacing={3} sx={{ mt: 3, mb:2, justifyContent: "center" }}>
        {obras.map((obra) => (
          <Grid2 item xs={12} sm={6} lg={3} key={obra.idobra}>
            <Card sx={{ maxWidth: 345, width: "100%", height: "100%", display: "flex", flexDirection: "column", boxShadow: 3, borderRadius: 2, "&:hover": { transform: "scale(1.05)" } }}>
              <CardMedia
                component="img"
                alt={obra.nombre}
                image={obra.imagen_url || "default_image.jpg"}
                sx={{ height: "180px", objectFit: "cover", borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
              />
              <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: "center", mb: 2 }}>
                  {obra.nombre}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mb: 2 }}>
                  {obra.descripcion}
                </Typography>
                <Box sx={{ borderTop: "1px solid #ddd", paddingTop: 2, textAlign: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Precio:</strong> €{obra.precio}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Artista:</strong> {artistas[obra.idartista] || "Desconocido"}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
                <IconButton onClick={() => handleEdit(obra.idobra)} sx={{ color: "#b57918", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" } }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => setObraAEliminar(obra)} sx={{ color: "#b57918", "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.1)" } }}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      <Dialog open={Boolean(obraAEliminar)} onClose={() => setObraAEliminar(null)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar la obra &quot;{obraAEliminar?.nombre}&quot;?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setObraAEliminar(null)} color="primary">Cancelar</Button>
          <Button onClick={handleDelete} color="error">Eliminar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ListaObras;