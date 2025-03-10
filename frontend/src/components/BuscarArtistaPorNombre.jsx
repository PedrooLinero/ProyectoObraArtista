import {
  Typography,
  Grid2,
  Stack,
  Button,
  FormControl,
  TextField,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { apiUrl } from "../pages/config";
import WarningIcon from "@mui/icons-material/Warning";
import { useNavigate } from "react-router-dom";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import BrushIcon from "@mui/icons-material/Brush";
import InputAdornment from "@mui/material/InputAdornment";

/**
 * Componente para buscar un artista por su nombre.
 * @returns {JSX.Element} El componente BuscarArtistaPorNombre.
 */
function BuscarArtistaPorNombre() {
  const [nombre, setNombre] = useState("");
  const [artista, setArtista] = useState(null);
  const [modalMessage, setModalMessage] = useState(""); // Mensaje del modal
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [artistaAEliminar, setArtistaAEliminar] = useState(null); // Artista a eliminar
  const navigate = useNavigate();

  /**
   * Maneja el cambio en el campo de texto de búsqueda.
   * @param {React.ChangeEvent<HTMLInputElement>} e - El evento de cambio.
   */
  const handleChange = (e) => {
    setNombre(e.target.value);
  };

  /**
   * Busca un artista por su nombre.
   */
  const buscarArtista = async () => {
    if (nombre.trim() === "") return;

    setLoading(true);
    setArtista(null); // Limpiar el artista previo si la búsqueda cambia
    setOpenModal(false); // Cerrar el modal si se hace una nueva búsqueda

    try {
      const response = await fetch(apiUrl + "/artistas/nombre/" + nombre);

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        console.log("Datos obtenidos:", data);

        // Si no hay resultados, abrir el modal
        if (!data.datos || Object.keys(data.datos).length === 0) {
          console.log("Artista no encontrado. Abriendo modal...");
          setModalMessage(
            "No se encontraron resultados para el artista que buscas."
          );
          setOpenModal(true); // Mostrar el modal si no hay datos
        } else {
          setArtista(data.datos); // Mostrar los datos del artista si se encuentra
        }
      } else {
        // Si la respuesta no es exitosa (como un error 404), abrir el modal
        console.error("Error al buscar el artista.");
        setModalMessage(
          "No se encontraron resultados para el artista que buscas."
        );
        setOpenModal(true); // Mostrar el modal de no encontrado
      }
    } catch (error) {
      setLoading(false);
      console.error("Error en la solicitud:", error);
      setModalMessage("Hubo un error al realizar la búsqueda.");
      setOpenModal(true); // Mostrar el modal en caso de error en la solicitud
    }
  };

  /**
   * Maneja el envío del formulario de búsqueda.
   * @param {React.FormEvent<HTMLFormElement>} e - El evento de envío del formulario.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    buscarArtista();
  };

  /**
   * Cierra el modal de advertencia.
   */
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  /**
   * Navega a la página de edición del artista.
   * @param {number} idartista - El ID del artista a editar.
   */
  const handleEdit = (idartista) => {
    navigate(`/modificarartista/${idartista}`);
  };

  /**
   * Confirma la eliminación del artista seleccionado.
   */
  const handleDelete = async () => {
    if (!artistaAEliminar) return;
    try {
      const response = await fetch(
        `${apiUrl}/artistas/${artistaAEliminar.idartista}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setArtista(null); // Limpiar los datos después de eliminar
        setArtistaAEliminar(null);
      } else {
        console.error("Error al eliminar el artista.");
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
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
          Busca el Artista por su nombre
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
                <FormControl fullWidth>
                  <TextField
                    label="Buscar artista"
                    variant="standard"
                    name="buscaartista"
                    fullWidth
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                    value={nombre}
                    onChange={handleChange}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <InputAdornment position="start">
                            <BrushIcon sx={{ color: "#c98c26" }} />
                          </InputAdornment>
                        ),
                      },
                    }}
                  />
                </FormControl>
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
                Buscar Artista
              </Button>
            </Stack>
          </Grid2>
        </Grid2>

        {loading && (
          <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
        )}

        {/* Mostrar los datos del artista */}
        {artista && (
          <Box
            sx={{
              mt: 3,
              width: "100%",
              maxWidth: 500,
              margin: "20px auto",
              padding: 2,
              borderRadius: 2,
              boxShadow: 2,
              backgroundColor: "#fff",
              textAlign: "center",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "scale(1.02)",
                boxShadow: 4,
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#333",
                fontSize: "1.125rem",
                textTransform: "capitalize",
                mb: 1,
              }}
            >
              {artista.nombre} {artista.apellidos}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: "#555",
                fontSize: "0.95rem",
                lineHeight: 1.5,
              }}
            >
              <strong>Fecha de Nacimiento:</strong>{" "}
              {artista.fechaNacimiento || "No disponible."}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1, color: "#777", fontSize: "0.9rem", lineHeight: 1.5 }}
            >
              <strong>Tipo de Arte:</strong>{" "}
              {artista.tipoArte || "No especificado."}
            </Typography>
            <Typography
              variant="body2"
              sx={{ mt: 1, color: "#777", fontSize: "0.9rem", lineHeight: 1.5 }}
            >
              <strong>País de Nacimiento:</strong>{" "}
              {artista.paisDeNacimiento || "No especificado."}
            </Typography>

            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 2 }}
            >
              <IconButton
                onClick={() => handleEdit(artista.idartista)}
                sx={{
                  color: "#b57918",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => setArtistaAEliminar(artista)}
                sx={{
                  color: "#b57918",
                  "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.1)" },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>

      {/* Modal de advertencia cuando no hay resultados */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          <WarningIcon sx={{ color: "orange", mr: 1 }} />
          Advertencia
        </DialogTitle>
        <DialogContent>
          <Typography>{modalMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} sx={{ color: "#c98c26" }}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de confirmación para eliminar */}
      <Dialog
        open={Boolean(artistaAEliminar)}
        onClose={() => setArtistaAEliminar(null)}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar el artista &quot;
            {artistaAEliminar?.nombre} {artistaAEliminar?.apellidos}&quot;?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setArtistaAEliminar(null)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default BuscarArtistaPorNombre;
