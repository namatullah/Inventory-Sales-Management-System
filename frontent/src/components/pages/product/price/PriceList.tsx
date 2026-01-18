import moment from "moment";
import { AddOutlined, CloseOutlined, DeleteForever } from "@mui/icons-material";
import type { PriceType, ProductType } from "../../../../helpers/types";
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
import { Fragment, useState } from "react";
import Form from "./Form";
import { deletePrice } from "../../../../lib/price";
import ApiError from "../../../common/ApiError";
import DeleteData from "../../../common/DeleteData";
import {
  usePricesContext,
  usePricesDispatchContext,
} from "./contextReducer/PriceContexts";
import toast from "react-hot-toast";

const PriceList = ({
  pricePreview,
  setPricePreview,
  product,
}: {
  pricePreview: boolean;
  setPricePreview: (preventPreview: boolean) => void;
  product: ProductType | any;
}) => {
  const prices = usePricesContext();
  const dispatch = usePricesDispatchContext();
  const [open, setOpen] = useState(false);
  const [price, setPrice] = useState<any>(null);
  const [apiError, setApiError] = useState<string>("");
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenClose = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setPricePreview(!pricePreview);
  };

  const handleDelete = (p: any) => {
    setPrice(p);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setPrice(null);
    setOpenDelete(false);
  };
  const onDelete = async () => {
    try {
      const { data } = await deletePrice(price._id);
      toast.success(data?.message);
      dispatch({ type: "delete", id: price._id });
    } catch (error: any) {
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Deletion failed"
      );
    }
  };
  return (
    <>
      {open && (
        <Form open={open} onClose={handleOpenClose} productId={product._id} />
      )}
      {openDelete && (
        <DeleteData
          open={openDelete}
          onClose={handleCloseDelete}
          message={"Are you sure to delete price (" + price?.price + ") ?"}
          deleteFunction={onDelete}
        />
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
              prices.map((price: PriceType) => (
                <Fragment key={price._id}>
                  <Divider />
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <DeleteForever
                          color="error"
                          onClick={() => handleDelete(price)}
                        />
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

export default PriceList;
