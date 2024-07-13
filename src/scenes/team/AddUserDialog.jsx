import React, { useState, useEffect } from "react";
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
import { height } from "@mui/system";

const AddUserDialog = ({
  isOpen,
  onClose,
  onAdd,
  successMess,
  title,
  setShowKeyboard,
  setActiveField,
  userName,
  setUserName,
  valMessage,
  setValMessage,
  tickKey,
  setTickKey,
  inputValue,
  setInputValue
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleChange = (e) => {
    const v = e.target.value;
    const titleIncludesNumber = title.includes("Number");
    const titleIncludeGroup = title.includes("Group");
    if (titleIncludesNumber && isNaN(v)) {
      if (titleIncludeGroup) {
        setValMessage("");
        setUserName(v);
      } else {
        setValMessage("Number only allowed");
      }
    } else {
      setValMessage("");
      setUserName(v);
    }
  };

  const handleAddUser = () => {
    onAdd({ name: userName });
    setUserName("");
    setValMessage("");
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleCancel = () => {
    setValMessage("");
    setUserName("");
    onClose();
  };

  // useEffect(() => {
  //   if (tickKey) {
  //     handleChange(inputValue);
  //   }
  // }, [tickKey]);
  
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{ "& .MuiPaper-root": { height: "35%", width: "18%" } }}
    >
      <DialogTitle sx={{ height: "30%" }}>
        <Typography sx={{ height: "100%" }} variant="h1">
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ height: "40%" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {/* Display validation message */}

          <TextField
            sx={{ height: "70%" }}
            margin="dense"
            label={title.includes("Number") ? "Number" : "Name"}
            value={userName}
            onChange={handleChange}
            onDoubleClick={() => {
              setInputValue("");
              setShowKeyboard(true);
            }}
            onFocus={() => {
              setActiveField(title);
            }}
          />
          {valMessage && (
            <Typography sx={{ height: "10%" }} variant="body1" color="error">
              {valMessage}
            </Typography>
          )}
          <Typography
            sx={{
              height: "20%",
              color: colors.greenAccent[500],
              fontSize: "1.4em",
              fontWeight: "bold",
            }}
            variant="body1"
          >
            {successMess}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ height: "30%" }}>
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
          onClick={handleAddUser}
          style={{ fontSize: "0.9rem" }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;
