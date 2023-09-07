import HeaderOne from "./HeaderOne";
import Nav from "./Nav";

const Header = () => {
  return (
    <div className=" sticky top-0 z-50">
      <HeaderOne />
      <Nav />
    </div>
  );
};

export default Header;
