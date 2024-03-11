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
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [groupNames, setGroupNames] = useState([]);
  const [selectedGroupName, setSelectedGroupName] = useState(
    itemDetails.GroupName
  );
  const [selectedGroup, setSelectedGroup] = useState({
    GroupNo: itemDetails.GroupNo,
    GroupName: itemDetails.GroupName,
  });


  const handleValueUpdate = (field, updatedValue) => {
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
          `http://192.168.16.113:8000/groupitems/${companyName}`
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
            {key === "ItemNo" ||
            key === "ItemName" ||
            key === "UPrice" ||
            key === "Disc" ||
            key === "Tax" ||
            key === "KT1" ||
            key === "KT2" ||
            key === "KT3" ||
            key === "KT4" ? (
              <TextField
                value={value}
                onChange={(e) => handleValueUpdate(key, e.target.value)}
                fullWidth
                size="small"
                variant="outlined"
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
                    itemDetails,
                    itemDetailsCopy,
                    setItems,
                    setSuccessMessage,
                    setItemDetails,
                    setOldItemNo,
                    setNewItemNo,
                    setItemDetailsCopy
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
                  itemDetails,
                  itemDetailsCopy,
                  setItems,
                  setSuccessMessage,
                  setItemDetails,
                  setOldItemNo,
                  setNewItemNo,
                  setItemDetailsCopy
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

export default ItemDetails;
