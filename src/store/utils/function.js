export const addComma = (price) => {

  price = price + "";
  
  const removedCommaValue = Number(price.replaceAll(",", ""));
  return removedCommaValue.toLocaleString();
};

export const promotion = (promotionInfo) => {

  switch (promotionInfo) {
    case 1:
      return "";
    case 2:
      return "세일";
    case 3:
      return "덤증정";
    case 4:
      return "1+1";
    case 5:
      return "2+1";
    default:
      break;
  }
}

export const orderState = (orderStateNumber) => {

  switch (orderStateNumber) {
    case 0:
      return "발주대기";
    case 1:
      return "접수완료";
    case 2:
      return "배송중";
    case 3:
      return "배송완료";
    default:
      break;
  }

}