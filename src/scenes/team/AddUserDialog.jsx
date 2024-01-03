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

const AddUserDialog = ({
  isOpen,
  onClose,
  onAddUser,
  successMess,
}) => {
  const [userName, setUserName] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleAddUser = () => {
    // Perform any validation if needed
    // Call the onAddUser function with the new user details
    onAddUser({ name: userName });
    setUserName("");
    // Close the dialog
    onClose();
  };


   const handleCancel = () => {
     // Reset userName to an empty string
     setUserName("");
     // Close the dialog
     onClose();
   };


  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h1">Add User</Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h4">Enter user details:</Typography>
          <TextField
            label="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Typography variant="body1">{successMess}</Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          variant="h6"
          onClick={handleCancel}
          style={{ background: colors.greenAccent[600], fontSize: "0.8rem" }}
        >
          Cancel
        </Button>
        <Button
          variant="h6"
          onClick={handleAddUser}
          style={{ background: colors.greenAccent[600], fontSize: "0.8rem" }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
