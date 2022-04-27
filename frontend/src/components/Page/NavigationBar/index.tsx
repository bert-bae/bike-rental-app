import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { TStoreModel } from "../../../redux";

type NavigationBarProps = {
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
  onMenuClick,
  onLogin,
  onLogout,
}) => {
  const { userId } = useSelector((state: TStoreModel) => state.auth);
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TakeAndRide
          </Typography>
          {!userId ? (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          ) : (
            <StyledNavItem variant="text" onClick={onLogout}>
              Logout
            </StyledNavItem>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavigationBar;
