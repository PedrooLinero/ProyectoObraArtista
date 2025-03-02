import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const generatePDF = () => {
  const input = document.getElementById("pdf-content"); // ID del contenedor a capturar
  if (!input) {
    console.error("Elemento no encontrado: pdf-content");
    return;
  }

  html2canvas(input, {
    scale: 2,
    useCORS: true, // Permite cargar imágenes de otros dominios
    allowTaint: true, // Permite cargar imágenes sin CORS
    logging: true, // Habilita el registro para depuración
  })
    .then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Ajuste de altura proporcional

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("documento.pdf");
    })
    .catch((error) => {
      console.error("Error al generar el PDF:", error);
    });
};

export default generatePDF;
