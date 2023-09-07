import Banner from "./Banner";
import Products from "./Products";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className=" xl:-mt-28">
        <Products />
      </div>
    </div>
  );
};

export default Home;
