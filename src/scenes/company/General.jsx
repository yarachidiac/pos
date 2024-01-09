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

const General = ({ companyName }) => {
  const [editableCells, setEditableCells] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [companyDetails, setCompanyDetails] = useState(null);
  const [companyDetailsCopy, setCompanyDetailsCopy] = useState(null);

  const handleEdit = (index) => {
    setEditableCells((prev) => [...prev, index]);
  };

  const handleValueUpdate = (field, updatedValue) => {
    setCompanyDetailsCopy((prev) => ({
      ...prev,
      [field]: updatedValue,
    }));
  };

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await fetch(
          `http://192.168.16.128:8000/company/${companyName}`
        );
        if (response.ok) {
          const data = await response.json();
          setCompanyDetails(data);
        } else {
          console.error("Failed to fetch company details");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };

    // Fetch company details when the component mounts
    fetchCompanyDetails();
  }, []);


  console.log("companyy detailssssssssss", companyDetails);
  const handleCellClick = (index) => {
    if (!editableCells.includes(index)) {
      // Enter edit mode when the cell is clicked
      handleEdit(index);
    }
  };

  // Callback function to check for unsaved changes
  const checkUnsavedChangesCallback = () => {
    // Compare userDetailsCopy and userDetails for changes
    return JSON.stringify(companyDetails) !== JSON.stringify(companyDetails);
  };

  // useEffect(() => {
  //   // Set the callback function in the parent component
  //   checkUnsavedChanges(checkUnsavedChangesCallback);
  //   setUserDetailsCopyModel(userDetailsCopy); // Corrected line
  // }, [userDetailsCopy, userDetails, checkUnsavedChanges]);

  // Trigger handleSave when userDetailsCopy changes
  // useEffect(() => {
  //   handleSave();
  // }, [userDetailsCopy]);
  console.log("copyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", companyDetails);
  const rows =
    companyDetails && companyDetails.length > 0
      ? Object.entries(companyDetails[0]).map(([key, value], index) => (
          <TableRow key={key}>
            <TableCell style={{ minWidth: "80px" }}>
              <Typography variant="h4">{key}:</Typography>
            </TableCell>
            <TableCell
              style={{ minWidth: "80px" }}
              onClick={() => handleCellClick(index)}
            >
              {editableCells.includes(index) ? (
                <TextField
                  value={value}
                  onChange={(e) => handleValueUpdate(key, e.target.value)}
                  autoFocus
                  onBlur={() =>
                    setEditableCells((prev) => prev.filter((i) => i !== index))
                  } // Exit edit mode when focus is lost
                />
              ) : (
                <Typography variant="h4">{value}</Typography>
              )}
            </TableCell>
          </TableRow>
        ))
      : null;

  return (
    <Box>
      <TableContainer style={{ maxHeight: 400, overflowY: "auto" }}>
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
              // onClick={() =>
              //   handleSave(
              //     companyName,
              //     userDetails,
              //     userDetailsCopy,
              //     setUsers,
              //     setSuccessMessage,
              //     setUserDetails
              //   )
              // }
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
            // onClick={() =>
            //   handleSave(
            //     companyName,
            //     userDetails,
            //     userDetailsCopy,
            //     setUsers,
            //     setSuccessMessage,
            //     setUserDetails
            //   )
            // }
          >
            Save
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default General;
