/* eslint-disable react-hooks/exhaustive-deps */
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import StarIcon from "@mui/icons-material/Star";
import ApiIcon from "@mui/icons-material/Api";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addToCart, setCartProducts } from "../../rtk/slices/amazonSlice";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect } from "react";

const Products = () => {
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const productsCart = useSelector((state) => state.amazon.products);

  const editDatabaseFromProducts = (data) => {
    let allProductsCart = productsCart;
    if (userInfo) {
      const findIndex = allProductsCart.findIndex(
        (element) => element.id === data.id
      );
      if (findIndex === -1) {
        allProductsCart = [...productsCart, { ...data, quantity: 1 }];
      } else {
        allProductsCart = allProductsCart.map((ele) => {
          if (ele.id === data.id) {
            return { ...ele, quantity: ele.quantity + 1 };
          } else {
            return ele;
          }
        });
      }
      const editDocCartFirebase = async () => {
        await setDoc(doc(db, "cart", userInfo.userId), {
          myProductsCart: allProductsCart,
        });
      };
      if (userInfo) {
        editDocCartFirebase();
      }
    }
  };

  const products = useLoaderData();
  const dispatch = useDispatch();

  const fetchCartFirebase = async () => {
    if (userInfo) {
      const docRef = doc(db, "cart", userInfo.userId);
      const docSnap = await getDoc(docRef);
      dispatch(setCartProducts(docSnap.data().myProductsCart));
      return docSnap.data().productsCart;
    }
  };
  useEffect(() => {
    fetchCartFirebase();
  }, []);

  return (
    <div className=" grid gap-6 p-4 grid-cols-[repeat(auto-fit,minmax(270px,1fr))] bg-gray-100">
      {products &&
        products.map((product) => (
          <div
            key={product.id}
            className=" bg-white border-[1px] border-gray-200 hover:border-transparent  hover:shadow-xl duration-200 relative flex flex-col justify-between"
          >
            <span className=" absolute right-0 top-0 text-xs capitalize text-gray-600 p-2 italic">
              {product.category}
            </span>
            <div className="flex items-center justify-center p-7 relative group ">
              <img
                src={product.image}
                alt="product cart"
                className="object-contain h-56 	"
              />
              <ul className="  absolute w-full font-headFont text-gray-600 bg-gray-100 left-0 bottom-0 translate-y-full duration-500 text-sm font-medium leading-5 tracking-wide group-hover:translate-y-0">
                <li className="productLinks">
                  <ApiIcon sx={{ fontSize: 19 }} />
                  <span>Compare</span>
                </li>
                <li className="productLinks">
                  <ShoppingCartIcon sx={{ fontSize: 19 }} />
                  <span>Add to Cart</span>
                </li>
                <li className="productLinks">
                  <ArrowCircleRightIcon sx={{ fontSize: 19 }} />
                  <span>View Details</span>
                </li>
                <li className="productLinks">
                  <FavoriteIcon sx={{ fontSize: 19 }} />
                  <span>Add to Wish List</span>
                </li>
              </ul>
            </div>
            <div className="p-4 z-20 relative bg-white flex flex-col grow justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className=" text-lg font-medium text-amazonBlue font-headFont">
                    {product.title.slice(0, 20)}
                  </h3>
                  <span className=" text-sm font-semibold text-gray-600">
                    {product.price}$
                  </span>
                </div>
                <p className=" text-sm tracking-wide leading-5">
                  {product.description.slice(0, 100)}...
                </p>
                <div className=" text-yellow-400 mt-1 mb-2">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
              </div>
              <button
                className="w-full text-black my-2 rounded-md font-medium text-center p-2 bg-gradient-to-tr from-yellow-400 to-yellow-200  hover:from-yellow-300 to hover:to-yellow-400 active:from-yellow-400  active:to-yellow-500 border border-yellow-500 hover:border-yellow-600 duration-200 cursor-pointer"
                onClick={() => {
                  dispatch(addToCart(product));
                  editDatabaseFromProducts(product);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Products;
//

// bg-gradient-to-tr from-yellow-400 to-yellow-200
