import type { SaleItemType } from "../../../helpers/types";

const Items = ({ items }: { items: SaleItemType[] }) => {
  let itemsTxt = "";
  items.map((item: SaleItemType) => {
    itemsTxt += item.quantity + "* " + item.productId.name + ", ";
  });
  return (
    <div>
      <>
        <p>{itemsTxt.replace(/,\s*$/, "")}</p>
      </>
    </div>
  );
};

export default Items;
