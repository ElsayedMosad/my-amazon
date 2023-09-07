/* eslint-disable react/no-unescaped-entities */
import { darkLogo } from "../../assets/images";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Link, useNavigate } from "react-router-dom";
import CopyRight from "./CopyRight";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../rtk/slices/userSlice";
// import { setUserInfo } from "../../rtk/slices/amazonSlice";

const Signin = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [msgAccount, setMsgAccount] = useState("");

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setErrorEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrorPassword("");
  };

  const isValidEmail = (email) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
    // return /\S+@\S+\.\S+/.test(email);
  };
  const handleSignin = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorEmail("Enter your email");
    } else if (!isValidEmail(email)) {
      setErrorEmail("Enter a valid email");
    }
    if (!password) {
      setErrorPassword("Enter your pssword");
    } else if (password.length < 6) {
      setErrorPassword("Enter a valid password");
    }
    if (isValidEmail(email) && password.length >= 6) {
      setLoading(true);

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(
            setUserInfo({
              userId: user.uid,
              userName: user.displayName,
              userEmail: user.email,
              userImage: user.photoURL,
            })
          );

          setLoading(false);
          setMsgAccount("Sign in Successfully! Welcome you back!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          setLoading(false);
          if (errorCode == "auth/user-not-found") {
            setErrorEmail("Email not founded");
          } else if (errorCode == "auth/wrong-password") {
            setErrorPassword("Wrong Password");
          }
        });
      // setEmail("");
      // setPassword("");
    }
  };
  return (
    <div className=" min-h-screen">
      <div className="  bg-gray-100 flex justify-center min-h-[82vh]  items-center px-3">
        {msgAccount ? (
          <div className=" w-fit tracking-wide  border-[1px] border-green-600 text-base mdl:text-lg font-headFont text-green-600 font-semibold px-4 py-2">
            {msgAccount}
          </div>
        ) : (
          <div className="w-[350px] max-w-full flex flex-col  items-center">
            <div className="mb-1 mt-2">
              <Link to="/">
                <img src={darkLogo} className=" w-32" alt="darkLogo" />
              </Link>
            </div>
            <form className=" p-5 border border-zinc-200" action="">
              <h2 className=" font-headFont font-medium text-3xl text-black mb-3">
                Sign in
              </h2>
              <div className=" flex flex-col gap-4 text-black font-medium">
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
                <button
                  onClick={handleSignin}
                  className="w-full font-headFont text-sm tracking-wider text-black rounded-sm font-normal text-center py-2 px-2 bg-gradient-to-t from-[#f7dfa5] to-[#f0c14b]  hover:bg-gradient-to-b  border border-zinc-400  active:border-yellow-800 active:shadow-amazonInput duration-200 cursor-pointer"
                >
                  Continue
                </button>
              </div>
              {loading && (
                <div className=" flex justify-center">
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
              <p className=" text-xs text-black my-4 leading-4">
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
              <p className=" flex gap-2 my-3 text-xs cursor-pointer group items-center">
                <span className=" text-gray-600">
                  {" "}
                  <ArrowRightIcon />
                </span>
                <span className="  text-blue-600 group-hover:text-orange-700 group-hover:underline ">
                  Need help?
                </span>
              </p>
            </form>
            <div className=" text-gray-600 w-full flex items-center  justify-between my-4">
              <span className=" h-[1px] bg-zinc-400 w-1/3 inline-block"></span>
              <p className=" text-center text-xs whitespace-nowrap">
                New to Amazon?
              </p>
              <span className=" h-[1px] bg-zinc-400 w-1/3 inline-block"></span>
            </div>
            <Link to="/register" className="w-full">
              <button className="w-full font-headFont text-sm tracking-wider text-black rounded-sm font-normal text-center py-2 px-2 bg-gradient-to-t from-slate-200 to-slate-100 mb-10  hover:bg-gradient-to-b  border border-zinc-400  active:border-yellow-800 duration-200 cursor-pointer">
                Create your Amazon account
              </button>
            </Link>
          </div>
        )}
      </div>
      <CopyRight />
    </div>
  );
};

export default Signin;
