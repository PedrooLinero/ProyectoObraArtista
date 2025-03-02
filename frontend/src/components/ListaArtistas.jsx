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
  TablePagination,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { apiUrl } from "../pages/config";

/**
 * Componente que muestra una lista de artistas en una tabla con opciones para editar y eliminar.
 * @component
 */
function ListaArtistas() {
  const [artistas, setArtistas] = useState([]);
  const [artistaAEliminar, setArtistaAEliminar] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const navigate = useNavigate();

  // Hook para obtener la lista de artistas al cargar el componente
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

  /**
   * Maneja la edición de un artista redirigiendo a la página de modificación.
   * @param {number} idartista - ID del artista a editar.
   */
  const handleEdit = (idartista) => {
    navigate(`/modificarartista/${idartista}`);
  };

  /**
   * Maneja la confirmación de eliminación de un artista.
   */
  const handleDeleteConfirm = async () => {
    if (!artistaAEliminar) return;

    try {
      const response = await fetch(
        `${apiUrl}/artistas/${artistaAEliminar.idartista}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setArtistas(
          artistas.filter(
            (artista) => artista.idartista !== artistaAEliminar.idartista
          )
        );
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

  /**
   * Maneja el cambio de página en la tabla.
   * @param {object} event - Evento de cambio de página.
   * @param {number} newPage - Nueva página seleccionada.
   */
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  /**
   * Maneja el cambio de filas por página en la tabla.
   * @param {object} event - Evento de cambio de filas por página.
   */
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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

      <Box sx={{ display: "flex", justifyContent: "center", mb: 2, mx: 4 }}>
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
              {artistas
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((artista) => (
                  <TableRow
                    key={artista.idartista}
                    sx={{
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.05)" },
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
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                          },
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
                          "&:hover": {
                            backgroundColor: "rgba(255, 0, 0, 0.1)",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {/* Paginación centrada */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TablePagination
              sx={{
                "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
                  {
                    marginTop: "1rem",
                  },
              }}
              rowsPerPageOptions={[4, 10, 25]}
              component="div"
              count={artistas.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={<strong>Artistas por página</strong>}
              labelDisplayedRows={({ from, to, count }) => {
                return `${from}-${to} de ${
                  count !== -1 ? count : `más de ${to}`
                }`;
              }}
            />
          </Box>
        </TableContainer>

        {/* Modal de Confirmación */}
        <Dialog
          open={Boolean(artistaAEliminar)}
          onClose={() => setArtistaAEliminar(null)}
        >
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
