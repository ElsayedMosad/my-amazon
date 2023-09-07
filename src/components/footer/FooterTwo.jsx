import { Link } from "react-router-dom";
import { flagUSA, logo } from "../../assets/images";
import { footerTwoData } from "../../constants/dataList";
import FooterTwoList from "./FooterTwoList";
import LanguageIcon from "@mui/icons-material/Language";
const FooterTwo = () => {
  return (
    <div className=" bg-amazonLight">
      <div className="border-b-[1px] w-full pt-7 pb-20 border-gray-500">
        <div className="grid gap-x-3 gap-y-5 sml:grid-cols-2 lg:grid-cols-4 px-5 max-w-5xl mx-auto">
          {footerTwoData.map((item) => (
            <FooterTwoList
              key={item.id}
              title={item.title}
              listItem={item.listItem}
            />
          ))}
        </div>
      </div>
      <div className="px-3 flex-wrap py-10 flex items-center gap-x-10 lg:gap-x-20 gap-y-4 justify-center  text-gray-300">
        <Link to="/">
          <div className="h-7 cursor-pointer  mt-2">
            <img src={logo} alt="log" className="h-full" />
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-1 md:gap-2 justify-center">
          <div className="footerBut gap-1">
            <LanguageIcon sx={{ fontSize: 16 }} />
            <span>English</span>
          </div>
          <div className="footerBut gap-2">
            <span className=" text-white"> $</span>
            <span className="whitespace-nowrap	">USD-U.S.Dollar</span>
          </div>
          <div className="footerBut gap-2">
            <img className=" h-3 w-4" src={flagUSA} alt="flagUSA" />
            <span className="whitespace-nowrap	">United State</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTwo;
