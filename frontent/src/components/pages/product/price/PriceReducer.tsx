const PriceReducer = (prices: any, action: any) => {
  switch (action.type) {
    case "set":
      return action.value;
    case "create":
      return [action.value, ...prices];
    case "delete":
      return prices.filter((p: any) => p._id !== action.id);
    default:
      throw new Error("the action type is not defined");
  }
};
export default PriceReducer;
