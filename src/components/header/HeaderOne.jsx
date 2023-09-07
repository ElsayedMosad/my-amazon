import { flagUSA, logo } from "../../assets/images";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { allItems } from "../../constants/dataList";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { signOutUser } from "../../rtk/slices/userSlice";

const HeaderOne = () => {
  const [showItem, setShowItem] = useState(false);
  const products = useSelector((state) => state.amazon.products);
  const userInfo = useSelector((state) => state.userReducer.userInfo);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(signOutUser());
      })
      .catch((error) => {
        console.log(error);
        // An error happened.
      });
  };
  return (
    <div className="text-white 	bg-amazonBlue px-4 py-3 flex items-center gap-x-1 sm:gap-x-4 justify-between ">
      <Link to="/" className={userInfo ? "hidden sml:flex " : ""}>
        <div className="borderHover">
          <img className="w-24 mt-2 " src={logo} alt="logo" />
        </div>
      </Link>
      <div className="borderHover  hidden mdl:flex ">
        <LocationOnOutlinedIcon />
        <div className="  flex flex-col justify-center">
          <p className=" text-xs text-lightText font-light whitespace-nowrap	">
            Deliver to
          </p>

          <p className="font-semibold text-white -mt-1 text-sm">USA</p>
        </div>
      </div>
      <div className=" h-10 hidden  text-amazonBlue text-sm relative flex-grow lgl:flex ">
        {showItem && (
          <div className="">
            <ul className=" absolute z-50 bg-white top-full left-0 w-56 h-80 overflow-x-hidden overflow-y-scroll bg-whit p-2 capitalize border-[1px] border-amazonBlue text-black">
              {allItems.map((item) => (
                <li
                  key={item.id}
                  className="text-black border-b-[1px] border-b-transparent hover:border-b-black duration-200  cursor-pointer text-sm"
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div
          onClick={() => setShowItem(!showItem)}
          className="h-full px-2 bg-gray-200 hover:bg-gray-300 duration-300 flex items-center justify-center cursor-pointer rounded-tl-md rounded-bl-md "
        >
          <span className="h-full flex items-center justify-center">All</span>
          <ArrowDropDownIcon sx={{ fontSize: 18 }} />
        </div>
        <input
          className=" outline-none border-none text-amazonBlue px-2 h-full flex-grow"
          type="text"
          placeholder="Search Amazon"
        />
        <div className="h-full px-3 bg-amazonYellow hover:bg-[#f3a847] duration-300 flex items-center justify-center cursor-pointer rounded-tr-md rounded-br-md  ">
          <SearchIcon sx={{ fontSize: 26 }} />
        </div>
      </div>
      <div className="borderHover hidden md:flex pl-1 py-2">
        <div className="flex justify-center gap-1 items-center">
          <img src={flagUSA} alt="flagUSA" className="block w-5 h-[14px]" />
          <p className="font-semibold text-white sm:text-sm whitespace-nowrap text-xs flex items-center justify-center">
            EN
            <span className="text-lightText block -ml-1 -mb-1">
              <ArrowDropDownIcon />
            </span>
          </p>
        </div>
      </div>
      <Link to="signin">
        <div className="borderHover">
          <div className="flex flex-col justify-center">
            {userInfo ? (
              <p className="text-sm text-gray-100 font-medium">
                {userInfo.userName}
              </p>
            ) : (
              <p className=" text-xs text-lightText font-light">
                Hello, sign in
              </p>
            )}

            <p className="font-semibold text-white -mt-1 sm:text-sm whitespace-nowrap text-xs">
              Accounts & Lists
              <span className="text-lightText ">
                <ArrowDropDownIcon />
              </span>
            </p>
          </div>
        </div>
      </Link>
      <div className="borderHover hidden xl:flex ">
        <div className="flex flex-col justify-center">
          <p className=" text-xs text-lightText font-light">Returns</p>
          <p className="font-semibold text-white -mt-1 text-sm whitespace-nowrap	">
            & Orders
          </p>
        </div>
      </div>
      <Link to="cart">
        <div className="borderHover relative flex items-center">
          <ShoppingCartIcon sx={{ fontSize: 30 }} />
          <p className=" text-xs -mb-3 -ml-1 font-medium	">Cart</p>
          <span className=" absolute -top-1 left-[50%] -translate-x-1/2 bg-amazonYellow text-amazonBlue rounded-full w-4 h-4 text-[10px] font-semibold flex items-center justify-center">
            {products.length > 99 ? 99 : products.length}
            {/* 00 */}
          </span>
        </div>
      </Link>
      {userInfo ? (
        <div
          onClick={handleSignOut}
          className="borderHover  flex cursor-pointer"
        >
          <div className="flex flex-col justify-center">
            <LogoutIcon sx={{ fontSize: 26 }} />
            <p className=" font-medium text-white -mt-1 text-xs whitespace-nowrap	">
              Log out
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default HeaderOne;
