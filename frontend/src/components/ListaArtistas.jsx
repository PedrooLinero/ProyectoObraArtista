import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { apiUrl } from "../pages/config";

function ListaArtistas() {
  const [artistas, setArtistas] = useState([]);
  const [artistaAEliminar, setArtistaAEliminar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getArtistas() {
      try {
        const response = await fetch(apiUrl + "/artistas");
        if (response.ok) {
          const data = await response.json();
          setArtistas(data.datos);
        } else {
          console.error("Error al obtener los artistas.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }

    getArtistas();
  }, []);

  const handleEdit = (idartista) => {
    navigate(`/modificarartista/${idartista}`);
  };

  const handleDeleteConfirm = async () => {
    if (!artistaAEliminar) return;

    try {
      const response = await fetch(`${apiUrl}/artistas/${artistaAEliminar.idartista}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setArtistas(artistas.filter((artista) => artista.idartista !== artistaAEliminar.idartista));
        console.log("Artista eliminado con ID:", artistaAEliminar.idartista);
      } else {
        console.error("Error al eliminar el artista.");
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    } finally {
      setArtistaAEliminar(null);
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
        Listado de Artistas
      </Typography>

<Box sx={{ display: "flex", justifyContent: "center", mb: 2, mx:4 }}>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, mb: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="tabla de artistas">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Nombre</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Apellidos</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Fecha de Nacimiento</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Tipo de Arte</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>País de Nacimiento</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Editar</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {artistas.map((artista) => (
              <TableRow
                key={artista.idartista}
                sx={{
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
                  transition: "background-color 0.3s ease",
                }}
              >
                <TableCell component="th" scope="row">{artista.nombre}</TableCell>
                <TableCell align="center">{artista.apellidos}</TableCell>
                <TableCell align="center">{artista.fechaNacimiento}</TableCell>
                <TableCell align="center">{artista.tipoArte}</TableCell>
                <TableCell align="center">{artista.paisDeNacimiento}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => handleEdit(artista.idartista)}
                    sx={{
                      color: "#b57918",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => setArtistaAEliminar(artista)}
                    sx={{
                      color: "#b57918",
                      "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.1)" },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de Confirmación */}
      <Dialog open={Boolean(artistaAEliminar)} onClose={() => setArtistaAEliminar(null)}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar al artista{" "}
            <strong>{artistaAEliminar?.nombre}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setArtistaAEliminar(null)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </>
  );
}

export default ListaArtistas;
