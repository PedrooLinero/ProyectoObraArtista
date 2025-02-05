import { Box, Typography, Button, Container } from "@mui/material";
import Menu from "../components/Menu";

function PaginaError() {
  return (
    <>
      <Menu />
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            padding: 4,
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            color="primary"
            sx={{ marginBottom: 2 }}
          >
            ¡Oops! Página no encontrada
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{ marginBottom: 4 }}
          >
            La ruta que estás buscando no existe. Puede que haya sido movida,
            eliminada o nunca existió.
          </Typography>

          <Box textAlign={"center"} sx={{ mt: 2 }}>
            <Button variant="contained" href="/" sx={{ mt: 2 }}>
              Ir a la página principal
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default PaginaError;
