import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import Product from "./pages/Product/Product"
import Navbar from "./components/navBar/navBar";
import Footer from "./components/Footer/Footer";
import NotFound from "./components/NotFound/NotFound";
import "./global.css";

import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom"
import SubcategoryProducts from "./components/SubcategoryProducts/SubcategoryProducts";

const Layout = () => {
  return (
    <div className="app">
      <Navbar/>
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
        path: ":category/:subcategory",
        element: <SubcategoryProducts/>
      },
      {
        path: ":category/:subcategory/:id",
        element: <Product/>
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
