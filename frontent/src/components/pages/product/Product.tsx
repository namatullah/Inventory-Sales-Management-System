import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import {
  AddOutlined,
  DeleteForever,
  EditNoteOutlined,
  PreviewOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import ApiError from "../../common/ApiError";
import Delete from "../../common/Delete";
import { deleteProduct, fetchProducts } from "../../../lib/product";
import type { ProductType } from "../../../types";
import Form from "./Form";
import Price from "./price/Price";
const Product = () => {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [product, setProduct] = useState<ProductType | null>(null);
  const [apiError, setApiError] = useState<string>("");
  const [pricePreview, setPricePreview] = useState(false);
  const [stockPreview, setStockPreview] = useState(false);

  const [paginantion, setPagination] = useState({
    page: 0,
    rowsPerPage: 5,
  });
  const [total, setTotal] = useState(0);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPagination({ ...paginantion, page: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPagination({
      ...paginantion,
      rowsPerPage: parseInt(event.target.value),
      page: 0,
    });
  };

  const handleOpenClose = () => {
    setProduct(null);
    setOpen(!open);
  };
  const handleUpdate = (prod: ProductType) => {
    setProduct(prod);
    setOpen(!open);
  };
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = (prod: ProductType) => {
    setProduct(prod);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setProduct(null);
    setOpenDelete(false);
  };

  const getProducts = async () => {
    setApiError("");
    try {
      const { data } = await fetchProducts(paginantion);
      setProducts(data.data);
      setTotal(data.total);
    } catch (error: any) {
      setProducts([]);
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Fetching categories faild"
      );
    }
  };

  useEffect(() => {
    getProducts();
  }, [open, openDelete, paginantion.page, paginantion.rowsPerPage]);

  // paginantion
  return (
    <>
      {open && <Form open={open} onClose={handleOpenClose} product={product} />}
      {openDelete && (
        <Delete
          open={openDelete}
          onClose={handleCloseDelete}
          id={product?._id}
          message={"Are you sure to delete product (" + product?.name + ") ?"}
          deleteFunction={deleteProduct}
        />
      )}
      {pricePreview && (
        <Price
          pricePreview={pricePreview}
          setPricePreview={setPricePreview}
          product={product}
        />
      )}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={6}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "20px" }}>Products</Typography>
                  <Button
                    variant="outlined"
                    onClick={handleOpenClose}
                    startIcon={<AddOutlined />}
                  >
                    <span style={{ paddingTop: "inherit" }}>Add Product</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "GrayText" }}>
                Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "GrayText" }}>
                SKU
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "GrayText" }}>
                Category
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "GrayText" }}>
                Actions
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "GrayText" }}>
                Price
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "GrayText" }}>
                Stock
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product: ProductType) => (
              <TableRow key={product._id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{product?.category?.name}</TableCell>
                <TableCell>
                  <EditNoteOutlined
                    color="primary"
                    onClick={() => handleUpdate(product)}
                  />
                  <DeleteForever
                    color="error"
                    onClick={() => handleDelete(product)}
                  />
                </TableCell>
                <TableCell>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <PreviewOutlined
                      color="primary"
                      onClick={() => {
                        setPricePreview(true);
                        setProduct(product);
                      }}
                    />
                    <span>303 Af</span>
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <PreviewOutlined color="primary" />
                    <span>303 Af</span>
                  </span>
                </TableCell>
              </TableRow>
            ))}
            {apiError && (
              <TableRow>
                <TableCell colSpan={6}>
                  <ApiError apiError={apiError} />
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={6}>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  component="div"
                  count={total}
                  page={paginantion.page}
                  onPageChange={handleChangePage}
                  rowsPerPage={paginantion.rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Product;
