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

const ItemDetails = ({
  itemDetails,
  setItemDetails,
  items,
  setItems,
  companyName,
  checkUnsavedChanges,
  successMessage,
  setSuccessMessage,
  itemDetailsCopy,
  setItemDetailsCopy,
  setOldItemNo,
  setNewItemNo,
  unsavedChanges,
  setUnsavedChanges,
  url,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
      console.log("urllllllllllll mn l itemdetails", url);


  const [groupNames, setGroupNames] = useState([]);
  const [selectedGroupName, setSelectedGroupName] = useState(
    itemDetails.GroupName
  );
  const [selectedGroup, setSelectedGroup] = useState({
    GroupNo: itemDetails.GroupNo,
    GroupName: itemDetails.GroupName,
  });
  const [valMessage, setValMessage] = useState("");
  const handleValueUpdate = (field, updatedValue) => {
    if (field === "Tax" || field === "UPrice" || field === "Disc" || field === "Srv") {
      // Validate if the value is a number
      if (isNaN(updatedValue)) {
        setValMessage(`${field} must be a number`);
        return;
      }
    } else if (field === "KT1" || field === "KT2" || field === "KT3" || field === "KT4") {
      // Validate if the value has more than 2 characters
      if (updatedValue.length > 2) {
        setValMessage(`${field} must be at most 2 characters long`);
        return;
      }
    }

    setValMessage(""); // Clear validation message if no error

    if (field === "GroupName") {
      // For Select component
      setItemDetailsCopy((prev) => ({
        ...prev,
        GroupName: updatedValue.GroupName,
        GroupNo: updatedValue.GroupNo,
      }));
      setSelectedGroupName(updatedValue.GroupName);
      setSelectedGroup(updatedValue); // Also update the selected group object
    } else if (field === "Image") {
      // For file input
      const file = updatedValue.target.files[0];
      console.log("in handlee file ", file);
      setItemDetailsCopy((prev) => ({
        ...prev,
        [field]: file.name,
        GroupNo: selectedGroup?.GroupNo || "", // Set the GroupNo from the selectedGroup
      }));
    } else {
      // For TextField and other fields
      setItemDetailsCopy((prev) => ({
        ...prev,
        [field]: updatedValue,
        GroupNo: selectedGroup?.GroupNo || "", // Set the GroupNo from the selectedGroup
      }));
    }
  };

  useEffect(() => {
    if (JSON.stringify(itemDetailsCopy) !== JSON.stringify(itemDetails)) {
      setUnsavedChanges(true);
    } else {
      setUnsavedChanges(false);
    }
  }, [itemDetailsCopy, itemDetails, unsavedChanges]);

  useEffect(() => {
    // Fetch groupItems when the component mounts
    const fetchGroupItems = async () => {
      try {
        const response = await fetch(
          `${url}/pos/groupitems/${companyName}`
        );
        if (!response.ok) {
          throw new Error("Error fetching groupItems");
        }
        const data = await response.json();
        console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data);
        setGroupNames([...data]); // Assuming data is an array of objects with groupName and groupNo
      } catch (error) {
        console.error(error);
      }
    };

    fetchGroupItems();
  }, []);

  useEffect(() => {
    if (valMessage) {
      const timeout = setTimeout(() => {
        setValMessage("");
      }, 2000); // Adjust the duration as needed (in milliseconds)
      return () => clearTimeout(timeout);
    }
  }, [valMessage]);

  // Trigger handleSave when userDetailsCopy changes
  // useEffect(() => {
  //   handleSave();
  // }, [userDetailsCopy]);
  console.log("groupppppppppppppppppp", itemDetailsCopy);
  console.log("copyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", itemDetailsCopy);
  const rows = Object.entries(itemDetailsCopy)
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
            {key === "ItemName" ||
            key === "UPrice" ||
            key === "Disc" ||
            key === "Tax" ||
            key === "KT1" ||
            key === "KT2" ||
            key === "KT3" ||
            key === "KT4" ||
            key === "Ingredients" ? (
              <TextField
                value={value}
                onChange={(e) => handleValueUpdate(key, e.target.value)}
                fullWidth
                size="small"
                variant="outlined"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            ) : key === "ItemNo" ? (
              <TextField
                value={value}
                onChange={(e) => handleValueUpdate(key, e.target.value)}
                fullWidth
                size="small"
                variant="outlined"
                inputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  readOnly: true,
                }}
              />
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
            ) : key === "Image" ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => handleValueUpdate(key, e)}
                  id="inputFile"
                />
                {value && typeof value === "string" && (
                  <Typography variant="h4">{value}</Typography>
                )}
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  height: "100%",
                }}
              >
                <Select
                  sx={{ width: "100%", height: "100%", textAlign: "center" }}
                  value={selectedGroupName}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setSelectedGroupName(selectedValue);
                    const selectedGroupObject = groupNames.find(
                      (item) => item.GroupName === selectedValue
                    );
                    setSelectedGroup(selectedGroupObject);
                    handleValueUpdate(key, selectedGroupObject);
                  }}
                >
                  {groupNames !== undefined &&
                    groupNames.map((item) => (
                      <MenuItem key={item.GroupNo} value={item.GroupName}>
                        {item.GroupName}
                      </MenuItem>
                    ))}
                </Select>
              </div>
            )}
          </div>
        </TableCell>
      </TableRow>
    ));

  return (
    <Box style={{ height: "100%" }}>
      <style>
        {`
          #file-input {
            display: none;
          }
        `}
      </style>
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
      <Box sx={{height:"5%"}}>
        {valMessage && (
          <Typography
            variant="h1"
            color="error"
            style={{
              fontWeight: "bold",
            }}
          >
            {valMessage}
          </Typography>
        )}
      </Box>
      <Box
        sx={{
          minHeight: "10%",
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
          <Box sx={{ width: "5%", marginLeft: "auto", marginTop: "auto" }}>
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
                  itemDetails,
                  itemDetailsCopy,
                  setSuccessMessage,
                  setItemDetails,
                  setOldItemNo,
                  setNewItemNo,
                  url,
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

export default ItemDetails;
