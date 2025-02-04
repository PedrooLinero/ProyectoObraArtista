import { Typography, Card, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Box } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { Stack, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import { apiUrl } from "../pages/config";

function BuscarObra() {
    const [datos, setDatos] = useState({
        idartista: "",
    });

    const [artistas, setArtistas] = useState([]);
    const [obras, setObras] = useState([]); // Estado para las obras
    const [openModal, setOpenModal] = useState(false); // Estado para abrir el modal
    const [modalMessage, setModalMessage] = useState(""); // Mensaje del modal
    const [loading, setLoading] = useState(false);  // Estado para el loading

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

    const handleChangeSel = (event) => {
        setDatos({
            ...datos,
            idartista: event.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);  // Mostrar el loading

        try {
            const response = await fetch(apiUrl + "/obras/idartista/" + datos.idartista);

            if (response.ok) {
                const data = await response.json();
                if (data.datos.length === 0) {
                    // Si no hay obras, mostrar el modal
                    setModalMessage(`${artistas.find(artista => artista.idartista === datos.idartista).nombre} no tiene obras creadas.`);
                    setOpenModal(true);
                }
                setObras(data.datos); // Guardar las obras en el estado
            } else {
                console.error("Error al obtener las obras.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        } finally {
            setLoading(false);  // Ocultar el loading después de la respuesta
        }
    }

    const handleCloseModal = () => {
        setOpenModal(false); // Cerrar el modal
    }

    return (
        <>
            <Box sx={{ minheight: '68vh' }}>
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
                    Buscar Obras de un Artista
                </Typography>
                <Grid2 container justifyContent="center" sx={{ mt: 2, mb: 4 }}>
                    <Grid2 item xs={12} sm={10} md={8}>
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
                            <Grid2>
                                <Grid2 xs={12} sm={4}>
                                    <FormControl fullWidth>
                                        <InputLabel id="idartista-label">Artista</InputLabel>
                                        <Select
                                            labelId="idartista-label"
                                            id="idartista"
                                            value={datos.idartista}
                                            onChange={handleChangeSel}
                                            label="Artista"
                                            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                                        >
                                            {artistas.map((artista) => (
                                                <MenuItem key={artista.idartista} value={artista.idartista}>
                                                    {artista.nombre} ({artista.paisDeNacimiento})
                                                </MenuItem>
                                            ))}
                                        </Select>
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
                                Buscar Obras del Artista
                            </Button>
                        </Stack>
                    </Grid2>
                </Grid2>

                {/* Mostrar Loading mientras se cargan las obras */}
                {loading && (
                    <CircularProgress sx={{ display: "block", margin: "auto", marginTop: 3 }} />
                )}

                {/* Mostrar las obras si existen */}
                <Grid2 container spacing={4}>
                    {obras.map((obra) => (
                        <Grid2 item xs={12} sm={6} md={4} key={obra.idobra}>
                            <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                                <CardMedia
                                    component="img"
                                    alt={obra.nombre}
                                    height="250"
                                    image={obra.imagen_url}
                                    sx={{ objectFit: "cover" }}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {obra.nombre}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {obra.descripcion}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mt: 2, fontWeight: "bold" }}>
                                        {`Precio: $${obra.precio}`}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>

                {/* Modal de advertencia cuando no hay obras */}
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
            </Box>
        </>
    );
}

export default BuscarObra;
