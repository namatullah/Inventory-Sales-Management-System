import { List, ListItem, ListItemText } from "@mui/material";
import type { ProductType } from "../../../../types";
import { PreviewOutlined, PreviewSharp } from "@mui/icons-material";

const Stock = ({ product }: ProductType) => {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <PreviewOutlined color="primary" />
      <span>303</span>
    </span>
  );
};

export default Stock;
