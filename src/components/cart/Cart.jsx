import { useDispatch, useSelector } from "react-redux";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  clearCart,
  decreaseQuantity,
  deleteProduct,
  increaseQuantity,
} from "../../rtk/slices/amazonSlice";
import EmptyCart from "./EmptyCart";
const Cart = () => {
  const productsCart = useSelector((state) => state.amazon.products);
  // console.log(productsCart);
  const dispatch = useDispatch();

  return (
    <div className=" min-h-[60vh] overflow-y-hidden">
      {productsCart.length ? (
        <div className=" py-5 px-5  bg-gray-100 xl:grid grid-cols-12 gap-8">
          <div className=" bg-white px-5 py-5 col-span-9 mb-6 max-w-6xl xl:w-full mx-auto">
            <h2 className=" flex justify-between items-center text-2xl border-b-[1px] border-gray-400 pb-3 font-headFont font-semibold text-black">
              <span>Shopping Cart</span>
              <span>Subtotal</span>
            </h2>
            {productsCart.map((product) => (
              <div
                key={product.id}
                className=" px-2 py-4 border-b-[1px] border-gray-300 mdl:flex items-center justify-between gap-3"
              >
                <div className="flex items-center justify-center p-6 mdl:justify-start   mdl:w-2/6 lgl:w-1/5 ">
                  <img
                    src={product.image}
                    alt="image"
                    className="object-contain w-40 "
                  />
                </div>
                <div className=" lg:flex items-center justify-between gap-3 mdl:w-4/6 lgl:w-4/5">
                  <div>
                    <h3 className=" text-lg leading-5 my-1 font-medium text-amazonBlue font-headFont">
                      {product.title}
                    </h3>
                    <p className=" text-sm tracking-wide leading-5 py-2">
                      {product.description}
                    </p>
                    <div>
                      <span className=" text-base">Unit Price: </span>
                      <span className=" font-bold text-gray-800">
                        ${product.price}
                      </span>
                    </div>
                    <div className=" bg-[#F0F2F2] w-36 py-1 flex  h-8 rounded-md items-center my-2 shadow-md justify-center ">
                      <span className=" text- text-gray-900">Qty:</span>
                      <button
                        onClick={() => dispatch(decreaseQuantity(product.id))}
                        className=" px-1 py-1  rounded-sm mx-1 w-6 h-5 bg-gray-200 hover:bg-gray-400 duration-200 font-semibold flex items-center justify-center"
                      >
                        -
                      </button>

                      <span className=" font-semibold min-w-[20px] text-center text-sm text-gray-900">
                        {product.quantity}
                      </span>
                      <button
                        onClick={() => dispatch(increaseQuantity(product.id))}
                        className=" px-1 py-1  rounded-sm mx-1 w-6 h-5 bg-gray-200 hover:bg-gray-400 duration-200 font-semibold flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(deleteProduct(product.id))}
                      className="  w-36 py-1 text-white  bg-red-500  hover:bg-red-700 active:bg-red-900  rounded-lg duration-300 my-2"
                    >
                      Delete item
                    </button>
                  </div>
                  <div className=" font-semibold text-lg text-black my-1 w- ">
                    ${(product.price * product.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => dispatch(clearCart())}
              className="  w-44 mt-5 py-2 text-white  font-semibold text-lg font-headFont bg-red-500  hover:bg-red-700 active:bg-red-900  rounded-lg duration-300"
            >
              Clear Cart
            </button>
          </div>
          <div className=" bg-white px-4 py-5 sml:w-80 max-w-full xl:col-span-3 h-fit">
            <div className=" flex gap-2">
              <span className=" text-green-500">
                <CheckCircleIcon />
              </span>
              <p className=" text-sm leading-5">
                Your order qualifies for FREE Shipping Choose this option at
                checkout. See details
              </p>
            </div>
            <div className=" px-5 py-2 text-base text-black font-semibold flex justify-between items-center ">
              <span>Total</span>
              <span>
                {productsCart
                  .reduce(function (accumulator, currentValue) {
                    return (
                      accumulator + currentValue.price * currentValue.quantity
                    );
                  }, 0)
                  .toFixed(2)}
                $
              </span>
            </div>
            <button className="w-full font-headFont text-base text-black my-2 rounded-md font-medium text-center p-2 bg-gradient-to-tr from-yellow-400 to-yellow-200  hover:from-yellow-300 to hover:to-yellow-400 active:from-yellow-400  active:to-yellow-500 border border-yellow-500 hover:border-yellow-600 duration-200 cursor-pointer">
              Proceed to Buy
            </button>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Cart;
