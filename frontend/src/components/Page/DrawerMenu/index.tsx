import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Dashboard from "@mui/icons-material/Dashboard";

type DrawerMenuProps = {
  visible: boolean;
  onToggle: (event: React.MouseEvent) => void;
};

const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onToggle }) => {
  return (
    <React.Fragment>
      <Drawer anchor="left" open={true} hideBackdrop transitionDuration={100}>
        <Box sx={{ width: visible ? 250 : 55 }} role="presentation">
          <List>
            {visible ? (
              <ListItem button onClick={onToggle}>
                <ListItemIcon>
                  <ArrowBack />
                </ListItemIcon>
              </ListItem>
            ) : (
              <ListItem></ListItem>
            )}
            <ListItem button>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              {visible && <ListItemText primary={"Dashboard"} />}
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </React.Fragment>
  );
};

export default DrawerMenu;
