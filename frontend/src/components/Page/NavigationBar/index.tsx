import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "@emotion/styled";

type NavigationBarProps = {
  loggedIn: boolean;
  onMenuClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onLogin: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onLogout: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const StyledNavItem = styled(Button)({
  margin: "0 5px",
  padding: "0 6px",
  color: "#FFF",
  a: {
    color: "#FFF",
    textDecoration: "none",
  },
});

const NavigationBar: React.FC<NavigationBarProps> = ({
  loggedIn,
  onMenuClick,
  onLogin,
  onLogout,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TakeAndRide
          </Typography>
          {loggedIn ? (
            <Button color="inherit" onClick={onLogin}>
              Login
            </Button>
          ) : (
            <>
              <StyledNavItem variant="text">
                <Link to="/admin">Admin</Link>
              </StyledNavItem>
              <StyledNavItem variant="text">
                <Link to="/">Members</Link>
              </StyledNavItem>
              <StyledNavItem variant="text" onClick={onLogout}>
                Logout
              </StyledNavItem>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;
