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
  
  function BuscarArtistaPorNombre() {
    const [nombre, setNombre] = useState("");
    const [artista, setArtista] = useState(null);
    const [modalMessage, setModalMessage] = useState(""); // Mensaje del modal
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [artistaAEliminar, setArtistaAEliminar] = useState(null); // Artista a eliminar
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setNombre(e.target.value);
    };
  
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
            setModalMessage("No se encontraron resultados para el artista que buscas.");
            setOpenModal(true); // Mostrar el modal si no hay datos
          } else {
            setArtista(data.datos); // Mostrar los datos del artista si se encuentra
          }
        } else {
          // Si la respuesta no es exitosa (como un error 404), abrir el modal
          console.error("Error al buscar el artista.");
          setModalMessage("No se encontraron resultados para el artista que buscas.");
          setOpenModal(true); // Mostrar el modal de no encontrado
        }
      } catch (error) {
        setLoading(false);
        console.error("Error en la solicitud:", error);
        setModalMessage("Hubo un error al realizar la búsqueda.");
        setOpenModal(true); // Mostrar el modal en caso de error en la solicitud
      }
    };
    
  
    const handleSubmit = (e) => {
      e.preventDefault();
      buscarArtista();
    };
  
    const handleCloseModal = () => {
      setOpenModal(false);
    };
  
    const handleEdit = (idartista) => {
      navigate(`/modificarartista/${idartista}`);
    };
  
    const handleDelete = async () => {
      if (!artistaAEliminar) return;
      try {
        const response = await fetch(`${apiUrl}/artistas/${artistaAEliminar.idartista}`, {
          method: "DELETE",
        });
  
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
  
        <Grid2 container justifyContent="center" sx={{ mt: 2, mb: 4 }}>
          <Grid2 item xs={12} sm={10} md={8}>
            <Stack
              component="form"
              spacing={4}
              sx={{
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "#f9f9f9",
              }}
              onSubmit={handleSubmit}
            >
              <Grid2>
                <Grid2 item xs={12} sm={4}>
                  <FormControl fullWidth>
                    <TextField
                      label="Buscar artista"
                      variant="outlined"
                      name="buscaartista"
                      fullWidth
                      sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                      value={nombre}
                      onChange={handleChange}
                    />
                  </FormControl>
                </Grid2>
              </Grid2>
  
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
              mt: 4,
              width: "100%",
              maxWidth: 600,
              margin: "20px auto",
              padding: 3,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#fff",
              textAlign: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", color: "#333" }}>
              {artista.nombre} {artista.apellidos}
            </Typography>
            <Typography variant="body1" sx={{ mt: 2, color: "#555" }}>
              <strong>Fecha de Nacimiento:</strong>{" "}
              {artista.fechaNacimiento || "No disponible."}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, color: "#777" }}>
              <strong>Tipo de Arte:</strong>{" "}
              {artista.tipoArte || "No especificado."}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: "#777" }}>
              <strong>País de Nacimiento:</strong>{" "}
              {artista.paisDeNacimiento || "No especificado."}
            </Typography>
  
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
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
        <Dialog open={Boolean(artistaAEliminar)} onClose={() => setArtistaAEliminar(null)}>
          <DialogTitle>Confirmar Eliminación</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que deseas eliminar el artista{" "}
              &quot;{artistaAEliminar?.nombre} {artistaAEliminar?.apellidos}&quot;?
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
  