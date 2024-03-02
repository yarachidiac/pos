import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const KitchenDialog = ({ open, onCancel, onConfirm }) => {
   const theme = useTheme();
   const colors = tokens(theme.palette.mode);
  
  return (
    <Dialog open={open}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>Do you want to send changes to kitchen before closing?</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={onConfirm}
          autoFocus
          style={{ fontSize: "0.9rem" }}
        >
          Send
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onCancel}
          style={{ fontSize: "0.9rem" }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default KitchenDialog;
