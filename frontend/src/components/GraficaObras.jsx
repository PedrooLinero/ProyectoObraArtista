import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { apiUrl } from "../pages/config.js";

function GraficaObras() {
  const [datos, setDatos] = useState([]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28BFE",
    "#FF4567",
    "#32CD32",
    "#8B008B",
    "#FF1493",
    "#00FFFF",
    "#7FFF00",
    "#D2691E",
    "#DC143C",
    "#FFD700",
    "#ADFF2F",
    "#8A2BE2",
    "#FF6347",
    "#40E0D0",
    "#DA70D6",
    "#FF4500",
    "#1E90FF",
    "#3CB371",
    "#9932CC",
    "#FF8C00",
    "#66CDAA",
    "#B22222",
    "#FF00FF",
    "#FFDEAD",
    "#4B0082",
    "#20B2AA",
    "#E6E6FA",
    "#8B4513",
    "#48D1CC",
    "#FF69B4",
    "#CD5C5C",
    "#4682B4",
    "#EE82EE",
    "#FF7F50",
    "#9ACD32",
    "#BA55D3",
    "#6495ED",
    "#2E8B57",
    "#FFB6C1",
    "#DB7093",
    "#5F9EA0",
    "#FFDAB9",
    "#FF0000",
    "#8FBC8F",
    "#7B68EE",
    "#FA8072",
  ];

  useEffect(() => {
    async function getDatosGraficaObras() {
      try {
        const response = await fetch(apiUrl + "/obras/graficaobras", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          const datosGrafica = data.datos.map((fila) => ({
            name: fila["artista.nombre"] || fila.nombre, // Nombre del artista en el eje X
            numeroObras: parseInt(fila.numeroObras, 10), // Número de obras en el eje Y
          }));
          setDatos(datosGrafica);
        } else {
          console.error("Error en la solicitud:", response.statusText);
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    }
    getDatosGraficaObras();
  }, []);

  const maxNumeroObras = Math.max(...datos.map((item) => item.numeroObras + 2));

  return (
    <>
      <Box></Box>
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
        Gráfica de Obras por Artista
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4, mb: 8 }}>
        <BarChart width={1000} height={450} data={datos}>
          {" "}
          {/* Aumenté la altura del gráfico */}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{ value: "Artista", position: "bottom", offset: 20 }} // Mueve la etiqueta más abajo
            tick={{
              angle: 0, // No rotar las etiquetas
              textAnchor: "middle", // Centra las etiquetas en el eje X
              verticalAnchor: "middle", // Centra verticalmente las etiquetas
              dy: 10, // Ajusta el espaciado para que las etiquetas no se peguen
            }}
            interval={0} // Asegura que todas las etiquetas sean visibles
          />
          <YAxis
            label={{
              value: "Número de Obras",
              angle: -90,
              position: "insideLeft",
            }}
            domain={[0, maxNumeroObras]}
          />
          <Tooltip />
          <Bar dataKey="numeroObras">
            {datos.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </Box>
    </>
  );
}

export default GraficaObras;
