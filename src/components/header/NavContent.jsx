import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const NavContent = ({ title, data }) => {
  // console.log(data);
  return (
    <div className=" border-b-[1px] border-gray-300 py-2">
      <h3 className=" font-bold   pl-8 pr-5 my-2">{title}</h3>
      <ul className="text-sm flex flex-col gap-1">
        {data.map((e, i) => (
          <li
            key={i}
            className="flex items-center justify-between  pl-8 pr-5 py-2  cursor-pointer hover:bg-zinc-200 duration-100 w-full text-zinc-700"
          >
            <span>{e}</span>
            <KeyboardArrowRightIcon sx={{ fontSize: 22 }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavContent;
