import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import ArtTrackIcon from "@mui/icons-material/ArtTrack"; // Icono para Obras
import BrushIcon from "@mui/icons-material/Brush"; // Icono para Artistas
import LOGO_MUSEO_ARTE from "../assets/LOGO_MUSEO_ARTE.png";
import FOTO_FONDO from "../assets/FOTO_FONDO.jpg";

function Menu() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [obrasOpen, setObrasOpen] = useState(false);
  const [artistasOpen, setArtistasOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleObrasMenu = () => {
    setObrasOpen(!obrasOpen);
  };

  const toggleArtistasMenu = () => {
    setArtistasOpen(!artistasOpen);
  };

  return (
    <>
      {/* Navbar Superior */}
      <AppBar position="static" sx={{ backgroundColor: "#24221e" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <img src={LOGO_MUSEO_ARTE} height="125" alt="Museo de Arte" />
          </Box>
          <IconButton color="inherit" edge="end" onClick={toggleDrawer}>
            <MenuIcon sx={{ color: '#c98c26' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer Lateral */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer} sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#24221e",
        },
      }}>
        <Box sx={{ width: 250, paddingTop: 2 }}>
          <List>
            {/* Menú de Obras con Icono */}
            <ListItem button onClick={toggleObrasMenu}>
              <ArtTrackIcon sx={{ marginRight: 1, color: '#b57918' }} /> {/* Icono de Obras */}
              <ListItemText primary="Obras" sx={{ color: "#b57918" }} />
              {obrasOpen ? (
                <ExpandLessIcon sx={{ color: "#b57918" }} /> 
              ) : (
                <ExpandMoreIcon sx={{ color: "#b57918" }} /> 
              )}
            </ListItem>
            <Collapse in={obrasOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary="Alta de Obras" sx={{ color: "#d9a95b" }} />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary="Lista de Obras" sx={{ color: "#d9a95b" }} />
                </ListItem>
              </List>
            </Collapse>


            {/* Menú de Artistas con Icono */}
            <ListItem button onClick={toggleArtistasMenu}>
              <BrushIcon sx={{ marginRight: 1, color: '#b57918' }} /> {/* Icono de Artistas */}
              <ListItemText primary="Artistas" sx={{ color: "#b57918" }} />
              {artistasOpen ? (
                <ExpandLessIcon sx={{ color: "#b57918" }} /> 
              ) : (
                <ExpandMoreIcon sx={{ color: "#b57918" }} /> 
              )}
            </ListItem>
            <Collapse in={artistasOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary="Alta de Artistas" sx={{ color: "#d9a95b" }} />
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <ListItemText primary="Lista de Artistas" sx={{ color: "#d9a95b" }} />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>

      {/* Imagen de Fondo */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 2 }}>
        <img src={FOTO_FONDO} style={{ width: "100%", height: "auto" }} alt="Museo" />
      </Box>

      {/* Footer */}
      <AppBar position="static" sx={{ top: "auto", bottom: 0, backgroundColor: "#24221e" }}>
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="body1" color="inherit" sx={{ textAlign: "center", marginTop: 1 }}>
              © 2025 ATHENEA - Museo de Arte
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <IconButton color="inherit" href="https://www.facebook.com" target="_blank">
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" href="https://www.twitter.com" target="_blank">
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" href="https://www.instagram.com" target="_blank">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Menu;
