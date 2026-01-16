import {
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
import { DeleteForever } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ApiError from "../../common/ApiError";
import DeleteData from "../../common/DeleteData";
import toast from "react-hot-toast";
import { deleteUser, fetchUsers } from "../../../lib/users";
import { useAuth } from "../../../context/AuthContext";
const Users = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<any>([]);

  const [usr, setUsr] = useState<any>(null);
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

  const [openDelete, setOpenDelete] = useState(false);

  const handleDelete = (cat: any) => {
    setUsr(cat);
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setUsr(null);
    setOpenDelete(false);
  };

  const getUsers = async () => {
    setApiError("");
    try {
      const { data } = await fetchUsers();
      setUsers(data);
      setTotal(data.length);
    } catch (error: any) {
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Fetching users faild"
      );
    }
  };

  useEffect(() => {
    getUsers();
  }, [openDelete, paginantion.page, paginantion.rowsPerPage]);

  const onDelete = async () => {
    try {
      const { data } = await deleteUser(usr?._id);
      toast.success(data?.message);
    } catch (error: any) {
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Deletion failed"
      );
    }
  };
console.log(user, users)
  return (
    <>
      {openDelete && (
        <DeleteData
          open={openDelete}
          onClose={handleCloseDelete}
          message={"Are you sure to delete user (" + usr?.name + ") ?"}
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
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "GrayText" }}>
                FUll Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "GrayText" }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "GrayText" }}>
                Role
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "GrayText" }}>
                Joined At
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "GrayText" }}>
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .filter((u: any) => u._id !== user._id)
              .map((u: any) => (
                <TableRow key={u._id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>{u.createdAt}</TableCell>
                  <TableCell>
                    <DeleteForever
                      color="error"
                      onClick={() => handleDelete(u)}
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

export default Users;
