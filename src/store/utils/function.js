export const addComma = (price) => {
  return price.toLocaleString();
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