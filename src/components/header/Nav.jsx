/* eslint-disable react/no-unescaped-entities */
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useRef, useState } from "react";
import NavContent from "./NavContent";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const userInfo = useSelector((state) => state.userReducer.userInfo);

  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef();
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.contains(ref.current)) {
        setShowMenu(false);
      }
    });
  }, []);

  return (
    <div className="  bg-amazonLight px-4  text-white">
      <ul className=" min-h-[36px] py-2 md:py-0 flex items-center flex-wrap gap-x-1 md:gap-x-4 gap-y-1 justify-center md:justify-start text-xs md:text-sm tracking-wide">
        <li
          className=" borderHover gap-1"
          onClick={() => setShowMenu(!showMenu)}
        >
          <MenuIcon /> <span>All</span>
        </li>
        <li className=" borderHover ">Today's Deals</li>
        <li className=" borderHover">Customer Service</li>
        <li className=" borderHover">Gift Cards</li>
        <li className=" borderHover">Registry</li>
        <li className=" borderHover">Sell</li>
      </ul>
      {showMenu && (
        <div className=" fixed bg-[rgba(0,0,0,.7)] h-screen z-50 top-0 left-0 w-full">
          <motion.div
            ref={ref}
            initial={{ x: -500, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.3,
            }}
            className={
              "w-[300px] sml:w-[350px] max-w-full absolute top-0 left-0 h-full bg-white"
            }
          >
            <div className=" text-white  cursor-pointer  absolute top-3 -right-11 ">
              <CloseIcon
                sx={{ fontSize: 32 }}
                onClick={() => setShowMenu(false)}
              />
            </div>
            <div className="flex items-center gap-2 justify-between  bg-amazonLight tracking-wide px-7 py-3 text-xl font-semibold">
              {userInfo ? (
                <div className="flex items-center gap-2">
                  <img
                    src={userInfo.userImage}
                    className=" rounded-full w-8 h-8"
                    alt=""
                  />
                  <p>Hello, {userInfo.userName}</p>
                </div>
              ) : (
                <Link
                  to="/signin"
                  className="flex items-center gap-2  cursor-pointer"
                >
                  <AccountCircleIcon sx={{ fontSize: 32 }} />
                  <p>Hello, Sign In</p>
                </Link>
              )}
            </div>

            <div className="py-3 overflow-x-hidden overflow-y-scroll w-full h-full text-black 	">
              <NavContent
                title="Digital Content & Devices"
                data={[
                  "Amazon Music",
                  "Kindle E-readers & Books",
                  "Amazon Appstore",
                ]}
              />
              <NavContent
                title="Shop By Department"
                data={[
                  "Electronics",
                  "Computers",
                  "Smart Home",
                  "Arts & Crafts",
                ]}
              />
              <NavContent
                title="Programs & Features"
                data={[
                  "Gift Cards",
                  "Amazon live",
                  "International Shopping",
                  "International Shopping",
                ]}
              />
              <NavContent
                title="Help & Settings"
                data={[
                  "Your Account",
                  "English",
                  "Customer Service",
                  "Sign in",
                ]}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Nav;
