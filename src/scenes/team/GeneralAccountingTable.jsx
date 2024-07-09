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
import Keyboard from "../form/Keyboard";
import { useLanguage } from "../LanguageContext";
import translations from "../translations";

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
  url,
  valMessage,
  setValMessage,
  activeField,
  setActiveField,
  showKeyboard,
  setShowKeyboard,
  tickKey,
  inputValue,
  setInputValue,
  setTickKey,
}) => {
  console.log("fromm generallllllllllllllllllll", userDetails);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { language } = useLanguage();
  const t = translations[language];

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = typeof e === "object" ? e.target.value : e;
    if (!email) {
      setValMessage("");
    } else if (!validateEmail(email)) {
      setValMessage("Invalid email format");
    } else {
      setValMessage("");
    }
    handleValueUpdate("email", email);
  };

  const handleValueUpdate = (field, updatedValue) => {
    setUserDetailsCopy((prev) => ({
      ...prev,
      [field]: updatedValue,
    }));
    setInputValue("");
    setTickKey(false);
  };

  useEffect(() => {
    console.log("valuee tabaa keyy tickkkk", tickKey);
    if (tickKey) {
      console.log("ana b l tickkey");
      if (activeField === "email") {
        handleEmailChange(inputValue);
      } else {
        handleValueUpdate(activeField, inputValue);
      }
    }
  }, [tickKey]);

  useEffect(() => {
    // Set the callback function in the parent component
    if (JSON.stringify(userDetailsCopy) !== JSON.stringify(userDetails)) {
      setUnsavedChanges(true);
    } else {
      setUnsavedChanges(false);
    }
  }, [userDetailsCopy, userDetails, unsavedChanges]);

  console.log("copyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", userDetailsCopy);
  const rows = Object.entries(userDetailsCopy)
    .filter(([key]) => key !== "COH" && key !== "EOD")
    .map(([key, value], index) => (
      <TableRow
        key={key}
        style={{
          width: window.innerWidth * 0.28,
          display: "flex",
          flexDirection: "row",
          height: "100%",
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
            <Typography variant="h4">
              {" "}
              {translations[language][key.toLowerCase()] || key}
            </Typography>
          </Box>
        </TableCell>
        <TableCell
          style={{
            width: "70%",
            height: "100%",
          }}
        >
          <Box
            style={{
              position: "relative",
              height: "100%",
              width: "100%",
            }}
          >
            {key === "username" ||
            key === "password" ||
            key === "SAType" ||
            key === "Branch" ? (
              <TextField
                value={value}
                onChange={(e) => handleValueUpdate(key, e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                onDoubleClick={() => {
                  setShowKeyboard(true);
                }}
                onFocus={() => {
                  setActiveField(key);
                }}
              />
            ) : key === "email" ? (
              <TextField
                value={value}
                onChange={handleEmailChange}
                fullWidth
                variant="outlined"
                size="small"
                onDoubleClick={() => {
                  setShowKeyboard(true);
                }}
                onFocus={() => {
                  setActiveField("email");
                }}
              />
            ) : key === "id" ? (
              <TextField
                value={value}
                onChange={(e) => handleValueUpdate(key, e.target.value)}
                fullWidth
                variant="outlined"
                size="small"
                inputProps={{
                  readOnly: true,
                }}
              />
            ) : (
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    checked={value === "Y"}
                    onChange={() =>
                      handleValueUpdate(key, value === "Y" ? "N" : "Y")
                    }
                  />
                  <Typography variant="h4">Y</Typography>
                </Box>

                <Box style={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    checked={value === "N"}
                    onChange={() =>
                      handleValueUpdate(key, value === "N" ? "Y" : "N")
                    }
                  />
                  <Typography variant="h4">N</Typography>
                </Box>
              </Box>
            )}
          </Box>
        </TableCell>
      </TableRow>
    ));

  return (
    <Box style={{ height: "100%" }}>
      <TableContainer style={{ height: "85%", overflowY: "auto" }}>
        <Table>
          <TableBody
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)", // Adjust the number of columns
              gap: "5px",
            }}
          >
            {rows}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ height: "5%", marginTop: "auto" }}>
        {valMessage && (
          <Typography
            variant="body1"
            color="error"
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            {valMessage}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          height: "10%",
          width: "100%",
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {successMessage && (
          <Box sx={{ width: "95%", marginTop: "auto" }}>
            <Typography variant="h3" style={{ color: colors.greenAccent[500] }}>
              {successMessage}
            </Typography>
          </Box>
        )}
        {unsavedChanges && (
          <Box sx={{ minWidth: "5%", marginLeft: "auto", marginTop: "auto" }}>
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
                  setUserDetails,
                  valMessage,
                  url
                )
              }
            >
              {t.save ? t.save.toLowerCase() : "save"}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default GeneralAccountingTable;

