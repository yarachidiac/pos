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
import Checkbox from "@mui/material/Checkbox";

const GroupDetails = ({
  groupDetails,
  setGroupDetails,
  groups,
  setGroups,
  companyName,
  checkUnsavedChanges,
  successMessage,
  setSuccessMessage,
  groupDetailsCopy,
  setGroupDetailsCopy,
  setOldItemNo,
  setNewItemNo,
  unsavedChanges,
  setUnsavedChanges,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [valMessage, setValMessage] = useState("");
  const handleValueUpdate = (field, updatedValue) => {
    if (field === "GroupName" || field === "GroupNo") {
      // For Select component
      setGroupDetailsCopy((prev) => ({
        ...prev,
        [field]: updatedValue,
      }));
    } else if (field === "Image") {
      // For file input
      const file = updatedValue.target.files[0];
      console.log("in handlee file ", file);
      setGroupDetailsCopy((prev) => ({
        ...prev,
        [field]: file.name,
      }));
    }
  };

  useEffect(() => {
    if (JSON.stringify(groupDetailsCopy) !== JSON.stringify(groupDetails)) {
      setUnsavedChanges(true);
    } else {
      setUnsavedChanges(false);
    }
  }, [groupDetailsCopy, groupDetails, unsavedChanges]);

  return (
    <Box style={{ height: "100%" }}>
      <style>
        {`
          #file-input {
            display: none;
          }
        `}
      </style>
      <TableContainer
        style={{ height: "50%", overflowY: "auto", width: "100%" }}
      >
        <Table>
          <TableBody
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)", // Adjust the number of columns
              gap: "5px",
            }}
          >
            <TableRow>
              <TableCell style={{ maxWidth: "10%" }}>
                <Box>
                  <Typography variant="h4">GroupNo</Typography>
                </Box>
              </TableCell>
              <TableCell style={{ maxWidth: "30%" }}>
                <TextField
                  value={groupDetailsCopy.GroupNo}
                  onChange={(e) => handleValueUpdate("GroupNo", e.target.value)}
                  fullWidth
                  size="small"
                  variant="outlined"
                  inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={{ maxWidth: "10%" }}>
                <Box>
                  <Typography variant="h4">GroupName</Typography>
                </Box>
              </TableCell>
              <TableCell style={{ maxWidth: "30%" }}>
                <TextField
                  value={groupDetailsCopy.GroupName}
                  onChange={(e) =>
                    handleValueUpdate("GroupName", e.target.value)
                  }
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell style={{ maxWidth: "10%" }}>
                <Box>
                  <Typography variant="h4">Image</Typography>
                </Box>
              </TableCell>
              <TableCell>
                <div>
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => handleValueUpdate("Image", e)}
                    id="inputFile"
                  />
                  {/* Render the value only if it's a string */}
                  {typeof groupDetailsCopy.Image === "string" && (
                    <Typography variant="h4">
                      {groupDetailsCopy.Image}
                    </Typography>
                  )}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ height: "10%" }}>
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
          minHeight: "25%",
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
                  groupDetails,
                  groupDetailsCopy,
                  setSuccessMessage,
                  setGroupDetails,
                  setOldItemNo,
                  setNewItemNo
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

export default GroupDetails;
