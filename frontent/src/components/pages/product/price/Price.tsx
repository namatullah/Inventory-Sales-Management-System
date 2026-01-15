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
import { useState } from "react";
import Form from "./Form";

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
  const handleOpenClose = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setPricePreview(!pricePreview);
  };
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
            <Divider />
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteForever />
                </IconButton>
              }
            >
              <ListItemText primary="Price 1" secondary="date 1" />
            </ListItem>
            <Divider />
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteForever color="error" />
                </IconButton>
              }
            >
              <ListItemText primary="Price 2" secondary="date 2" />
            </ListItem>
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteForever />
                </IconButton>
              }
            >
              <ListItemText primary="Price 3" secondary="date 3" />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Price;
