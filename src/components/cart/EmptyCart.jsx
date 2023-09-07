import { Link } from "react-router-dom";
import { emptyCart } from "../../assets/images";
import { motion } from "framer-motion";

const EmptyCart = () => {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.2,
        duration: 0.5,
      }}
      className=" py-16 px-5  bg-gray-100 mdl:flex items-center justify-center gap-5"
    >
      <div className=" mx-auto mdl:mx-0 p-5">
        <img src={emptyCart} className="mx-auto" alt="emptyCart" />
      </div>
      <div className=" max-w-[400px] my-5 mx-auto mdl:mx-0 text-center bg-white p-3 shadow-lg rounded-md leading-6 text-black">
        <h2 className=" font-bodyFont text-lg font-bold">
          Your Cart feels lonely.
        </h2>
        <p className=" my-2 text-sm tracking-wide">
          Your Shopping cart lives to serve. Give it purpose - fill it with
          books, electronics, videos, etc. and make it happy.
        </p>
        <Link to="/">
          <button className="w-fit px-6 py-2 font-headFont text-lg text-black my-2 rounded-md font-semibold text-center  bg-gradient-to-tr from-yellow-500 to-yellow-300  hover:from-yellow-400 to hover:to-yellow-500 active:from-yellow-600  active:to-yellow-400 border border-yellow-500 hover:border-yellow-600 duration-200 cursor-pointer">
            Countinue Shopping
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default EmptyCart;
