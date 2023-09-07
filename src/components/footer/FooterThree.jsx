import { footerThreeData } from "../../constants/dataList";
import FooterThreeList from "./FooterThreeList";

const FooterThree = () => {
  return (
    <div className=" w-full py-8 bg-amazonBlue">
      <div className=" max-w-5xl px-4 mx-auto grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))]  gap-x-3 gap-y-2 ">
        {footerThreeData.map((ele) => (
          <FooterThreeList key={ele.id} title={ele.title} desc={ele.desc} />
        ))}
      </div>
      <div className="text-[#DDD] text-[11px] font-medium  leading-3 text-center pt-8 px-3">
        <ul className="mb-2 flex items-center justify-center gap-3">
          <li className=" cursor-pointer hover:underline ">
            Conditions of Use
          </li>
          <li className=" cursor-pointer hover:underline  ">Privacy Notice</li>
          <li className=" cursor-pointer hover:underline ">
            Your Ads Privacy Choices
          </li>
        </ul>
        <span>© 1996-2023, Amazon.com, Inc. or its affiliat</span>
      </div>
    </div>
  );
};

export default FooterThree;
// grid-template-columns:repeat(auto-fit,minmax(80px,1fr))
