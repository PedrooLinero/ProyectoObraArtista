// Importaciones
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

/**
 * Componente Footer que muestra la barra de navegación inferior con enlaces a redes sociales.
 * @returns {JSX.Element} El componente Footer.
 */
function Footer() {
    return (
        <>
            {/* Footer */}
            <AppBar
                position="static"
                sx={{ top: "auto", bottom: 0, backgroundColor: "#24221e", padding: 1 }}
            >
                <Toolbar>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="body1"
                            color="inherit"
                            sx={{ textAlign: "center", marginTop: 1 }}
                        >
                            © 2025 ATHENEA - Museo de Arte
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            {/* Botón de Facebook */}
                            <IconButton
                                color="inherit"
                                href="https://www.facebook.com"
                                target="_blank"
                            >
                                <FacebookIcon />
                            </IconButton>
                            {/* Botón de Twitter */}
                            <IconButton
                                color="inherit"
                                href="https://www.twitter.com"
                                target="_blank"
                            >
                                <TwitterIcon />
                            </IconButton>
                            {/* Botón de Instagram */}
                            <IconButton
                                color="inherit"
                                href="https://www.instagram.com"
                                target="_blank"
                            >
                                <InstagramIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Footer;