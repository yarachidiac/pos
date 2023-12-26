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
  }, [
    userDetailsCopy,
    userDetails,
    checkUnsavedChanges,
    
  ]);

  // Trigger handleSave when userDetailsCopy changes
  // useEffect(() => {
  //   handleSave();
  // }, [userDetailsCopy]);
  console.log("copyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", userDetailsCopy);
  const rows = Object.entries(userDetailsCopy).map(([key, value], index) => (
    <TableRow key={key} style={{ width: "100%" }} >
      <TableCell
        style={{
          //minWidth: "80px",
          width: "30%",
          //borderColor: `${colors.greenAccent[400]}`,
        }}
      >
        <Typography variant="h4">{key}:</Typography>
      </TableCell>
      <TableCell
        style={{
          //minWidth: "80px",
          width: "70%",
          //borderColor: `${colors.greenAccent[400]}`, // Set border color to red
        }}
      >
        <div
          style={{
            position: "relative",
            height: "40px", // Adjust the height as needed
            width: "70%", // Ensure the frame takes the full width of the TableCell
          }}
        >
          {editableCells.includes(index) ? (
            <>
              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  border: `2px solid ${colors.greenAccent[400]}`, // Set border color to transparent
                  borderRadius: "4px",
                  pointerEvents: "none", // Allow click-through to the TextField
                }}
              />
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
                    border: "1px solid #ccc", // Add border style to the TextField
                    borderRadius: "4px", // Add border radius to the TextField
                    padding: "4px", // Add padding to the TextField
                  },
                }}
              />
            </>
          ) : (
            <Typography
              variant="h4"
              style={{
                cursor: "pointer",
                padding: "8px",
                borderRadius: "4px",
                border: `1px solid ${colors.greenAccent[400]}`,
                display: "inline-block",
                height: "100%",
                boxSizing: "border-box",
                width: "100%"
              }}
              onClick={() => handleCellClick(index)}
            >
              {value}
            </Typography>
          )}
        </div>
      </TableCell>
    </TableRow>
  ));


  return (
    <Box style={{ height: "100%" }}>
      <TableContainer style={{height:"90%", overflowY: "auto" }}>
        <Table>
          <TableBody>{rows}</TableBody>
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
          <Box sx={{ minWidth: "5%" }}>
            <Button
              variant="contained"
              style={{ background: colors.greenAccent[500] }}
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
        </Box>
      ) : (
        <Box sx={{ width: "10%", marginTop: 2, marginLeft: "auto" }}>
          <Button
            variant="contained"
            style={{ background: colors.greenAccent[500] }}
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
  );
};

export default GeneralAccountingTable;

