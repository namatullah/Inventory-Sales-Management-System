import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import type { SaleItemType } from "../../../helpers/types";
import { CloseOutlined } from "@mui/icons-material";
import { Fragment } from "react/jsx-runtime";

const View = ({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  items: SaleItemType[];
}) => {
    console.log(items)
  return (
    <>
      <Dialog open={open} maxWidth="xs" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>Sales Items View</Typography>
          <CloseOutlined onClick={() => onClose(false)} color="error" />
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Box>
            {items.map((item: SaleItemType, index) => (
              <Fragment key={index}>
                <ListItem>
                  <ListItemText
                    primary={item.productId.name}
                    secondary={`${item.quantity} ${item.productId.stockUnit}  --> ${item.priceAtSale} Af`}
                    primaryTypographyProps={{
                      sx: { alignContent: "center" },
                    }}
                    secondaryTypographyProps={{
                      sx: { alignContent: "center" },
                    }}
                    sx={{ display: "flex", gap: 2 }}
                  />
                </ListItem>
                <Divider />
              </Fragment>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default View;
