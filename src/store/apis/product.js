import { basicRequest } from "./base";

const convSeq = localStorage.getItem("convSeq");

export const getProductList = async (keyword) => {
  const response = await basicRequest.get('/productList', {
    params: keyword
  });
  return response;
}