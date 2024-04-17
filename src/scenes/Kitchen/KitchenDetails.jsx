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
import { Select, MenuItem } from "@mui/material";

export default function KitchenDetails(props){
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  const [successMessage, setSuccessMessage] = useState("");

  // Function to handle value update
  const handleValueUpdate = (index, field, updatedValue) => {
  props.setKitchenDetailsCopy((prev) => {
    const updatedDetails = prev.map((detail, i) => {
      if (i === index) {
        // Create a new object to ensure immutability
        return {
          ...detail,
          [field]: updatedValue,
        };
      }
      return detail;
    });
    return updatedDetails;
  });
};


    console.log("wwwwwwwwwwwwww", props.kitchenDetailsCopy);
      console.log("ffffffffffffffffffff", props.kitchenDetails);

  const handleSave = async () => {
    const saveResponse = await fetch(
      `http://192.168.16.113:8000/updateKitchen/${props.companyName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props.kitchenDetailsCopy),
      }
    );
    console.log("wwwwwwwwwwwwww", props.kitchenDetailsCopy);
      const mesData = await saveResponse.json();
      console.log("ffffffffffffffffffff", props.kitchenDetails);

    if (saveResponse.ok) {
      props.setKitchenDetails(props.kitchenDetailsCopy);
      setSuccessMessage(mesData.message);
    }
  };
  useEffect(() => {
    if (
      JSON.stringify(props.kitchenDetailsCopy) !==
      JSON.stringify(props.kitchenDetails)
    ) {
      console.log(
        "ana bl if compare",
        JSON.stringify(props.kitchenDetailsCopy)
      );
      console.log("ana bl if compare", JSON.stringify(props.kitchenDetails));

      props.setUnsavedChanges(true);
    } else {
      console.log(
        "ana bl if compare",
        JSON.stringify(props.kitchenDetailsCopy)
      );
      console.log("ana bl if compare", JSON.stringify(props.kitchenDetails));
      console.log("ana bl else compare");
      props.setUnsavedChanges(false);
    }
  }, [props.kitchenDetailsCopy]);
  console.log("uppppppppppppppppppppp", props.kitchenDetails);
  console.log("copppppppp", props.kitchenDetailsCopy);
  const printerOptions = ["Printer 1", "Printer 2", "Printer 3"]; // Example printer options
  const reportOptions = ["Report 1", "Report 2", "Report 3"]; // Example report options
  const rows = props.kitchenDetailsCopy.map((detail, index) => (
    <TableRow key={index}>
      <TableCell>
        <Typography variant="h4">KT{detail.KT}</Typography>
      </TableCell>
      <TableCell>
        <Box sx={{ width: "500px" }}>
          <Select
            value={detail.PrinterName}
            onChange={(e) =>
              handleValueUpdate(index, "PrinterName", e.target.value)
            }
            fullWidth
            variant="outlined"
            size="small"
          >
            {props.prList.map((printer, index) => (
              <MenuItem key={index} value={printer.printername}>
                {printer.printername}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ width: "500px" }}>
          <Select
            value={detail.ReportName}
            onChange={(e) =>
              handleValueUpdate(index, "ReportName", e.target.value)
            }
            fullWidth
            variant="outlined"
            size="small"
          >
            {reportOptions.map((report, index) => (
              <MenuItem key={index} value={report}>
                {report}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </TableCell>
    </TableRow>
  ));

  return (
    <Box style={{ height: "100%" }}>
      <TableContainer style={{ height: "90%", overflowY: "auto" }}>
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
          {props.unsavedChanges && (
            <Box sx={{ minWidth: "5%" }}>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  //background: colors.greenAccent[600],
                  fontSize: "1.1rem",
                }}
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        props.unsavedChanges && (
          <Box sx={{ width: "10%", marginTop: 2, marginLeft: "auto" }}>
            <Button
              style={{
                fontSize: "1.1rem",
              }}
              variant="contained"
              color="secondary"
              onClick={handleSave}
            >
              Save
            </Button>
          </Box>
        )
      )}
    </Box>
  );
};
