import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  AddOutlined,
  DeleteForever,
  EditNoteOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import Form from "./Form";
import type { CategoryType } from "../../../../types";
import { deleteCategory, fetchCategories } from "../../../../lib/category";
import ApiError from "../../../common/ApiError";
import Delete from "../../../common/Delete";
const Category = () => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [apiError, setApiError] = useState<string>("");

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
      const { data } = await fetchCategories();
      setCategories(data);
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
  }, [open, openDelete]);

  return (
    <>
      {open && (
        <Form open={open} onClose={handleOpenClose} category={category} />
      )}
      {openDelete && (
        <Delete
          open={openDelete}
          onClose={handleCloseDelete}
          id={category?._id}
          message={"Are you sure to delete category (" + category?.name + ") ?"}
          deleteFunction={deleteCategory}
        />
      )}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h3>Categories</h3>{" "}
                  <Button
                    startIcon={<AddOutlined />}
                    onClick={handleOpenClose}
                  />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "GrayText" }}>
                Name
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
                <TableCell colSpan={2}>
                  <ApiError apiError={apiError} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Category;
