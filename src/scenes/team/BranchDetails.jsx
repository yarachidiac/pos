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

export default function BranchDetails(props) {
  const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    console.log("poppppp", props.branchDetailsCopy);

  const [successMessage, setSuccessMessage] = useState("");


  const handleSave = async () => {
    const saveResponse = await fetch(
      `${props.url}/pos/updateBranch/${props.companyName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.branchDetailsCopy),
      }
    );
    const mesData = await saveResponse.json();

    if (saveResponse.ok) {
      props.setBranchDetails(props.branchDetailsCopy);
      setSuccessMessage(mesData.message);
    }
  };

  useEffect(() => {
    if (props.tickKey) {
      const [field, index] = props.activeField.split("-");
    //   handleValueUpdate(parseInt(index, 10), field, props.inputValue);
    }
  }, [props.tickKey]);

  useEffect(() => {
    if (
      JSON.stringify(props.branchDetailsCopy) !==
      JSON.stringify(props.branchDetails)
    ) {
      props.setUnsavedChanges(true);
    } else {
      props.setUnsavedChanges(false);
    }
  }, [props.branchDetailsCopy]);

  const rows = props.branchDetailsCopy.map((item, index) =>
    Object.entries(item).map(([key, value]) => (
      <TableRow key={key}>
        <TableCell>
          <Typography variant="h4">{key}</Typography>
        </TableCell>
        <TableCell>
          <Box sx={{ width: "300px" }}>
            <TextField
              fullWidth
              value={value}
              // onChange={(e) => handleValueUpdate(index, "Code", e.target.value)}
              onDoubleClick={() => {
                props.setInputValue("");
                props.setShowKeyboard(true);
              }}
              onFocus={() => {
                props.setActiveField(key);
              }}
            />
          </Box>
        </TableCell>
      </TableRow>
    ))
  );

  return (
    <Box style={{ height: "100%" }}>
      <TableContainer style={{ height: "90%", overflowY: "auto" }}>
        <Table>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          minHeight: "10%",
          width: "100%",
          justifyContent: "space-between",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "90%" }}>
          {successMessage && (
            <Typography variant="h3" style={{ color: colors.greenAccent[500] }}>
              {successMessage}
            </Typography>
          )}
        </Box>
        {props.unsavedChanges && (
          <Box sx={{ width: "10%", marginLeft: "auto" }}>
            <Button
              variant="contained"
              color="secondary"
              style={{ fontSize: "1.1rem" }}
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}
