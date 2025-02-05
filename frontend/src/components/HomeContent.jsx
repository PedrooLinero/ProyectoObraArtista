
// Importaciones
import { Box } from "@mui/system";
import {
    MDBCarousel,
    MDBCarouselItem,
    MDBCarouselCaption,
    } from "mdb-react-ui-kit";
import FONDO_2 from "../assets/FONDO_2.jpg";
import OBRA_CARD from "../assets/OBRA_CARD.jpg";
import ARTISTA_CARD from "../assets/ARTISTA_CARD.png";



function HomeContent() {
  return (
    <>
    <Box sx={{ mt: 1, mb: 1 }}>
        <MDBCarousel showControls showIndicators className="mb-0">
          <MDBCarouselItem itemId={1}>
            <img
              src={FONDO_2}
              className="d-block w-100"
              alt="..."
              style={{
                maxHeight: "600px",
                objectFit: "cover",
                maxWidth: "100%",
                height: "68vh",
              }}
            />
            <MDBCarouselCaption className="bg-black bg-opacity-50 w-25 mx-auto">
              <h5>ATHENEA MUSEUM</h5>
              <p>
                Un espacio donde el arte cobra vida, conectando el pasado y el
                presente a través de sus obras.
              </p>
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId={2}>
            <img
              src={OBRA_CARD}
              className="d-block w-100"
              alt="..."
              style={{
                maxHeight: "600px",
                objectFit: "cover",
                maxWidth: "100%",
                height: "68vh",
              }}
            />
            <MDBCarouselCaption className="bg-black bg-opacity-50 w-25 mx-auto">
              <h5>Trazos de la Historia</h5>
              <p>
                Cada obra es una historia única, un reflejo del talento y la
                creatividad que la inspiró.
              </p>
            </MDBCarouselCaption>
          </MDBCarouselItem>
          <MDBCarouselItem itemId={3}>
            <img
              src={ARTISTA_CARD}
              className="d-block w-100"
              alt="..."
              style={{
                maxHeight: "600px",
                objectFit: "cover",
                maxWidth: "100%",
                height: "68vh",
              }}
            />
            <MDBCarouselCaption className="bg-black bg-opacity-50 w-25 mx-auto">
              <h5>Maestros del Arte</h5>
              <p>
                Los artistas dan forma a nuestras emociones y nos enseñan a ver
                el mundo de manera diferente.
              </p>
            </MDBCarouselCaption>
          </MDBCarouselItem>
        </MDBCarousel>
      </Box>
    </>
  );
}

export default HomeContent;