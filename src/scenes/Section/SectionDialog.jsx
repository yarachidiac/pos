import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const SectionDialog = ({ isOpen, onClose, onAdd, successMess, title }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sectionName, setSectionName] = useState("");
  const [sectionNo, setSectionNo] = useState("");

  const handleAdd = () => {
    // Perform any validation if needed
    // Call the onAddUser function with the new user details
    onAdd({ SectionNo: sectionNo, Name: sectionName });
    setSectionNo("");
    setSectionName("");
    // Close the dialog
    setTimeout(() => {
      // Close the dialog
      onClose();
    }, 3000);
  };

  const handleCancel = () => {
    // Reset userName to an empty string
    setSectionNo("");
    setSectionName("");
    // Close the dialog
      // Close the dialog
      onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxHeight="100%">
      <DialogTitle>
        <Typography variant="h1">{title}</Typography>
      </DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: "20px",
        }}
      >
        <TextField
          autoFocus
          required
          margin="dense"
          label="Section No"
          value={sectionNo}
          onChange={(e) => setSectionNo(e.target.value)}
        />
        <TextField
          label="Section Name"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
        />
        <Typography variant="body1">{successMess}</Typography>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCancel}
          style={{ fontSize: "0.9rem" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAdd}
          style={{ fontSize: "0.9rem" }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SectionDialog;
