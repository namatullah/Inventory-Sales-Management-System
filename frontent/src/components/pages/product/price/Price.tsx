import moment from "moment";
import { AddOutlined, CloseOutlined, DeleteForever } from "@mui/icons-material";
import type { ProductType } from "../../../../types";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import Form from "./Form";
import { fetchPrices } from "../../../../lib/price";
import ApiError from "../../../common/ApiError";

const Price = ({
  pricePreview,
  setPricePreview,
  product,
}: {
  pricePreview: boolean;
  setPricePreview: (preventPreview: boolean) => void;
  product: ProductType | any;
}) => {
  const [open, setOpen] = useState(false);
  const [prices, setPrices] = useState([]);
  const [apiError, setApiError] = useState<string>("");
  const handleOpenClose = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setPricePreview(!pricePreview);
  };
  const getPrices = async () => {
    try {
      const { data } = await fetchPrices(product._id);
      setPrices(data);
    } catch (error: any) {
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Fetching categories faild"
      );
    }
  };
  useEffect(() => {
    if (open) return;
    getPrices();
  }, [open]);
  return (
    <>
      {open && (
        <Form open={open} onClose={handleOpenClose} productId={product._id} />
      )}
      <Dialog maxWidth="xs" open={pricePreview} onClose={handleClose}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            px: 1.8,
            pb: 1.5,
          }}
        >
          <CloseOutlined onClick={handleClose} color="error" />
        </DialogTitle>
        <Divider />
        <DialogContent>
          {apiError && <ApiError apiError={apiError} />}
          <List>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mx: 1.8,
                mb: 1,
              }}
            >
              <Typography>
                Prices of product <b>{product.name}</b>, <b>{product.sku}</b>
              </Typography>
              <AddOutlined color="primary" onClick={handleOpenClose} />
            </Box>
            {prices.length > 0 ? (
              prices.map((price: any) => (
                <Fragment key={price._id}>
                  <Divider />
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteForever color="error" />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={price?.price + " Af"}
                      secondary={moment(price.createdAt).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    />
                  </ListItem>
                </Fragment>
              ))
            ) : (
              <>
                <Divider />
                <ListItem>* Please add price</ListItem>
              </>
            )}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Price;
