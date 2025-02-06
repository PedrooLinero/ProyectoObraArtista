import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import {
  Stack,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  DialogContentText,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiUrl } from "../pages/config";
import { useNavigate } from "react-router-dom";

function ListarObraPorArtista() {
  const [datos, setDatos] = useState({ idartista: "" });
  const [artistas, setArtistas] = useState([]);
  const [obras, setObras] = useState([]);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [obraAEliminar, setObraAEliminar] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getArtistas() {
      try {
        const response = await fetch(apiUrl + "/artistas");
        if (response.ok) {
          const data = await response.json();
          setArtistas(data.datos);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
    getArtistas();
  }, []);

  const handleDeleteConfirm = async () => {
    if (!obraAEliminar) return;

    try {
      const response = await fetch(
        `${apiUrl}/artistas/${obraAEliminar.idobra}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setArtistas(
          artistas.filter(
            (artista) => artista.idartista !== obraAEliminar.idobra
          )
        );
        console.log("Artista eliminado con ID:", obraAEliminar.idobra);
      } else {
        console.error("Error al eliminar el artista.");
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    } finally {
      setObraAEliminar(null);
    }
  };

  const handleChangeSel = (event) => {
    setDatos({ ...datos, idartista: event.target.value });
  };

  const handleEdit = (idartista) => {
    navigate(`/modificarartista/${idartista}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        apiUrl + "/obras/idartista/" + datos.idartista
      );
      if (response.ok) {
        const data = await response.json();
        if (data.datos.length === 0) {
          setModalMessage(
            `${
              artistas.find((artista) => artista.idartista === datos.idartista)
                .nombre
            } no tiene obras creadas.`
          );
          setOpenModal(true);
        }
        setObras(data.datos);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Box sx={{ minHeight: "68.6vh" }}>
        <Typography
          variant="h4"
          align="center"
          sx={{ mt: 2, mb: 3, color: "#c98c26", fontWeight: "bold" }}
        >
          Listar Obras de un Artista
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
              <FormControl fullWidth>
                <InputLabel>Artista</InputLabel>
                <Select
                  id="idartista"
                  value={datos.idartista}
                  onChange={handleChangeSel}
                  label="Artista"
                >
                  {artistas.map((artista) => (
                    <MenuItem key={artista.idartista} value={artista.idartista}>
                      {artista.nombre} ({artista.paisDeNacimiento})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  bgcolor: "#c98c26",
                  "&:hover": { bgcolor: "#a76f1f" },
                  fontWeight: "bold",
                }}
              >
                Listar Obras del Artista
              </Button>
            </Stack>
          </Grid2>
        </Grid2>

        {loading && (
          <CircularProgress
            sx={{ display: "block", margin: "auto", marginTop: 3 }}
          />
        )}
        <Box sx={{ mx: 2 }}>
          <Grid2 container spacing={4} sx={{ mb: 4, justifyContent: "center" }}>
            {obras.map((obra) => (
              <Grid2
                item
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                key={obra.idobra}
              >
                <Card
                  alt={obra.nombre}
                  image={obra.imagen_url || "default_image.jpg"}
                  sx={{
                    maxWidth: 345,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: 3,
                    borderRadius: 2,
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={obra.nombre}
                    height="200"
                    image={obra.imagen_url}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ textAlign: "center", mb: 2 }}
                    >
                      {obra.nombre}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "center", mb: 2 }}
                    >
                      {obra.descripcion}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "center", mb: 2 }}
                    >
                      <strong>Precio:</strong> €{obra.precio}
                    </Typography>
                    <Box
                      sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                    >
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
                    </Box>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Box>
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

      <Dialog open={obraAEliminar} onClose={() => setObraAEliminar(null)}>
        <DialogTitle>
          <WarningIcon sx={{ color: "orange", mr: 1 }} /> Advertencia
        </DialogTitle>
        <DialogContentText sx={{ mx: 2 }}>
          ¿Estás seguro de que deseas eliminar al artista{" "}
          <strong>{obraAEliminar?.nombre}</strong>?
        </DialogContentText>
        <DialogContent>
          <Typography>{modalMessage}</Typography>
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

export default ListarObraPorArtista;
