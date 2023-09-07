const CopyRight = () => {
  return (
    <div className=" min-h-[18vh]  w-full bg-gradient-to-t from-white via-white to-zinc-200 text-center flex flex-col justify-center gap-4">
      <div className="flex items-center justify-center gap-5 text-xs text-blue-600">
        <p className=" cursor-pointer hover:text-orange-600 hover:underline duration-100 underline-offset-1">
          Conditions of Use
        </p>
        <p className=" cursor-pointer hover:text-orange-600 hover:underline duration-100 underline-offset-1">
          Privacy Notice
        </p>
        <p className=" cursor-pointer hover:text-orange-600 hover:underline duration-100 underline-offset-1">
          Privacy Notice
        </p>
      </div>
      <p className="text-xs text-gray-600">
        1996-2023, ReactBd.com, Inc. or ites affiliates
      </p>
    </div>
  );
};

export default CopyRight;
