/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";

// import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { addToCart } from "../../rtk/slices/cartSlice";

const Details = () => {
  let { productId } = useParams();
  // console.log(productId);

  const userInfo = useSelector((state) => state.userReducer.userInfo);
  // const myProduct = useSelector((state) => state.productReducer.products);
  // console.log(myProduct);

  const productsCart = useSelector((state) => state.cartReducer.cartProducts);

  const dispatch = useDispatch();

  let [product, setProduct] = useState({});
  // console.log(product);
  const fetchProductById = (id) => {
    // console.log(id);
    // try {
    //   const response = await axios.get(
    //     `https://dummyjson.com/products/${id}`
    //     // `https://fakestoreapi.com/products/${id}`
    //   );
    //   console.log(response);
    //   setProduct(response.data);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("Error fetching product:", error);
    // }
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => setProduct(json));
    // setProduct(myProduct);
    // console.log(product);
    // console.log(product);
  };
  useEffect(() => {
    fetchProductById(productId);
  }, [productId]);
  // console.log(productId);

  const editDatabaseFromDetails = (data) => {
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

  return (
    <div className="py-5 px-5  bg-gray-100">
      <div className=" px-4 py-6 max-w-5xl mx-auto bg-white  rounded-lg mdl:flex items-center justify-between gap-3">
        <div className="flex items-center justify-center p-6 mdl:justify-start   mdl:w-2/6 lgl:w-1/5 ">
          {product?.images
            ?.filter((e, i) => i === 0)
            .map((link, index) => (
              <img
                src={link}
                alt={`Image ${index}`}
                key={index}
                className="object-contain w-80 "
              />
            ))}
          {/* <img
            // src={product.images[0]}
            src={product?.images[0]}
            alt="image"
            className="object-contain w-40 "
          /> */}
        </div>
        <div className=" lg:flex items-center justify-between gap-3 mdl:w-4/6 lgl:w-4/5">
          <div>
            <h5 className=" text-sm my-2 font-medium text-amazonBlue font-bodyFont">
              {product.category}
            </h5>
            <h3 className=" text-lg leading-5 my-1 font-bold text-amazonBlue font-headFont">
              {product.title}
            </h3>
            <p className=" text-sm tracking-wide leading-6 py-2 pr-5 max-w-[550px]">
              {product.description}
            </p>
            <div>
              <span className=" text-base">Unit Price: </span>
              <span className=" font-bold text-gray-800">${product.price}</span>
            </div>
            <button
              className=" w-72 text-black mt-3 rounded-md font-medium text-center p-2 bg-gradient-to-tr from-yellow-400 to-yellow-200  hover:from-yellow-300 to hover:to-yellow-400 active:from-yellow-400  active:to-yellow-500 border border-yellow-500 hover:border-yellow-600 duration-200 cursor-pointer"
              onClick={() => {
                dispatch(addToCart(product));
                editDatabaseFromDetails(product);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};
export default Details;
