import React, { useState, useContext } from "react";
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, ArrowDropDownOutlined } from "@mui/icons-material";
import FlexBetween from "shared components/FlexBetween";
import {ThemeContext} from "../state/ThemeContext";
import profileImage from "assets/n.jpg";
import { AppBar, Button, Box, Typography, IconButton, Toolbar, Menu, MenuItem, useTheme } from "@mui/material";
import {AuthContext} from "../state/AuthContext";
import { useGetUserByEmailQuery } from "state/api";

  const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const themeContext = useContext(ThemeContext);
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const authContext = useContext(AuthContext);
  
  const logout= () => {
    localStorage.removeItem('email');
    localStorage.removeItem('id');
    authContext.setAuth({});
  }

  const { data, isLoading } = useGetUserByEmailQuery(authContext.auth.email);

  return (
    isLoading ? <>Loading..</> :
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => themeContext.setMode((prev) => (prev === "light" ? "dark" : "light"))}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          <FlexBetween>
            <Button onClick={handleClick} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", textTransform: "none", gap: "1rem" }}>
              <Box component="img" alt="profile" src={profileImage} height="32px" width="32px" borderRadius="50%" sx={{ objectFit: "cover" }}/>
              <Box textAlign="left">
                <Typography fontWeight="bold" fontSize="0.85rem" sx={{ color: theme.palette.secondary[100] }}> {data[0].name || "Loading.."} </Typography>
                <Typography fontSize="0.75rem" sx={{ color: theme.palette.secondary[200] }}> {data[0].occupation || "Loading.."} </Typography>
              </Box>
              <ArrowDropDownOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}/>
            </Button>
            <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
              <MenuItem onClick={logout}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
