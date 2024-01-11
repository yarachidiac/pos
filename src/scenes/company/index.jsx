import React, { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import General from "./General";
import AccountingOptions from "./AccountingOptions";
import AccNumbers from "./AccNumbers";
import BackOffice from "./BackOffice";
import POSOptions from "./POSOptions";
import Language from "./Language";
import { tokens } from "../../theme";
import ExportFiles from "./ExportFiles";


const Company = ({ companyName,  }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedOption, setSelectedOption] = useState("general");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [companyDetails, setCompanyDetails] = useState(null);

  const modalStyle = {
    position: "relative",
    top: 20,
    left: 50,
    bottom: 20,
    right: 20,
    minWidth: 600,
    minHeight: 620,
    display: "flex",
    bgcolor: colors.primary["400"],
    boxShadow: 8,
    flexDirection: window.innerWidth < 650 ? "row" : "column",
    
  };

  const modalContainerStyle = {
    overflow: "hidden", // Hide overflow from the Drawer
  };

  const largerModalStyle = {
    //width: "90%",
    maxWidth: "90%",
  
  };

  const heightModalStyle = {
    minWidth: "90%",
    //maxHeight: "80%", // Adjust the maximum height as needed
  };


  const appBarStyle = {
    bgcolor: colors.grey[600],
    borderRadius: "4px 4px 4px 4px",
   width: "100%"
  };

  const toolbarStyle = {
    display: "flex",
      justifyContent: "space-between",
    //padding: theme.spacing(2),
    "& .css-9ex7vj-MuiTypography-root": {
      fontSize: "1.1rem",
      fontWeight: "600",
      },
      width: "100%",

  };

    const appBarContainer = {
      minWidth: "15%",
    };

  const appbarContentStyle = {
    display: "flex",
    gap: theme.spacing(1), // Adjust the gap between items
      //overflowX: "auto", // Enable horizontal scrolling
   
  };

  const drawerContainerStyle = {
    // Adjust the width as needed
    //background: colors.primary[400],
    width: "30%",
    ".css-15b8vjn-MuiPaper-root-MuiDrawer-paper": {
      position: "relative",
      background: colors.primary[400],
    },
    ".css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
      background: colors.primary[400],
      position: "relative",
    },
  };

  const drawerListStyle = {
    background: colors.primary[400],
    "& .MuiListItem-root": {
      gap: theme.spacing(1), // Adjust the gap between items
      display: "flex",

       justifyContent: "space-between",
      //position: "relative"
    },
    };
    

    const handleOptionChange = (option) => {
      setSelectedOption(option);
    };

    const renderSelectedTable = () => {
      switch (selectedOption) {
        case "general":
              return (
                <General
                  companyName={companyName}
                  // companyDetails={companyDetails}
                  // setCompanyDetails={setCompanyDetails}
                />
              );
        case "Accounting-Options":
          return <AccountingOptions />;
        case "Accounting-Numbers":
          return <AccNumbers />;
        case "Back-Office":
          return <BackOffice />;
        case "POS-Options":
          return <POSOptions />;
        case "Language":
          return <Language />;
        case "Export-Files":
          return <ExportFiles />;
        default:
          return null;
      }
    };


    // useEffect(() => {
    //   const fetchCompanyDetails = async () => {
    //     try {
    //       const response = await fetch(
    //         `http://192.168.16.133:8000/company/${companyName}`
    //       );
    //       if (response.ok) {
    //         const data = await response.json();
    //         setCompanyDetails(data);
    //       } else {
    //         console.error("Failed to fetch company details");
    //       }
    //     } catch (error) {
    //       console.error("Error during fetch:", error);
    //     }
    //   };

    //   // Fetch company details when the component mounts
    //   fetchCompanyDetails();
    // }, [companyName]);


  return (
    <Box
      sx={{
        ...modalStyle,
        ...(window.innerWidth > 650 ? largerModalStyle : heightModalStyle),
        ...modalContainerStyle,
      }}
    >
      {/* Drawer Container */}
      {window.innerWidth <= 650 ? (
        <Box sx={drawerContainerStyle}>
          <Drawer
            variant="permanent"
            anchor="left"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <List sx={{ drawerListStyle }}>
              <ListItem
                button
                onClick={() => handleOptionChange("general")}
                sx={{
                  color:
                    selectedOption === "general"
                      ? colors.greenAccent[400]
                      : colors.grey[100],
                }}
              >
                <ListItemText primary="General" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleOptionChange("Back-Office")}
                sx={{
                  color:
                    selectedOption === "Back-Office"
                      ? colors.greenAccent[400]
                      : colors.grey[100],
                }}
              >
                <ListItemText primary="Back Office" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleOptionChange("Accounting-Numbers")}
                sx={{
                  color:
                    selectedOption === "Accounting-Numbers"
                      ? colors.greenAccent[400]
                      : colors.grey[100],
                }}
              >
                <ListItemText primary="Accounting Numbers" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleOptionChange("Accounting-Options")}
                sx={{
                  color:
                    selectedOption === "Accounting-Options"
                      ? colors.greenAccent[400]
                      : colors.grey[100],
                }}
              >
                <ListItemText primary="Accounting Options" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleOptionChange("Language")}
                sx={{
                  color:
                    selectedOption === "Language"
                      ? colors.greenAccent[400]
                      : colors.grey[100],
                }}
              >
                <ListItemText primary="Language" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleOptionChange("POS-Options")}
                sx={{
                  color:
                    selectedOption === "POS-Options"
                      ? colors.greenAccent[400]
                      : colors.grey[100],
                }}
              >
                <ListItemText primary="POS Options" />
              </ListItem>
              <ListItem
                button
                onClick={() => handleOptionChange("Export-Files")}
                sx={{
                  color:
                    selectedOption === "Export-Files"
                      ? colors.greenAccent[400]
                      : colors.grey[100],
                }}
              >
                <ListItemText primary="Export Files" />
              </ListItem>
              {/* Add more list items for each route */}
            </List>
          </Drawer>
        </Box>
      ) : (
        <Box sx={appBarContainer}>
          <AppBar position="" sx={appBarStyle}>
            <Toolbar sx={toolbarStyle}>
               <Box sx={{ width: "inherit" }}>
                <List sx={appbarContentStyle}>
                  <ListItem
                    button
                    onClick={() => handleOptionChange("general")}
                    sx={{
                      color:
                        selectedOption === "general"
                          ? colors.greenAccent[400]
                          : colors.grey[100],
                    }}
                  >
                    <ListItemText primary="General" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => handleOptionChange("Back-Office")}
                    sx={{
                      color:
                        selectedOption === "Back-Office"
                          ? colors.greenAccent[400]
                          : colors.grey[100],
                    }}
                  >
                    <ListItemText
                      primary="Back Office"
                      sx={{
                        "& .MuiTypography-root": {
                          variant: "h2", // or "h6" or any other valid variant
                        },
                      }}
                    />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => handleOptionChange("Accounting-Numbers")}
                    sx={{
                      color:
                        selectedOption === "Accounting-Numbers"
                          ? colors.greenAccent[400]
                          : colors.grey[100],
                    }}
                  >
                    <ListItemText primary="Accounting Numbers" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => handleOptionChange("Accounting-Options")}
                    sx={{
                      color:
                        selectedOption === "Accounting-Options"
                          ? colors.greenAccent[400]
                          : colors.grey[100],
                    }}
                  >
                    <ListItemText primary="Accounting Options" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => handleOptionChange("Language")}
                    sx={{
                      color:
                        selectedOption === "Language"
                          ? colors.greenAccent[400]
                          : colors.grey[100],
                    }}
                  >
                    <ListItemText primary="Language" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => handleOptionChange("POS-Options")}
                    sx={{
                      color:
                        selectedOption === "POS-Options"
                          ? colors.greenAccent[400]
                          : colors.grey[100],
                    }}
                  >
                    <ListItemText primary="POS Options" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => handleOptionChange("Export-Files")}
                    sx={{
                      color:
                        selectedOption === "Export-Files"
                          ? colors.greenAccent[400]
                          : colors.grey[100],
                    }}
                  >
                    <ListItemText primary="Export Files" />
                  </ListItem>
                </List>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      )}
      <Box
        sx={{
          flexGrow: 1, // Allow the table to grow and take available space
          width: window.innerWidth < 650 ? "70%" : "100%",
        }}
      >
        {renderSelectedTable()}
      </Box>

      {/* Other modal content */}
    </Box>
  );
};

export default Company;
