const FooterThreeList = ({ title, desc }) => {
  return (
    <div className="group cursor-pointer text-[11px] w-32 p-1  leading-3">
      <h4 className="text-[#DDD] group-hover:underline font-medium  ">
        {title}
      </h4>
      <p className="text-[#999] group-hover:underline pt-1">{desc}</p>
    </div>
  );
};

export default FooterThreeList;
