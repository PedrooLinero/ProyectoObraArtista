import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import {
  Stack,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { useState } from "react";
import { apiUrl } from "../pages/config";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function ListarArtistaPorArte() {
  const [datos, setDatos] = useState({
    tipoArte: "",
  });

  const [artistas, setArtistas] = useState([]); // Para almacenar los resultados de los artistas
  const [artistaAEliminar, setArtistaAEliminar] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleEdit = (idartista) => {
    navigate(`/modificarartista/${idartista}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(datos);

    try {
      // Realizar la petición GET a la API para obtener los artistas por tipo de arte
      const response = await fetch(
        `${apiUrl}/artistas/tipoArte/${datos.tipoArte}`
      );

      // Verificar si la respuesta es exitosa
      if (!response.ok) {
        throw new Error(
          "No se encontraron artistas o hubo un problema con la solicitud."
        );
      }

      const data = await response.json();

      // Si la petición es exitosa, almacenar los resultados en el estado
      setArtistas(data.datos);
    } catch (err) {
      console.error(err); // Log the error to the console
      // Si hay un error, limpiar resultados previos
      setArtistas([]);
    }
  };

  return (
    <>
      <Box sx={{ minHeight: "67vh" }}>
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
          Listar Artistas por su Arte
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
              {/* Tipo de Arte */}
              <FormControl fullWidth>
                <InputLabel>Tipo de Arte</InputLabel>
                <Select
                  label="Tipo de Arte"
                  name="tipoArte"
                  value={datos.tipoArte}
                  onChange={handleChange}
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
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
                Listar Artistas por su Arte
              </Button>
            </Stack>
          </Grid2>
        </Grid2>

        <Box sx={{ mx: 4, mb: 4 }}>
          {/* Mostrar la tabla de artistas si hay resultados */}
          {artistas.length > 0 && (
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ fontWeight: "bold", fontSize: "1.1rem" }}
                    >
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
                    <TableRow key={artista.idartista}>
                      <TableCell align="center">{artista.nombre}</TableCell>
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
            </TableContainer>
          )}
        </Box>
      </Box>

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
    </>
  );
}

export default ListarArtistaPorArte;
