import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { handleSave } from "./SaveHandler.jsx";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { textAlign } from "@mui/system";
import Checkbox from "@mui/material/Checkbox";
import Keyboard from "../form/Keyboard.jsx";

const ClientDetails = ({
  clientDetails,
  setClientDetails,
  clients,
  setClients,
  companyName,
  successMessage,
  setSuccessMessage,
  clientDetailsCopy,
  setClientDetailsCopy,
  unsavedChanges,
  setUnsavedChanges, url, valMessage, setValMessage,
  activeField,
   setActiveField,
   showKeyboard,
    setShowKeyboard,
}) => {
  console.log("cccccccccccccccccccccccc", clientDetails);
  // const [editableCells, setEditableCells] = useState([]);
  //const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (!email) {
      setValMessage("");
    } else if (!validateEmail(email)) {
      setValMessage("Invalid email format");
    } else {
      setValMessage("");
    }
    handleValueUpdate("Email", email);
  };

  const handleValueUpdate = (field, updatedValue) => {
    if (
      field === "AccDisc" ||
      field === "VAT" ||
      field === "AccPrice" ||
      field === "Floor"
    ) {
      if (isNaN(updatedValue)) {
        setValMessage(`${field} should be number`);
        return;
      } else {
        setValMessage("");
      }
    } else if (field === "Tel") {
      if (!/^\d+$/.test(updatedValue)) {
        setValMessage("Telephone number should contain only digits");
        return;
      } else {
        setValMessage("");
      }
    }
    setClientDetailsCopy((prev) => ({
      ...prev,
      [field]: updatedValue,
    }));
  };


  useEffect(() => {
    console.log("copppppppppppppppppppp", JSON.stringify(clientDetailsCopy));
    console.log("ddddddddddddddddddddddddddddd", JSON.stringify(clientDetails));
    if (JSON.stringify(clientDetailsCopy) != JSON.stringify(clientDetails)) {
      setUnsavedChanges(true);
    } else {
      setUnsavedChanges(false);
    }
  }, [clientDetailsCopy, clientDetails, unsavedChanges]);

  const rows = Object.entries(clientDetailsCopy)
    .filter(([key]) => key !== "GroupNo")
    .map(([key, value], index) => (
      <TableRow
        key={key}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          height: "80px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      >
        <TableCell
          style={{
            width: "30%",
            height: "auto",
            boxSizing: "border-box",
          }}
        >
          <Box
            sx={{
              maxHeight: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h4">{key}</Typography>
          </Box>
        </TableCell>

        <TableCell
          style={{
            width: "70%",
            // height: "50px",
          }}
        >
          {key === "Active" ? (
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
          ) : key === "GAddress" ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Button
                sx={{ width: "50%" }}
                onClick={() =>
                  window.open(
                    "https://www.google.com/maps/place/Lebanon/@33.854721,35.862285,7z",
                    "_blank"
                  )
                }
              >
                Choose
              </Button>
              <TextField
                sx={{ width: "50%" }}
                value={value}
                  onChange={(e) => handleValueUpdate(key, e.target.value)}
                  
                // onBlur={() =>
                //   setEditableCells((prev) => prev.filter((i) => i !== index))
                // }
                onDoubleClick={() => {
                  setShowKeyboard(true);
                }}
                onFocus={() => {
                  setActiveField(key);
                }}
                variant="outlined"
                size="small"
              />
            </div>
          ) : key === "Email" ? (
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
                setActiveField("Email");
              }}
            />
          ) : (
            <TextField
              sx={{ width: "100%" }}
              value={value}
              onChange={(e) => handleValueUpdate(key, e.target.value)}
              // onBlur={() =>
              //   setEditableCells((prev) => prev.filter((i) => i !== index))
              // }
              variant="outlined"
              size="small"
              onDoubleClick={() => {
                setShowKeyboard(true);
              }}
              onFocus={() => {
                setActiveField(key);
              }}
            />
          )}
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
              // gap: "5px",
            }}
          >
            {rows}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ height: "5%" }}>
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
          width: "auto",
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
                  clientDetails,
                  clientDetailsCopy,
                  setSuccessMessage,
                  setClientDetails,
                  valMessage,
                  url
                )
              }
            >
              Save
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ClientDetails;
