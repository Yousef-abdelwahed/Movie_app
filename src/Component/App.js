import {
  HashRouter,
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";

//pages
import Home from "../Pages/Home";
import Layout from "./Layout";
import Movie from "../Pages/Movie";
import Tvshow from "../Pages/Tvshow";
import People from "../Pages/People";
import Network from "../Pages/Network";
import About from "../Pages/About";
import Login from "../Pages/Login";
import Register from "../Pages/Register";

//packages
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "@fortawesome/fontawesome-free/css/all.min.css";

//style
import "../index.css";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Profile from "../Pages/Profile";
import ProtectedCompoenet from "./ProtectedCompoenet";
import ItemDetails from "../Pages/ItemDetails";

function App() {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      saveUserData();
    }
  }, []);
  //
  function saveUserData() {
    let endoce = localStorage.getItem("userToken");
    let decode = jwtDecode(endoce);
    console.log(userData);
    setUserData(decode);
  }

  const router = createHashRouter([
    {
      path: "",
      element: <Layout userData={userData} setUserData={setUserData} />,
      children: [
        { path: "register", element: <Register /> },
        { path: "profile", element: <Profile /> },

        {
          path: "/",
          element: (
            <ProtectedCompoenet userData={userData}>
              <Home />
            </ProtectedCompoenet>
          ),
        },
        {
          path: "details/:id/:media_type",
          element: (
            <ProtectedCompoenet userData={userData}>
              <ItemDetails />
            </ProtectedCompoenet>
          ),
        },
        {
          path: "movie",
          element: (
            <ProtectedCompoenet userData={userData}>
              <Movie />
            </ProtectedCompoenet>
          ),
        },
        {
          path: "tvshow",
          element: (
            <ProtectedCompoenet userData={userData}>
              <Tvshow />
            </ProtectedCompoenet>
          ),
        },
        {
          path: "people",
          element: (
            <ProtectedCompoenet userData={userData}>
              <People />
            </ProtectedCompoenet>
          ),
        },
        {
          path: "about",
          element: (
            <ProtectedCompoenet userData={userData}>
              <About />
            </ProtectedCompoenet>
          ),
        },
        {
          path: "network",
          element: (
            <ProtectedCompoenet userData={userData}>
              <Network />
            </ProtectedCompoenet>
          ),
        },
        {
          path: "login",
          element: <Login saveUserData={saveUserData} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
