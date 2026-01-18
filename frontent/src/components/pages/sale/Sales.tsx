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
import { AddOutlined, PreviewOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ApiError from "../../common/ApiError";
import Form from "./Form";
import { getSales } from "../../../lib/sale";
import Items from "./Items";
import moment from "moment";
import type { PaginationType, SaleType } from "../../../types";
const Sales = () => {
  const [open, setOpen] = useState(false);
  const [sales, setSales] = useState<SaleType[]>([]);
  const [apiError, setApiError] = useState<string>("");

  const [paginantion, setPagination] = useState<PaginationType>({
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
    setOpen(!open);
  };

  const getCategories = async () => {
    setApiError("");
    try {
      const { data } = await getSales(paginantion);
      setSales(data.data);
      setTotal(data.total);
    } catch (error: any) {
      setApiError(
        error.response?.data?.message
          ? error.response?.data?.message
          : "Fetching categories faild"
      );
    }
  };

  useEffect(() => {
    getCategories();
  }, [open, paginantion.page, paginantion.rowsPerPage]);
  return (
    <>
      {open && <Form open={open} onClose={handleOpenClose} />}
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
                View
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sales.map((sale: SaleType) => (
              <TableRow key={sale._id}>
                <TableCell>
                  {moment(sale.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </TableCell>
                <TableCell>{sale.soldBy.name}</TableCell>
                <TableCell>
                  <Items items={sale.items} />
                </TableCell>
                <TableCell>{sale.totalAmount} Af</TableCell>
                <TableCell>
                  <PreviewOutlined color="primary" />
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
