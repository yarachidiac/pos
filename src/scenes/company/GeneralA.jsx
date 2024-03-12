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
import Checkbox from "@mui/material/Checkbox";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
const GeneralA = ({ companyName }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [companyDetails, setCompanyDetails] = useState({});
  const [companyDetailsCopy, setCompanyDetailsCopy] = useState({
    ...companyDetails,
  });
  const [unsavedChanges, setUnsavedChanges] = useState(false);

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
          `http://192.168.16.113:8000/company/${companyName}`
        );
        if (response.ok) {
          const data = await response.json();
          setCompanyDetails(data);
          setCompanyDetailsCopy(data);
        } else {
          console.error("Failed to fetch company details");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };
    fetchCompanyDetails();
  }, []);

  const handleSave = async () => {
    const saveResponse = await fetch(
      `http://192.168.16.113:8000/updateCompany/${companyName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyDetailsCopy),
      }
    );
    const mesData = await saveResponse.json();

    if (saveResponse.ok) {
      setCompanyDetails(companyDetailsCopy);
      setSuccessMessage(mesData.message);
    }
  };
  useEffect(() => {
    if (JSON.stringify(companyDetailsCopy) !== JSON.stringify(companyDetails)) {
      setUnsavedChanges(true);
    } else {
      setUnsavedChanges(false);
    }
  }, [companyDetailsCopy]);
console.log("uppppppppppppppppppppp", companyDetails);
console.log("copppppppp", companyDetailsCopy);
  const rows = Object.keys(companyDetailsCopy).map((key, index) => (
    <TableRow
      key={key}
      style={{
        width: window.innerWidth * 0.28,
        display: "flex",
        flexDirection: "row",
        height: window.innerHeight * 0.1,
        borderRadius: "4px",
        border: "1px solid #ccc",
      }}
    >
      <TableCell
        style={{
          width: "30%",
          height: "100%",
          whiteSpace: "pre-wrap",
          overflowWrap: "normal",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            maxHeight: "100%",
            width: "100%",
            alignItems: "start",
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
          {key === "Start Time" || key === "End Time" ? (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker
                value={dayjs(companyDetailsCopy[key])}
                onChange={(newValue) => handleValueUpdate(key, newValue)}
                size="small"
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            </LocalizationProvider>
          ) : (
            <TextField
              value={companyDetailsCopy[key]}
              onChange={(e) => handleValueUpdate(key, e.target.value)}
              fullWidth
              variant="outlined"
              size="small"
            />
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
                gridTemplateColumns: "repeat(2, 1fr)", // Adjust the number of columns
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
          {unsavedChanges && (
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
        unsavedChanges && (
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

export default GeneralA;
