const Items = ({ items }: { items: any }) => {
  let itemsTxt = "";
  items.map((item: any) => {
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
