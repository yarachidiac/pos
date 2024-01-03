import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const ConfirmationDialog = ({ open, onCancel, onConfirm }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
  
  return (
    <Dialog open={open}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>Do you want to save changes before closing?</DialogContent>
      <DialogActions>
        <Button
          variant="h6"
          onClick={onConfirm}
          autoFocus
          style={{ background: colors.greenAccent[600], fontSize: "0.8rem" }}
        >
          Yes
        </Button>
        <Button
          variant="h6"
          onClick={onCancel}
          style={{ background: colors.greenAccent[600], fontSize: "0.8rem" }}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
