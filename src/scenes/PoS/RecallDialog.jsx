import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"; // Import TextField
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";

const RecallDialog = ({ open, onCancel, onSubmit, setInvRecall }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Dialog open={open}>
      <DialogTitle sx={{ fontSize: "1.1rem", fontWeight: "bold" }}>
        Call an invoice
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Enter your text"
          variant="outlined"
          sx={{ mt: 2 }} // Add some margin-top to space it out
          onChange={(e) => setInvRecall(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={onCancel}
          style={{ fontSize: "0.9rem" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={onSubmit}
          style={{ fontSize: "0.9rem" }}
        >
          Recall
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecallDialog;
