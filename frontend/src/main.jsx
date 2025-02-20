import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";
import AltaObras from "./components/AltaObras";
import ListaObras from "./components/ListaObras";
import AltaArtistas from "./components/AltaArtistas";
import ListaArtistas from "./components/ListaArtistas";
import HomeContent from "./components/HomeContent";
import ModificarArtista from "./components/ModificarArtista";
import ModificarObra from "./components/ModificarObra";
import ListarArtistaPorArte from "./components/ListarArtistaPorArte";
import ListarObraPorArtista from "./components/ListarObraPorArtista";
import BuscarObraPorNombre from "./components/BuscarObraPorNombre";
import BuscarArtistaPorNombre from "./components/BuscarArtistaPorNombre";
import PaginaError from "./pages/PaginaError";
import GraficaObras from "./components/GraficaObras";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PaginaError />,
    children: [
      {
        path: "/",
        element: <HomeContent />,
      },
      {
        path: "altaobras",
        element: <AltaObras />,
      },
      {
        path: "listaobras",
        element: <ListaObras />,
      },
      {
        path: "altaartistas",
        element: <AltaArtistas />,
      },
      {
        path: "listaartistas",
        element: <ListaArtistas />,
      },
      {
        path: "modificarartista/:idartista",
        element: <ModificarArtista />,
      }, 
      {
        path: "modificarobra/:idobra",
        element: <ModificarObra />,
      },
      {
        path: "listarobra/:idartista",
        element: <ListarObraPorArtista />,
      },
      {
        path: "graficaobras",
        element: <GraficaObras />,
      },
      {
        path: "listarartista/:tipoArte",
        element: <ListarArtistaPorArte />,
      },
      {
        path: "buscarobra/:nombre",
        element: <BuscarObraPorNombre />,
      },
      {
        path: "buscarartista/:nombre",
        element: <BuscarArtistaPorNombre />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);