import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../Redux/Features/AuthSlice";

const pages = ["dashboard", "product"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const isAuthenticated = useSelector((state) => state.auth.data.token);
  useEffect(() => {
    if (!isAuthenticated) {
      nevigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ justifyContent: "space-between", paddingRight: "16px" }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CRM
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {isAuthenticated
                ? pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        <Link
                          to={`/${page}`}
                          style={{ textDecoration: "none", color: "#000" }}
                        >
                          {page.toUpperCase()}
                        </Link>
                      </Typography>
                    </MenuItem>
                  ))
                : null}
            </Menu>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
          >
            {isAuthenticated
              ? pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Link
                      to={`/${page}`}
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      {page.toUpperCase()}
                    </Link>
                  </MenuItem>
                ))
              : null}
            {isAuthenticated ? (
              <Button style={{ color: "#fff" }} onClick={handleLogout}>
                Logout
              </Button>
            ) : null}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
