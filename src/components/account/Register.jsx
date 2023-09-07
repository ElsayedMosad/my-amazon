/* eslint-disable react/no-unescaped-entities */

import { darkLogo } from "../../assets/images";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import CopyRight from "./CopyRight";
import { useState } from "react";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";

import { ThreeDots } from "react-loader-spinner";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [msgAccount, setMsgAccount] = useState("");

  const [errorUserName, setErrorUserName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRePassword, setErrorRePassword] = useState("");

  const handleUserName = (e) => {
    setUserName(e.target.value);
    setErrorUserName("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrorEmail("");
  };
  const isValidEmail = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    // return /\S+@\S+\.\S+/.test(email);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrorPassword("");
  };
  const handleRePassword = (e) => {
    setRePassword(e.target.value);
    setErrorRePassword("");
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    if (!userName) {
      setErrorUserName("Enter your name");
    }
    if (!email) {
      setErrorEmail("Enter your email");
    } else if (!isValidEmail(email)) {
      setErrorEmail("Enter a valid email");
    }
    if (!password) {
      setErrorPassword("Enter your pssword");
    } else if (password.length < 6) {
      setErrorPassword("Passwords must be at least 6 characters");
    }
    if (!rePassword) {
      setErrorRePassword("Confirm your password");
    } else if (rePassword !== password) {
      setErrorRePassword("Password not matched");
    }
    if (
      userName &&
      isValidEmail(email) &&
      password.length >= 6 &&
      rePassword === password
    ) {
      setLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const editDocCartFirebase = async () => {
            await setDoc(doc(db, "cart", user.uid), {
              myProductsCart: [],
            });
          };
          editDocCartFirebase();
          // console.log(user.uid);
          // console.log(user.uid);

          updateProfile(auth.currentUser, {
            displayName: userName,
            photoURL:
              "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg",
          })
            .then(() => {
              // Profile updated!
              // ...
            })
            .catch((error) => {
              console.log(error);
              // An error occurred
              // ...
            });
          //   const editDocCartFirebase = async () => {
          //   await setDoc(doc(db, "cart", ""), {
          //     myProductsCart: null,
          //   });
          // };
          // editDocCartFirebase()

          setLoading(false);
          setUserName("");
          setEmail("");
          setPassword("");
          setRePassword("");
          setMsgAccount("Sign up Successfully! Welcome!");
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          if (errorCode.includes("auth/email-already-in-use")) {
            setErrorEmail("Email Already in use, Try another one");
          }
          setLoading(false);

          // ..
        });
    }
  };

  return (
    <div>
      <div className=" min-h-screen bg-red-600 ">
        <div className="  bg-gray-100 flex justify-center min-h-[82vh]  items-center px-3">
          {msgAccount ? (
            <div className=" w-fit tracking-wide  border-[1px] border-green-600 text-base mdl:text-lg font-headFont text-green-600 font-semibold px-4 py-2">
              {msgAccount}
            </div>
          ) : (
            <div className="w-[350px] max-w-full mb-6 flex flex-col  items-center">
              <div className="mb-1 mt-2">
                <Link to="/">
                  <img src={darkLogo} className=" w-32" alt="darkLogo" />
                </Link>
              </div>
              <form className=" p-5 border border-zinc-200" action="">
                <h2 className=" font-headFont font-medium text-3xl text-black mb-3">
                  Create Account
                </h2>
                <div className=" flex flex-col gap-3 text-black font-medium">
                  <div className=" flex flex-col gap-2">
                    <label htmlFor="text" className="text-sm">
                      Your name
                    </label>
                    <input
                      value={userName}
                      onChange={handleUserName}
                      className="w-full text-base px-2 py-1 border border-zinc-400 rounded-sm outline-none focus-within:shadow-amazonInput"
                      type="text"
                      name="text"
                      id="text"
                    />
                    {errorUserName && (
                      <p className="text-xs text-red-600 font-semibold tracking-wide -mt-1">
                        <span className=" italic font-extrabold"> !</span>{" "}
                        {errorUserName}
                      </p>
                    )}
                  </div>
                  <div className=" flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm">
                      Email or mobile phone number
                    </label>
                    <input
                      value={email}
                      onChange={handleEmail}
                      className="w-full text-base px-2 py-1 border border-zinc-400 rounded-sm outline-none focus-within:shadow-amazonInput"
                      type="email"
                      name="email"
                      id="email"
                    />
                    {errorEmail && (
                      <p className="text-xs text-red-600 font-semibold tracking-wide -mt-1">
                        <span className=" italic font-extrabold"> !</span>{" "}
                        {errorEmail}
                      </p>
                    )}
                  </div>
                  <div className=" flex flex-col gap-2">
                    <label htmlFor="password" className="text-sm">
                      Password
                    </label>
                    <input
                      value={password}
                      onChange={handlePassword}
                      className="w-full text-base px-2 py-1 border border-zinc-400 rounded-sm outline-none focus-within:border-[#e77600] focus-within:shadow-amazonInput"
                      type="password"
                      name="password"
                      id="password"
                    />
                    {errorPassword && (
                      <p className="text-xs text-red-600 font-semibold tracking-wide -mt-1">
                        <span className=" italic font-extrabold"> !</span>{" "}
                        {errorPassword}
                      </p>
                    )}
                  </div>
                  <div className=" flex flex-col gap-2">
                    <label htmlFor="repassword" className="text-sm">
                      Re-enter Password
                    </label>
                    <input
                      value={rePassword}
                      onChange={handleRePassword}
                      className="w-full text-base px-2 py-1 border border-zinc-400 rounded-sm outline-none
                    focus-within:border-[#e77600] focus-within:shadow-amazonInput"
                      type="password"
                      name="repassword"
                      id="repassword"
                    />
                    {errorRePassword && (
                      <p className="text-xs text-red-600 font-semibold tracking-wide -mt-1">
                        <span className=" italic font-extrabold"> !</span>{" "}
                        {errorRePassword}
                      </p>
                    )}
                  </div>
                  <p className=" text-xs text-gray-600">
                    Passwords must be at least 6 characters
                  </p>
                  <button
                    onClick={handleRegistration}
                    className="w-full font-headFont text-sm tracking-wider  text-black rounded-sm font-normal text-center py-2 px-2 bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b]  hover:bg-gradient-to-b  border border-zinc-400  active:border-yellow-800 active:shadow-amazonInput duration-200 cursor-pointer"
                  >
                    Countinue
                  </button>
                  {loading && (
                    <div className=" flex justify-center">
                      {" "}
                      {/* <p>heoo</p> */}
                      <ThreeDots
                        height="50"
                        width="50"
                        radius="9"
                        color="#F3A847"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={true}
                      />
                    </div>
                  )}
                </div>
                <p className=" text-xs text-black mt-2 leading-4">
                  By Continuing, you agree to Amazon's
                  <span className=" text-blue-600 cursor-pointer">
                    {" "}
                    Conditions of Use{" "}
                  </span>
                  and{" "}
                  <span className=" text-blue-600 cursor-pointer">
                    Privace Notice.
                  </span>
                </p>
                <div className=" text-xs text-black mt-2 leading-3">
                  <p className=" ">
                    {" "}
                    Already have an account
                    <span className=" text-blue-600  cursor-pointer hover:text-orange-600 hover:underline duration-100 underline-offset-1">
                      <Link to="/signin">
                        {" "}
                        Sign in <ArrowRightIcon />
                      </Link>
                    </span>
                  </p>
                  <p className=" whitespace-nowrap -mt-2">
                    {" "}
                    Buying for work?{" "}
                    <span className=" text-blue-600 cursor-pointer  hover:text-orange-600 hover:underline duration-100 underline-offset-1">
                      Create a free business account
                      <ArrowRightIcon />
                    </span>
                  </p>
                </div>
              </form>
            </div>
          )}
        </div>
        <CopyRight />
      </div>
    </div>
  );
};

export default Register;
