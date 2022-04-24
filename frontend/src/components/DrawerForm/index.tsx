import React from "react";
import Drawer from "@mui/material/Drawer";

type DrawerFormProps = {
  visible: boolean;
  children: any;
  onClose?: () => void;
};

const DrawerForm: React.FC<DrawerFormProps> = ({
  visible,
  children,
  onClose,
}) => {
  return (
    <Drawer anchor="right" open={visible} onClose={onClose}>
      {children}
    </Drawer>
  );
};

export default DrawerForm;
