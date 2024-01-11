import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

const NumericKeypad = ({ open, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = (value) => {
    setInputValue((prevInput) => prevInput + value);
  };

  const handleClear = () => {
    setInputValue("");
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
    setInputValue("");
    onClose();
  };

  const handleOperator = (operator) => {
    setInputValue((prevInput) => prevInput + operator);
  };

  const renderButton = (value) => (
    <Button key={value} onClick={() => handleButtonClick(value)}>
      {value}
    </Button>
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Numeric Keypad</DialogTitle>
      <DialogContent>
        <TextField
          label="Number"
          variant="outlined"
          fullWidth
          value={inputValue}
          readOnly
        />
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((value) => (
            <Grid item xs={4} key={value}>
              {renderButton(value)}
            </Grid>
          ))}
          <Grid item xs={4}>
            {renderButton(".")}
          </Grid>
          <Grid item xs={4}>
            <Button onClick={() => handleOperator("+")}>+</Button>
          </Grid>
          <Grid item xs={4}>
            <Button onClick={() => handleOperator("-")}>-</Button>
          </Grid>
          <Grid item xs={4}>
            <Button onClick={handleClear}>Clear</Button>
          </Grid>
          <Grid item xs={4}>
            <Button onClick={handleSubmit}>Submit</Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default NumericKeypad;