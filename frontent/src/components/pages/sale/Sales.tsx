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
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import type { CategoryType } from "../../../types";
import { deleteCategory, fetchCategories } from "../../../lib/category";
import ApiError from "../../common/ApiError";
import DeleteData from "../../common/DeleteData";
import toast from "react-hot-toast";
import Form from "./Form";
const Sales = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [apiError, setApiError] = useState<string>("");

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
    setCategory(null);
    setOpen(!open);
  };
  const handleUpdate = (cat: CategoryType) => {
    setCategory(cat);
    setOpen(!open);
  };
  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = (cat: CategoryType) => {
    setCategory(cat);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setCategory(null);
    setOpenDelete(false);
  };

  const getCategories = async () => {
    setApiError("");
    try {
      const { data } = await fetchCategories(paginantion);
      setCategories(data.data);
      setTotal(data.total);
    } catch (error: any) {
      setCategories([]);
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Fetching categories faild"
      );
    }
  };

  useEffect(() => {
    getCategories();
  }, [open, openDelete, paginantion.page, paginantion.rowsPerPage]);

  const onDelete = async () => {
    try {
      const { data } = await deleteCategory(category?._id);
      toast.success(data?.message);
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
        <Form open={open} onClose={handleOpenClose} />
      )}
      {openDelete && (
        <DeleteData
          open={openDelete}
          onClose={handleCloseDelete}
          message={"Are you sure to delete category (" + category?.name + ") ?"}
          deleteFunction={onDelete}
        />
      )}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={5}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "20px" }}>Sales</Typography>
                  <Button
                    variant="outlined"
                    onClick={handleOpenClose}
                    startIcon={<AddOutlined />}
                  >
                    <span style={{ paddingTop: "inherit" }}>Add Sale</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "GrayText" }}>
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "GrayText" }}>
                Sold By
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "GrayText" }}>
                Items
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "GrayText" }}>
                Total Amount
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "GrayText" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category: CategoryType) => (
              <TableRow key={category._id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  <EditNoteOutlined
                    color="primary"
                    onClick={() => handleUpdate(category)}
                  />
                  <DeleteForever
                    color="error"
                    onClick={() => handleDelete(category)}
                  />
                </TableCell>
              </TableRow>
            ))}
            {apiError && (
              <TableRow>
                <TableCell colSpan={5}>
                  <ApiError apiError={apiError} />
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell colSpan={5}>
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

export default Sales;
