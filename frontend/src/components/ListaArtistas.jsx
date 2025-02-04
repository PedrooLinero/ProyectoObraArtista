import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirigir
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
  Grid2,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material"; // Importa los íconos de MUI
import { apiUrl } from "../pages/config";

function ListaArtistas() {
  const [artistas, setArtistas] = useState([]);
  const navigate = useNavigate(); // Hook para navegar a otras páginas

  useEffect(() => {
    async function getArtistas() {
      try {
        const response = await fetch(apiUrl + "/artistas");
        if (response.ok) {
          const data = await response.json();
          setArtistas(data.datos); // Suponiendo que la respuesta tiene una propiedad "datos" con los artistas
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
    // Redirige a la página de edición del artista con el id
    navigate(`/modificarartista/${idartista}`);
  };

  const handleDelete = async (idartista) => {
    try {
      const response = await fetch(`${apiUrl}/artistas/${idartista}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Si la eliminación fue exitosa, actualiza la lista de artistas
        setArtistas(artistas.filter((artista) => artista.idartista !== idartista));
        console.log("Artista eliminado con ID:", idartista);
      } else {
        console.error("Error al eliminar el artista.");
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    }
  };

  return (
    <>
      <Typography variant="h4" align="center" sx={{ mt: 5, mb: 3, color: "#b57918", }}>
        Listado de Artistas
      </Typography>

      <Grid2 container spacing={3} sx={{ mt: 3, justifyContent: "center" }}>
        <TableContainer
          component={Paper}
          sx={{ boxShadow: 3, borderRadius: 2, mb: 2 }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="tabla de artistas">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  Nombre
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                >
                  Apellidos
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                >
                  Fecha de Nacimiento
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                >
                  Tipo de Arte
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                >
                  País de Nacimiento
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                >
                  Editar
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                >
                  Eliminar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {artistas.map((artista) => (
                <TableRow
                  key={artista.idartista}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.05)", // Efecto hover para las filas
                    },
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <TableCell component="th" scope="row">
                    {artista.nombre}
                  </TableCell>
                  <TableCell align="center">{artista.apellidos}</TableCell>
                  <TableCell align="center">
                    {artista.fechaNacimiento}
                  </TableCell>
                  <TableCell align="center">{artista.tipoArte}</TableCell>
                  <TableCell align="center">
                    {artista.paisDeNacimiento}
                  </TableCell>
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
                      onClick={() => handleDelete(artista.idartista)}
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
      </Grid2>
    </>
  );
}

export default ListaArtistas;
