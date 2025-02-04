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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);