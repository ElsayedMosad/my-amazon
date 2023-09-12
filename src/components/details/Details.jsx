import { useParams } from "react-router-dom";

const Details = () => {
  let { productId } = useParams();
  console.log(productId);
  return (
    <>
      <h6>{productId}</h6>
    </>
  );
};
export default Details;
