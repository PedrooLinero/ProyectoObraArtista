/**
 * Componente para listar obras.
 * @returns {JSX.Element} El componente de listado de obras.
 */

import {
  Typography,
  Grid2,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { apiUrl } from "../pages/config";
import { useNavigate } from "react-router-dom";
import generatePDF from "../utils/generatePDF";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Estilos para el PDF
const styles = StyleSheet.create({
  page: { padding: 20 },
  tittle: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  table: {
    width: "100%", // Ocupa el 100% del ancho disponible
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row", // Utiliza flex para las filas
  },
  tableColHeader: {
    width: "25%", // Distribuye uniformemente las 4 columnas
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "#ddd",
    padding: 5,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    padding: 5,
    textAlign: "center",
  },
});

/**
 * Componente para generar el PDF del listado de obras.
 * @param {Object} data - Los datos de las obras.
 * @returns {JSX.Element} El documento PDF.
 */
const ListadoObrasPDF = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Document>
        <Page style={styles.page}>
          <Text style={styles.tittle}>No hay datos disponibles</Text>
        </Page>
      </Document>
    );
  }

  return (
    <Document>
      <Page style={styles.page}>
        <View>
          <Text style={styles.tittle}>Listado de Obras</Text>
          <View style={styles.table}>
            {/* Encabezados */}
            <View style={styles.tableRow}>
              <View style={styles.tableColHeader}>
                <Text>Nombre</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>Descripción</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>Precio</Text>
              </View>
              <View style={styles.tableColHeader}>
                <Text>Artista</Text>
              </View>
            </View>
            {/* Datos */}
            {data.map((row) => (
              <View style={styles.tableRow} key={row.idobra}>
                <View style={styles.tableCol}>
                  <Text>{row.nombre}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{row.descripcion}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{row.precio}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text>{row.idartista}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

function ListaObras() {
  const [obras, setObras] = useState([]);
  const [artistas, setArtistas] = useState({});
  const [obraAEliminar, setObraAEliminar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getObras() {
      try {
        const response = await fetch(apiUrl + "/obras");

        if (response.ok) {
          const data = await response.json();
          setObras(data.datos);
        } else {
          console.error("Error al obtener las obras.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }

    async function getArtistas() {
      try {
        const response = await fetch(apiUrl + "/artistas");

        if (response.ok) {
          const data = await response.json();
          const artistasMap = data.datos.reduce((acc, artista) => {
            acc[artista.idartista] = artista.nombre;
            return acc;
          }, {});
          setArtistas(artistasMap);
        } else {
          console.error("Error al obtener los artistas.");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }

    getObras();
    getArtistas();
  }, []);

  /**
   * Navega a la página de edición de una obra.
   * @param {number} idobra - El ID de la obra a editar.
   */
  const handleEdit = (idobra) => {
    navigate(`/modificarobra/${idobra}`);
  };

  /**
   * Maneja la confirmación de eliminación de una obra.
   */
  const handleDelete = async () => {
    if (!obraAEliminar) return;
    try {
      const response = await fetch(`${apiUrl}/obras/${obraAEliminar.idobra}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setObras(obras.filter((obra) => obra.idobra !== obraAEliminar.idobra));
        setObraAEliminar(null);
      } else {
        console.error("Error al eliminar la obra.");
      }
    } catch (error) {
      console.error("Error en la solicitud de eliminación:", error);
    }
  };

  return (
    <>
      <Box id="pdf-content">
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
          Listado de Obras
        </Typography>
        <Box sx={{ mx: 2 }}>
          <Grid2
            container
            spacing={3}
            sx={{ mt: 3, mb: 2, justifyContent: "center" }}
          >
            {obras.map((obra) => (
              <Grid2
                item
                size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
                display="flex"
                justifyContent="center"
                key={obra.idobra}
              >
                <Card
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
                    image={obra.imagen_url || "default_image.jpg"}
                    sx={{
                      width: 345,
                      maxHeight: 180,
                      objectFit: "cover",
                      borderTopLeftRadius: 2,
                      borderTopRightRadius: 2,
                    }}
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
                    <Box
                      sx={{
                        borderTop: "1px solid #ddd",
                        paddingTop: 2,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        <strong>Precio:</strong> €{obra.precio}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Artista:</strong>{" "}
                        {artistas[obra.idartista] || "Desconocido"}
                      </Typography>
                    </Box>
                  </CardContent>
                  <CardActions
                    sx={{ justifyContent: "center", paddingBottom: "16px" }}
                  >
                    <IconButton
                      onClick={() => handleEdit(obra.idobra)}
                      sx={{
                        color: "#b57918",
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" },
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => setObraAEliminar(obra)}
                      sx={{
                        color: "#b57918",
                        "&:hover": { backgroundColor: "rgba(255, 0, 0, 0.1)" },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        </Box>
      </Box>
      <Box
        sx={{
          mx: 4,
          mt: 4,
          mb: 4,
          display: "flex",
          gap: 2,
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          onClick={() => window.print()}
          sx={{
            minWidth: "150px",
            height: "50px",
            backgroundColor: "#b57918",
            borderRadius: "4px", // Bordes menos redondeados
            textTransform: "none",
          }}
        >
          Imprimir listado (navegador)
        </Button>
        <Button
          variant="contained"
          onClick={generatePDF}
          sx={{
            minWidth: "150px",
            height: "50px",
            backgroundColor: "#b57918",
            borderRadius: "4px",
            textTransform: "none",
          }}
        >
          Imprimir listado (jsPDF + html2canvas)
        </Button>
        <Button
          variant="contained"
          sx={{
            minWidth: "150px",
            height: "50px",
            backgroundColor: "#b57918",
            color: "white",
            borderRadius: "4px",
            textTransform: "none",
          }}
        >
          <PDFDownloadLink
            document={<ListadoObrasPDF data={obras || []} />}
            fileName="tabla.pdf"
            style={{
              color: "inherit",
              textDecoration: "none",
              width: "100%",
              textAlign: "center",
            }}
          >
            {({ loading }) =>
              loading ? "Generando PDF..." : "Imprimir listado (react-pdf)"
            }
          </PDFDownloadLink>
        </Button>
      </Box>

      <Dialog
        open={Boolean(obraAEliminar)}
        onClose={() => setObraAEliminar(null)}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar la obra &quot;
            {obraAEliminar?.nombre}&quot;?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setObraAEliminar(null)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ListaObras;
