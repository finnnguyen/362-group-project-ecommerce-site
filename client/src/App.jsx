import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product"
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import About from "./pages/About/About";
import "./global.css";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"

const Layout = () => {
  return (
    <div className="app">
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "",
    element:<Layout/>,
    children: [
      {
        path: "",
        element: <Home/>
      },
      {
        path: ":category",
        element: <Products/>
      },
      {
        path: ":category/:id",
        element: <Product />
      },
      {
        path: ":category/:subcategory/:id",
        element: <Product/>
      },

      {
        path: "about",
        element: <About/>
      },

      // page not found or invalid product
      {
        path: "*",              
        element: <NotFound/>
      },
      {
        path: "notfound",
        element: <NotFound/>
      }
    ],
  },
])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;
