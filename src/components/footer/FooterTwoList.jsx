const FooterTwoList = ({ title, listItem }) => {
  // console.log(listItem);
  return (
    <div className="">
      <h3 className=" text-white  font-headFont font-bold my-4">{title}</h3>
      <ul className="flex flex-col gap-2 font-headFont">
        {listItem.map((e, i) => (
          <li
            key={i}
            className="  text-gray-300 font-bodyFont text-sm cursor-pointer hover:text-gray-100 hover:underline tracking-wide duration-100"
          >
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterTwoList;
