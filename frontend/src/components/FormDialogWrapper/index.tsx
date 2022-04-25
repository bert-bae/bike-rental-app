import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type FormDialogWrapperProps = {
  title: string;
  description?: string;
  visible: boolean;
  Form: React.ReactElement;
  onClose?: () => void;
  onOk?: () => void;
};

const FormDialogWrapper: React.FC<FormDialogWrapperProps> = ({
  title,
  description,
  visible,
  Form,
  onClose,
}) => {
  return (
    <Dialog open={visible} onClose={onClose} onBackdropClick={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}
        {Form}
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Button type="button" variant="text" color="error" onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialogWrapper;
