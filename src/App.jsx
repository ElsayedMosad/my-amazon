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
import Details from "./components/details/Details";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);
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
          <Route path="details/:productId" element={<Details />} />
        </Route>
        <Route path="signin" element={<Signin />} />
        <Route path="register" element={<Register />} />
      </>
    )
  );

  return (
    <div className=" font-bodyFont bg-gray-100 ">
      {loading ? (
        <div className=" w-full min-h-screen flex justify-center items-center  bg-gray-200">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#F3A847"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <RouterProvider router={router}></RouterProvider>
        </>
      )}
    </div>
  );
};

export default App;
