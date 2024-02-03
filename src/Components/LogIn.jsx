import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginFun } from "../Redux/Features/AuthSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const defaultTheme = createTheme();

const validationSchema = yup.object({
  username: yup.string("Enter your email"),

  password: yup.string("Enter your password"),
});

export default function LogIn() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.data.token);

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated]);

  const hendleSubmit = (values) => {
    dispatch(loginFun(values));
    console.log(isAuthenticated);
  };

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      hendleSubmit(values);
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        sx={{
          height: "60vh",
          padding: "80px 40px",
          justifyContent: "center",
        }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={4}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: 500, // set the maximum width
              width: "70%", // ensure it takes 100% width of the parent
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="username"
                  margin="dense"
                  size="small"
                  name="username"
                  label="USER"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
                  helperText={formik.touched.username && formik.errors.username}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  size="small"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  style={{ marginTop: "10px" }}
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <ToastContainer />
    </ThemeProvider>
  );
}
