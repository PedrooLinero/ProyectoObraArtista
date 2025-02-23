import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const generatePDF = () => {
  const input = document.getElementById("grafica-obras"); // ID del contenedor del gráfico
  html2canvas(input, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190; // A4 width menos márgenes
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.text("Informe de Obras por Artista", 10, 10);
    pdf.addImage(imgData, "PNG", 10, 20, imgWidth, imgHeight);
    pdf.save("informe_grafica_obras.pdf");
  });
};


export default generatePDF;