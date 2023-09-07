import axios from "axios";

export async function ProductsData() {
  let products = await axios.get("https://fakestoreapi.com/products");
  // console.log(products.data);
  // let products = (await axios.get("https://dummyjson.com/products")).data
  //   .products;

  return products.data;
}
