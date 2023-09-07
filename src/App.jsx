import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import Home from "./components/home/Home";
import { ProductsData } from "./api/api";
import Cart from "./components/cart/Cart";
import Signin from "./components/account/Signin";
import Register from "./components/account/Register";
const App = () => {
  const Layout = () => {
    return (
      <>
        <Header />
        <ScrollRestoration />
        <Outlet />
        <Footer />
      </>
    );
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Layout />}>
          <Route index loader={ProductsData} element={<Home />} />
          <Route path="cart" element={<Cart />} />
        </Route>
        <Route path="signin" element={<Signin />} />
        <Route path="register" element={<Register />} />
      </>
    )
  );

  return (
    <div className=" font-bodyFont bg-gray-100 ">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
};

export default App;
