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
import MapDialog from "./MapDialog.jsx";

const ClientDetails = ({
  clientDetails,
  setClientDetails,
  clients,
  setClients,
  companyName,
  checkUnsavedChanges,
  successMessage,
  setSuccessMessage,
  clientDetailsCopyModel,
  setClientDetailsCopyModel,
}) => {
  const [editableCells, setEditableCells] = useState([]);
  //const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [clientDetailsCopy, setClientDetailsCopy] = useState({ ...clientDetails });

  const openMap = () => {
    
  }

  const handleEdit = (index) => {
    setEditableCells((prev) => [...prev, index]);
  };

  const handleValueUpdate = (field, updatedValue) => {
    setClientDetailsCopy((prev) => ({
      ...prev,
      [field]: updatedValue,
    }));
  };

  const handleCellClick = (index) => {
    if (!editableCells.includes(index)) {
      // Enter edit mode when the cell is clicked
      handleEdit(index);
    }
  };

  // Callback function to check for unsaved changes
  const checkUnsavedChangesCallback = () => {
    // Compare userDetailsCopy and userDetails for changes
    return JSON.stringify(clientDetailsCopy) !== JSON.stringify(clientDetails);
  };

  useEffect(() => {
    // Set the callback function in the parent component
    checkUnsavedChanges(checkUnsavedChangesCallback);
    setClientDetailsCopyModel(clientDetailsCopy); // Corrected line
  }, [clientDetailsCopy, clientDetails, checkUnsavedChanges]);


  // Trigger handleSave when userDetailsCopy changes
  // useEffect(() => {
  //   handleSave();
  // }, [userDetailsCopy]);
  console.log("groupppppppppppppppppp", clientDetailsCopy);
  console.log("copyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", clientDetailsCopy);
  const rows = Object.entries(clientDetailsCopy)
    .filter(([key]) => key !== "GroupNo")
    .map(([key, value], index) => (
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
            {editableCells.includes(index) ? (
              <>
                <TextField
                  value={value}
                  onChange={(e) => handleValueUpdate(key, e.target.value)}
                  autoFocus
                  onBlur={() =>
                    setEditableCells((prev) => prev.filter((i) => i !== index))
                  }
                  fullWidth
                  variant="standard"
                />
              </>
            ) : key === "Active" ? (
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
                  autoFocus
                  onBlur={() =>
                    setEditableCells((prev) => prev.filter((i) => i !== index))
                  }
                  variant="standard"
                />
              </div>
            ) : (
              <div
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  borderRadius: "4px",
                  border: `1px solid ${colors.greenAccent[400]}`,
                  display: "flex",
                  height: "100%",
                  boxSizing: "border-box",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                  justifyContent: "center",
                }}
                onClick={() => handleCellClick(index)}
              >
                <Typography variant="h4">{value}</Typography>
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
          {checkUnsavedChangesCallback() && (
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
                    clientDetails,
                    clientDetailsCopy,
                    setClients,
                    setSuccessMessage,
                    setClientDetails
                  )
                }
              >
                Save
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        checkUnsavedChangesCallback() && (
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
                  clientDetails,
                  clientDetailsCopy,
                  setClients,
                  setSuccessMessage,
                  setClientDetails
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

export default ClientDetails;
