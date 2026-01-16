const StockReducer = (stock: any, action: any) => {
  switch (action.type) {
    case "set":
      return action.value;
    default:
      throw new Error("the action type is not defined");
  }
};
export default StockReducer;
