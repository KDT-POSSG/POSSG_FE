import { basicRequest } from "./base";

export const getProductList = async (keyword) => {
  const response = await basicRequest.get('/productList', {
    params: keyword,
  });
  return response;
}