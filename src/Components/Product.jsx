import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { ToastContainer } from "react-toastify";
import {
  addNewData,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
} from "../Redux/Features/ProductSlice";

import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Container,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";

const validationSchema = yup.object({
  title: yup.string("Enter your email"),

  password: yup.string("Enter your password"),
});

export default function DashBoard() {
  const [page, setPage] = React.useState(0);
  const [editState, setEditState] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const productData = useSelector((state) => state.Products.productData);
  const singlePoductData = useSelector((state) => state.Products.singleProduct);

  useEffect(() => {
    dispatch(getAllProduct());
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const dispatch = useDispatch();

  //delete product function
  const deleteProductFun = (values) => {
    dispatch(deleteProduct(values));
  };

  // add more product dialog
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const handleAddClick = (id, booleanValue) => {
    setAddDialogOpen(true);
    setEditState(booleanValue);
    dispatch(getSingleProduct(id));
  };

  const handleCloseAddDialog = () => {
    setAddDialogOpen(false);
  };

  const addProduct = (values) => {
    dispatch(addNewData(values));
  };

  const upDateProduct = (values) => {
    dispatch(updateProduct(values));
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      brand: "",
      category: "",
      price: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (editState) {
        upDateProduct(values);
        formik.handleReset();
      } else {
        addProduct(values);
      }
      handleCloseAddDialog();
    },
  });

  useEffect(() => {
    if (singlePoductData) {
      formik.setValues({
        title: singlePoductData.title,
        brand: singlePoductData.brand,
        category: singlePoductData.category,
        price: singlePoductData.price,
        id: singlePoductData.id,
      });
    }
  }, [singlePoductData]);
  return (
    <>
      <Container>
        <Paper elevation={2} style={{ margin: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" component="h5" style={{ margin: "7px " }}>
              PRODUCT MANAGEMENT
            </Typography>
            <Button
              variant="contained"
              onClick={handleAddClick}
              style={{ float: "right", margin: "7px " }}
            >
              ADD PRODUCT
            </Button>
          </div>

          <TableContainer
            component={Paper}
            style={{ overflow: "auto", height: "400px" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{ backgroundColor: "#2962ff", color: "white" }}
                  >
                    S.NO
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ backgroundColor: "#2962ff", color: "white" }}
                  >
                    TITLE
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ backgroundColor: "#2962ff", color: "white" }}
                  >
                    BRAND
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ backgroundColor: "#2962ff", color: "white" }}
                  >
                    CATEGORY
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ backgroundColor: "#2962ff", color: "white" }}
                  >
                    PRICE
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ backgroundColor: "#2962ff", color: "white" }}
                  >
                    ACTION
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, i) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.title}</TableCell>
                      <TableCell align="left">{row.brand}</TableCell>
                      <TableCell align="left">{row.category}</TableCell>
                      <TableCell align="left">{row.price}</TableCell>
                      <TableCell align="left">
                        <IconButton onClick={() => deleteProductFun(row.id)}>
                          <DeleteIcon />
                        </IconButton>

                        <IconButton
                          onClick={() => handleAddClick(row.id, true)}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={productData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Dialog open={isAddDialogOpen} onClose={handleCloseAddDialog}>
          <DialogTitle>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                component="h5"
                style={{ margin: "7px " }}
              >
                ADD PRODUCT
              </Typography>
              <IconButton
                variant="contained"
                onClick={() => {
                  handleCloseAddDialog();
                  formik.handleReset();
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>

          <form onSubmit={formik.handleSubmit}>
            <DialogContent dividers>
              <TextField
                fullWidth
                id="username"
                margin="dense"
                size="small"
                name="title"
                label="TITLE"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                fullWidth
                id="brand"
                margin="dense"
                size="small"
                name="brand"
                label="BRAND"
                value={formik.values.brand}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.brand && Boolean(formik.errors.brand)}
                helperText={formik.touched.brand && formik.errors.brand}
              />
              <TextField
                fullWidth
                id="category"
                margin="dense"
                size="small"
                name="category"
                label="CATEGORY"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
                helperText={formik.touched.category && formik.errors.category}
              />
              <TextField
                fullWidth
                id="price"
                margin="dense"
                size="small"
                name="price"
                label="PRICE"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
              />
            </DialogContent>
            <DialogActions>
              <Button color="primary" variant="contained" type="submit">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Container>
      <ToastContainer />
    </>
  );
}
