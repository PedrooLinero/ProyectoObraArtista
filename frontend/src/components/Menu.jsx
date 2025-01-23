import { AppBar, Toolbar, Typography } from "@mui/material";
import {
  // MDBContainer,
  // MDBNavbar,
  MDBNavbarBrand,
  // MDBNavbarToggler,
  // MDBIcon,
  // MDBNavbarNav,
  // MDBNavbarItem,
  // MDBDropdown,
  // MDBDropdownToggle,
  // MDBDropdownMenu,
  // MDBDropdownItem,
  // MDBCollapse,
} from "mdb-react-ui-kit";
import LOGO_MUSEO_ARTE from "../assets/LOGO_MUSEO_ARTE.png";
import FOTO_FONDO from "../assets/FOTO_FONDO.jpg";
import { Box } from "@mui/system";
import { IconButton } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';


function Menu() {
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#24221e' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex' , justifyContent: 'center'}}>
            <MDBNavbarBrand href="#">
              <img src={LOGO_MUSEO_ARTE} height="125" alt="" loading="lazy"/>
            </MDBNavbarBrand>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 2 }}>
        <img src={FOTO_FONDO} style={{ width: '100%', height: 'auto' }} />
      </Box>
      <AppBar position="static" sx={{ top: 'auto', bottom: 0, backgroundColor: '#24221e' }}>
        <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="body1" color="inherit" sx={{ textAlign: 'center', marginTop: 1 }}>
              © 2025 ATHENEA - Museo de Arte 
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
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
