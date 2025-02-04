
import { Card, CardContent, Button, TextField, Typography, Stack } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../pages/config";
import { useEffect } from "react";


function ModificarObra() {
    const params = useParams();
    const [datos, setDatos] = useState({
        idobra: params.idobra,
        nombre: "",
        descripcion: "",
        fecha: "",
        precio: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        async function getObraById() {
            let response = await fetch(apiUrl + "/obras/" + datos.idobra);
            if (response.ok) {
                let data = await response.json();
                setDatos(data.datos); // Se asume que los datos están dentro de "datos"

            } else if (response.status === 404) {
                let data = await response.json();
                console.log("Error al obtener la obra.");
                alert(data.mensaje);
                navigate("/");
            }
        }

        getObraById();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Vamos a hacer el fecth");
        const response = await fetch(apiUrl + "/obras/" + datos.idobra, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
        if (response.ok) {
            alert("Obra actualizada con éxito.");
            navigate(-1);
        } else {
            const data = await response.json();
            alert(data.mensaje);
        }
    };

    const handleChange = (e) => {
        setDatos({ 
            ...datos, 
            [e.target.name]: e.target.value 
        });
    };

        return (
            <>
                <Card
                    sx={{ maxWidth: 500, width: "100%", margin: "0 auto", mt: 2, mb: 2 }}
                >
                    <CardContent>
                        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
                            <Typography variant="h4" gutterBottom align="center">
                                Modificar Artista
                            </Typography>
                            <TextField
                                label="Nombre"
                                name="nombre"
                                value={datos.nombre}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Apellidos"
                                name="descripcion"
                                value={datos.descripcion}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Fecha de Nacimiento"
                                name="fecha"
                                type="date"
                                value={datos.fecha}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Precio"
                                name="precio"
                                value={datos.precio}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{
                                    alignContent: "center",
                                    display: "block",
                                    margin: "0 auto",
                                    mt: 2,
                                }}
                            >
                                Actualizar Artista
                            </Button>
                        </Stack>
                    </CardContent>
                </Card>
            </>
        )
    }

    export default ModificarObra;