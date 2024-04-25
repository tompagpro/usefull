import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login.tsx";
import { GuestHomepage } from "../pages/GuestHomepage.tsx";
import { InternalServerErrorPage } from "../pages/500.tsx";
import { NotFoundErrorPage } from "../pages/404.tsx";
// import { SidebarUser } from "../components/SidebarUser.tsx";
import { PrivateRoute } from "./privateRoute.tsx";
import { UserProvider } from "../context/authContext.tsx";
// import { Navbar } from "../components/Navbar.tsx";
import { ConnectedUser } from "../pages/ConnectedUser.tsx";
import { Register } from "../pages/Register.tsx";
import IconPicker from "../components/IconPicker.tsx";
import { Resources } from "../pages/Resources.tsx";
import { Welcome } from "../pages/Welcome.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GuestHomepage />,
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: "/icon",
    element: <IconPicker open="true" onClose="onClose" onSelect="selezct"/>,
  },
  {
    path: "/login",
    element: (
      <UserProvider>
        <Login />
      </UserProvider>
    ),
  },
  {
    path: "/register",
    element: (
      <UserProvider>
        <Register />
      </UserProvider>
    ),
  },
  {
    path: "/500",
    element: <InternalServerErrorPage />,
  },
  {
    path: "/usr",
    element: (
      <UserProvider>
        <PrivateRoute>
          <ConnectedUser></ConnectedUser>
        </PrivateRoute>
      </UserProvider>
    ),
    children: [
      {
        path: "welcome",
        element: <Welcome />
      },
      {
        path: ":categoryId/ressources",
        element: <Resources />
      }
    ]
  },
]);
