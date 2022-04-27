import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { TStoreModel } from "../../../redux";
import { reset } from "../../../redux/auth.slice";

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
  const dispatch = useDispatch();
  const { jwt, username } = useSelector((state: TStoreModel) => state.auth);
  const navigate = useNavigate();

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(reset());
    onLogout(event);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TakeAndRide
          </Typography>
          {!jwt ? (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          ) : (
            <>
              <Avatar sx={{ bgcolor: "#FF4500", m: 1 }}>
                {username.charAt(0).toUpperCase()}
              </Avatar>
              <StyledNavItem variant="text" onClick={handleLogout}>
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
