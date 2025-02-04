
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { Stack, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useState } from "react";

function BuscarArtista() {

    const [datos, setDatos] = useState({
        tipoArte: "",
    });

    const handleChange = (e) => {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(datos);
    }

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
                Buscar Artistas por su Arte
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
                            Buscar Artistas por su Arte
                        </Button>
                    </Stack>
                </Grid2>
            </Grid2>
        </>
    );
}

export default BuscarArtista;
