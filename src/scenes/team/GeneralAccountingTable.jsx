import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {  Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { handleSave } from "./SaveHandler";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { textAlign } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";

const GeneralAccountingTable = ({
  userDetails,
  setUserDetails,
  setUsers,
  companyName,
  successMessage,
  setSuccessMessage,
  userDetailsCopy,
  setUserDetailsCopy,
  unsavedChanges,
  setUnsavedChanges,
}) => {
  console.log("fromm generallllllllllllllllllll", userDetails);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleValueUpdate = (field, updatedValue) => {
    setUserDetailsCopy((prev) => ({
      ...prev,
      [field]: updatedValue,
    }));
  };

  useEffect(() => {
    // Set the callback function in the parent component
    if (JSON.stringify(userDetailsCopy) !== JSON.stringify(userDetails)) {
      setUnsavedChanges(true);
    } else {
      setUnsavedChanges(false);
    }
  }, [userDetailsCopy, userDetails, unsavedChanges]);

  console.log("copyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", userDetailsCopy);
  const rows = Object.entries(userDetailsCopy).map(([key, value], index) => (
    <TableRow
      key={key}
      style={{
        width: window.innerWidth * 0.28,
        display: "flex",
        flexDirection: "row",
        height: window.innerHeight * 0.1,
        //padding: '8px',
        borderRadius: "4px",
        border: "1px solid #ccc",
        // justifyContent: "space-between",
        // justifyItems: "space-between",
        // alignItems: "space-between"
      }}
    >
      <TableCell
        style={{
          //minWidth: "80px",
          width: "30%",
          height: "100%",
          whiteSpace: "pre-wrap", // Allow text wrapping
          overflowWrap: "normal", // Do not break words
          //overflowWrap: "break-word",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            maxHeight: "100%",
            width: "100%",
            alignItems: "start", // Align text to the start (left)
            justifyContent: "center",
          }}
        >
          <Typography variant="h4">{key}</Typography>
        </Box>
      </TableCell>

      <TableCell
        style={{
          width: "70%",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
          }}
        >
          {key === "username" ||
          key === "password" ||
          key === "email" ||
          key === "id" ||
          key === "SAType" ||
          key === "Branch" ? (
            <TextField
              value={value}
              onChange={(e) => handleValueUpdate(key, e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={value === "Y"}
                  onChange={() =>
                    handleValueUpdate(key, value === "Y" ? "N" : "Y")
                  }
                />
                <Typography variant="h4">Y</Typography>
              </div>

              <div style={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={value === "N"}
                  onChange={() =>
                    handleValueUpdate(key, value === "N" ? "Y" : "N")
                  }
                />
                <Typography variant="h4">N</Typography>
              </div>
            </div>
          )}
        </div>
      </TableCell>
    </TableRow>
  ));

  return (
    <Box style={{ height: "100%" }}>
      <TableContainer style={{ height: "90%", overflowY: "auto" }}>
        <Table>
          <TableBody>
            <Box
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)", // Adjust the number of columns
                gap: "5px",
              }}
            >
              {rows}
            </Box>
          </TableBody>
        </Table>
      </TableContainer>

      {successMessage ? (
        <Box
          sx={{
            minHeight: "10%",
            width: "auto",
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center", // Add this line to center vertically
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h3" style={{ color: colors.greenAccent[500] }}>
              {successMessage}
            </Typography>
          </Box>
          {unsavedChanges && (
            <Box sx={{ minWidth: "5%" }}>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  //background: colors.greenAccent[600],
                  fontSize: "1.1rem",
                }}
                onClick={() =>
                  handleSave(
                    companyName,
                    userDetails,
                    userDetailsCopy,
                    setUsers,
                    setSuccessMessage,
                    setUserDetails
                  )
                }
              >
                Save
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        unsavedChanges && (
          <Box sx={{ width: "10%", marginTop: 2, marginLeft: "auto" }}>
            <Button
              style={{
                fontSize: "1.1rem",
              }}
              variant="contained"
              color="secondary"
              onClick={() =>
                handleSave(
                  companyName,
                  userDetails,
                  userDetailsCopy,
                  setUsers,
                  setSuccessMessage,
                  setUserDetails
                )
              }
            >
              Save
            </Button>
          </Box>
        )
      )}
    </Box>
  );
};

export default GeneralAccountingTable;

