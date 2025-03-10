import { useState } from "react";
import {
  AppBar,
  Toolbar,
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
import ArtTrackIcon from "@mui/icons-material/ArtTrack"; // Icono para Obras
import BrushIcon from "@mui/icons-material/Brush"; // Icono para Artistas
import LOGO_MUSEO_ARTE from "../assets/LOGO_MUSEO_ARTE.png";
import { Link } from "react-router-dom";

/**
 * Componente de menú que incluye una barra de navegación superior y un drawer lateral.
 * @returns {JSX.Element} El componente de menú.
 */
function Menu() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [obrasOpen, setObrasOpen] = useState(false);
  const [artistasOpen, setArtistasOpen] = useState(false);

  /**
   * Alterna el estado del drawer lateral.
   */
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  /**
   * Alterna el estado del menú de obras.
   */
  const toggleObrasMenu = () => {
    setObrasOpen(!obrasOpen);
  };

  /**
   * Alterna el estado del menú de artistas.
   */
  const toggleArtistasMenu = () => {
    setArtistasOpen(!artistasOpen);
  };

  return (
    <>
      {/* Navbar Superior */}
      <AppBar position="static" sx={{ backgroundColor: "#24221e" }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src={LOGO_MUSEO_ARTE} height="125" alt="Museo de Arte" />
            </Link>
          </Box>
          <IconButton color="inherit" edge="end" onClick={toggleDrawer}>
            <MenuIcon sx={{ color: "#c98c26" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer Lateral */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#24221e",
          },
        }}
      >
        <Box sx={{ width: 250, paddingTop: 2 }}>
          <List>
            {/* Menú de Obras con Icono */}
            <ListItem button onClick={toggleObrasMenu}>
              <ArtTrackIcon sx={{ marginRight: 1, color: "#b57918" }} />{" "}
              {/* Icono de Obras */}
              <ListItemText primary="Obras" sx={{ color: "#b57918" }} />
              {obrasOpen ? (
                <ExpandLessIcon sx={{ color: "#b57918" }} />
              ) : (
                <ExpandMoreIcon sx={{ color: "#b57918" }} />
              )}
            </ListItem>
            <Collapse in={obrasOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4 }}>
                  <Link to="/altaobras" style={{ textDecoration: "none" }}>
                    <ListItemText
                      primary="Alta de Obras"
                      sx={{ color: "#d9a95b" }}
                    />
                  </Link>
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <Link to="/listaobras" style={{ textDecoration: "none" }}>
                    <ListItemText
                      primary="Lista de Obras"
                      sx={{ color: "#d9a95b" }}
                    />
                  </Link>
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <Link
                    to="/buscarobra/:nombre"
                    style={{ textDecoration: "none" }}
                  >
                    <ListItemText
                      primary="Buscar Obra por su Nombre"
                      sx={{ color: "#d9a95b" }}
                    />
                  </Link>
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <Link
                    to="/listarobra/:idartista"
                    style={{ textDecoration: "none" }}
                  >
                    <ListItemText
                      primary="Listar Obras por su Artista"
                      sx={{ color: "#d9a95b" }}
                    />
                  </Link>
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <Link to="/graficaobras" style={{ textDecoration: "none" }}>
                    <ListItemText
                      primary="Gráfica de Obras por Artista"
                      sx={{ color: "#d9a95b" }}
                    />
                  </Link>
                </ListItem>
              </List>
            </Collapse>

            {/* Menú de Artistas con Icono */}
            <ListItem button onClick={toggleArtistasMenu}>
              <BrushIcon sx={{ marginRight: 1, color: "#b57918" }} />{" "}
              {/* Icono de Artistas */}
              <ListItemText primary="Artistas" sx={{ color: "#b57918" }} />
              {artistasOpen ? (
                <ExpandLessIcon sx={{ color: "#b57918" }} />
              ) : (
                <ExpandMoreIcon sx={{ color: "#b57918" }} />
              )}
            </ListItem>
            <Collapse in={artistasOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem sx={{ pl: 4 }}>
                  <Link to="/altaartistas" style={{ textDecoration: "none" }}>
                    <ListItemText
                      primary="Alta de Artistas"
                      sx={{ color: "#d9a95b" }}
                    />
                  </Link>
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <Link to="/listaartistas" style={{ textDecoration: "none" }}>
                    <ListItemText
                      primary="Lista de Artistas"
                      sx={{ color: "#d9a95b" }}
                    />
                  </Link>
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <Link
                    to="/buscarartista/:nombre"
                    style={{ textDecoration: "none" }}
                  >
                    <ListItemText
                      primary="Buscar Artista por su Nombre"
                      sx={{ color: "#d9a95b" }}
                    />
                  </Link>
                </ListItem>
                <ListItem button sx={{ pl: 4 }}>
                  <Link
                    to="/listarartista/:tipoArte"
                    style={{ textDecoration: "none" }}
                  >
                    <ListItemText
                      primary="Listar Artistas por su Arte"
                      sx={{ color: "#d9a95b" }}
                    />
                  </Link>
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Menu;
