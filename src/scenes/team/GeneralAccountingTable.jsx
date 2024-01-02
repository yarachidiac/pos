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

const GeneralAccountingTable = ({
  userDetails,
  setUserDetails,
  users,
  setUsers,
  companyName,
  checkUnsavedChanges,
  successMessage,
  setSuccessMessage,
  userDetailsCopyModel,
  setUserDetailsCopyModel,
  //handleUserDetailsCopyChange,
}) => {
  const [editableCells, setEditableCells] = useState([]);
  //const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  console.log("fromm generallllllllllllllllllll", userDetails);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [userDetailsCopy, setUserDetailsCopy] = useState({ ...userDetails });
  //const [isEditing, setIsEditing] = useState(false);

  
  



  const handleEdit = (index) => {
    setEditableCells((prev) => [...prev, index]);
  };

  const handleValueUpdate = (field, updatedValue) => {
    setUserDetailsCopy((prev) => ({
      ...prev,
      [field]: updatedValue,
    }));
  };

  //   const handleSave = async () => {
  //    try {
  //      const data = userDetailsCopy;

  //      // Send a POST request to save all edited fields
  //      const saveResponse = await fetch(
  //        `http://192.168.16.108:8000/users/${companyName}/${userDetails.id}`,
  //        {
  //          method: "POST",
  //          headers: {
  //            "Content-Type": "application/json",
  //          },
  //          body: JSON.stringify(data),
  //        }
  //      );
  //      const responseData = await saveResponse.json();

  //      if (saveResponse.ok) {
  //        console.log("Save response:", responseData);
  //        setSuccessMessage(responseData.message);

  //        // If save is successful, update userDetails to match userDetailsCopy
  //        setUserDetails(userDetailsCopy);

  //        // If save is successful, fetch the updated users
  //        const fetchResponse = await fetch(
  //          `http://192.168.16.108:8000/users/${companyName}`
  //        );
  //        const updatedUsers = await fetchResponse.json();

  //        console.log("Updated users:", updatedUsers);

  //        // Update the users state in the Team component
  //        setUsers(updatedUsers);

  //        console.log("Save successful");
  //      } else {
  //        console.error("Save failed");
  //      }
  //    } catch (error) {
  //      console.error("Error during save:", error);
  //    }
  //  };

  const handleCellClick = (index) => {
    if (!editableCells.includes(index)) {
      // Enter edit mode when the cell is clicked
      handleEdit(index);
    }
  };

  // Callback function to check for unsaved changes
  const checkUnsavedChangesCallback = () => {
    // Compare userDetailsCopy and userDetails for changes
    return JSON.stringify(userDetailsCopy) !== JSON.stringify(userDetails);
  };

  useEffect(() => {
    // Set the callback function in the parent component
    checkUnsavedChanges(checkUnsavedChangesCallback);
    setUserDetailsCopyModel(userDetailsCopy); // Corrected line
  }, [userDetailsCopy, userDetails, checkUnsavedChanges]);

  // Trigger handleSave when userDetailsCopy changes
  // useEffect(() => {
  //   handleSave();
  // }, [userDetailsCopy]);
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
          //minWidth: "80px",
          width: "70%",
          height: "100%",
          //borderColor: `${colors.greenAccent[400]}`, // Set border color to red
        }}
      >
        <div
          style={{
            position: "relative",
            height: "100%", // Adjust the height as needed
            width: "100%", // Ensure the frame takes the full width of the TableCell
          }}
        >
          {editableCells.includes(index) ? (
            <>
              <div
                style={{
                  width: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  border: `2px solid ${colors.greenAccent[400]}`,
                  borderRadius: "4px",
                  pointerEvents: "none",
                }}
              />
              {key === "username" ||
              key === "password" ||
              key === "email" ||
              key === "id" ? (
                <TextField
                  value={value}
                  onChange={(e) => handleValueUpdate(key, e.target.value)}
                  autoFocus
                  onBlur={() =>
                    setEditableCells((prev) => prev.filter((i) => i !== index))
                  }
                  fullWidth
                  variant="standard"
                  InputProps={{
                    style: {
                      height: "100%",
                      boxSizing: "border-box",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                      padding: "4px",
                    },
                  }}
                />
              ) : (
                <Select
                  value={value}
                  onChange={(e) => handleValueUpdate(key, e.target.value)}
                  open={editableCells.includes(index)} // Set open to true when the cell is in edit mode
                  onClose={() =>
                    setEditableCells((prev) => prev.filter((i) => i !== index))
                  }
                  fullWidth
                  style={{ textAlign: "center" }}
                  variant="standard"
                  // inputProps={{
                  //   style: {
                  //     height: "100%",
                  //     boxSizing: "border-box",
                  //     border: `1px solid ${colors.greenAccent[600]}`,
                  //     borderRadius: "4px",
                  //     textAlign: "center",
                  //   },
                  // }}
                >
                  {/* Add your options here */}
                  <MenuItem value="Y" style={{ justifyContent: "center" }}>
                    Y
                  </MenuItem>
                  <MenuItem value="N" style={{ justifyContent: "center" }}>
                    N
                  </MenuItem>
                  {/* Add more options as needed */}
                </Select>
              )}
            </>
          ) : (
            <div
              style={{
                cursor: "pointer",
                alignItems: "center",
                borderRadius: "4px",
                border: `1px solid ${colors.greenAccent[400]}`,
                display: ["username", "password", "email", "id"].includes(key)
                  ? "inline-block"
                  : "flex",
                height: "100%",
                boxSizing: "border-box",
                width: "100%",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                textAlign: ["username", "password", "email", "id"].includes(key)
                  ? "left"
                  : "center",
                padding: ["username", "password", "email", "id"].includes(key)
                  ? "8px" // Adjust the padding for specific keys
                    : "0px",

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
          {checkUnsavedChangesCallback() && (
            <Box sx={{ minWidth: "5%" }}>
              <Button
                variant="h6"
                style={{
                  background: colors.greenAccent[600],
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
        checkUnsavedChangesCallback() && (
          <Box sx={{ width: "10%", marginTop: 2, marginLeft: "auto" }}>
            <Button
              variant="h6"
              style={{
                background: colors.greenAccent[600],
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
        )
      )}
    </Box>
  );
};

export default GeneralAccountingTable;

