import {
  Typography,
  Grid2,
  Stack,
  Button,
  TextField,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";
import { useState } from "react";
import { apiUrl } from "../pages/config";
import { IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { DialogContentText } from "@mui/material";
import PaletteIcon from "@mui/icons-material/Palette";
import InputAdornment from "@mui/material/InputAdornment";

function BuscarObraPorNombre() {
  const [nombre, setNombre] = useState("");
  const [obra, setObra] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [obraAEliminar, setObraAEliminar] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNombre(e.target.value);
  };

  const handleEdit = (idobra) => {
    navigate(`/modificarobra/${idobra}`);
  };

  const handleDeleteConfirm = async () => {
    if (!obraAEliminar) return;

    try {
      const response = await fetch(`${apiUrl}/obras/${obraAEliminar.idobra}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setObra(null);
        setObraAEliminar(null);
        console.log("Obra eliminada con ID:", obraAEliminar.idobra);
      } else {
        console.error("Error al eliminar la obra.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const buscarObra = async () => {
    if (nombre.trim() === "") return;

    setLoading(true);
    setObra(null); // Limpiar la obra previa si la búsqueda cambia
    setOpenModal(false); // Cerrar modal si se hace una nueva búsqueda

    try {
      const response = await fetch(apiUrl + "/obras/nombre/" + nombre);

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        console.log("Datos obtenidos:", data);

        // Si no hay resultados, abrir el modal
        if (!data.datos || Object.keys(data.datos).length === 0) {
          console.log("Obra no encontrada. Abriendo modal...");
          setOpenModal(true); // Mostrar el modal si no hay datos
        } else {
          setObra(data.datos); // Mostrar los datos de la obra si se encuentra
        }
      } else {
        // Si la respuesta no es exitosa, también abrir el modal
        console.error("Error al buscar la obra.");
        setOpenModal(true); // Mostrar el modal de no encontrado
      }
    } catch (error) {
      setLoading(false);
      console.error("Error en la solicitud:", error);
      setOpenModal(true); // Mostrar el modal en caso de error en la solicitud
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    buscarObra();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
          Busca la Obra por su nombre
        </Typography>

        <Grid2
          container
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 2, mb: 4 }}
        >
          <Grid2 item size={{ xs: 12, sm: 8, lg: 6 }}>
            <Stack
              component="form"
              spacing={4}
              sx={{
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "#f9f9f9",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onSubmit={handleSubmit}
            >
              <Box sx={{ width: "100%", maxWidth: "700px" }}>
                {/* Ajusta el tamaño según el card */}
                <TextField
                  label="Buscar obra"
                  variant="standard"
                  name="buscaobra"
                  fullWidth
                  sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                  value={nombre}
                  onChange={handleChange}
                  slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PaletteIcon sx={{ color: "#c98c26" }} />
                    </InputAdornment>
                  ),
                },
              }}
                />
              </Box>

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
                Buscar Obra
              </Button>
            </Stack>
          </Grid2>
        </Grid2>

        {loading && (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        )}

        {/* Mostrar la imagen y los resultados en una tabla */}
        {obra && (
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Grid2 container spacing={4} justifyContent="center">
              <Grid2
                item
                size={{ xs: 12, sm: 4 }}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {obra.imagen_url && (
                  <img
                    src={obra.imagen_url}
                    alt={obra.nombre}
                    style={{
                      maxWidth: "100%",
                      height: "auto",
                      borderRadius: "8px",
                      maxHeight: "300px", // Limitar la altura de la imagen
                      marginBottom: "20px",
                    }}
                  />
                )}
              </Grid2>
              <Grid2
                item
                size={{ xs: 12, sm: 8 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <TableContainer sx={{ maxWidth: "100%" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Precio</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Editar</TableCell>
                        <TableCell>Eliminar</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>{obra.nombre}</TableCell>
                        <TableCell>{obra.descripcion}</TableCell>
                        <TableCell>{`$${obra.precio}`}</TableCell>
                        <TableCell>{obra.fecha}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => handleEdit(obra.idobra)}
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
                            onClick={() => setObraAEliminar(obra)}
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
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid2>
            </Grid2>
          </Box>
        )}
      </Box>

      {/* Modal si no se encuentra la obra */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Obra no encontrada</DialogTitle>
        <DialogContent>
          <DialogContentText>
            No se encontró ninguna obra con el nombre <strong>{nombre}</strong>.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para confirmar eliminación */}
      <Dialog
        open={Boolean(obraAEliminar)}
        onClose={() => setObraAEliminar(null)}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar la obra{" "}
            <strong>{obraAEliminar?.nombre}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setObraAEliminar(null)} color="primary">
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

export default BuscarObraPorNombre;
