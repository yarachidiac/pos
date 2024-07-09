import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import { tokens } from "../../theme";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import GeneralA from "./GeneralA"
import BackOffice from "./BackOffice";
import Keyboard from "../form/Keyboard";
import Language from "./Language";
import { useLanguage } from "../LanguageContext";
import translations from "../translations";


const Company = ({ companyName, url,activeField, setActiveField, showKeyboard, setShowKeyboard, companyDetails, setCompanyDetails, companyDetailsCopy, setCompanyDetailsCopy, error, setError }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedOption, setSelectedOption] = useState("general");
  const { language } = useLanguage();
  const getOptionLabel = (option) => {
    return (
      translations[language][option] ||
      option.charAt(0).toUpperCase() + option.slice(1)
    );
  };

  const modalStyle = {
    pl:"1%",
    background: colors.whiteblack[100],
    boxShadow: 24,
    minWidth: "90%",
    maxHeight: "90%",
    display: "flex",
    flexDirection: window.innerWidth < 650 ? "row" : "column",
    justifyContent: "center",
  };

  const modalContainerStyle = {
    // position: "relative",
    // overflow: "hidden", 
    //backgroundColor: "rgba(252, 252, 252, 0.92)",
  };

  const largerModalStyle = {
    width: "90%",
    //maxWidth: 800,
  };

  const heightModalStyle = {
    width: "100%",
    minHeight: "60%", // Set the fixed height for smaller screens
    maxHeight: "80%", // Adjust the maximum height as needed
  };

  const appbarContentStyle = {
    display: "flex",
    gap: "1px",
    width: "100%",
    //backgroundColor: colors.greenAccent[600],
  };

  const appBarStyle = {
    background: colors.whiteblack[100],
    //background: "#fcfcfc",
    //background: "#F8FBF8",
    borderRadius: "0px",
    height: "30%",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Center the content vertically
    padding: "0px", // Remove padding
  };

  const listItemStyle = {
    width: "100%",
    flex: "1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center", // Center the content vertically
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const renderSelectedTable = () => {
    switch (selectedOption) {
      case "general":
        return (
          <GeneralA
            companyName={companyName}
            url={url}
            activeField={activeField}
            setActiveField={setActiveField}
            showKeyboard={showKeyboard}
            setShowKeyboard={setShowKeyboard}
            companyDetails={companyDetails} setCompanyDetails={setCompanyDetails}
            companyDetailsCopy={companyDetailsCopy} setCompanyDetailsCopy={setCompanyDetailsCopy}
            error={error} setError={setError}
          />
        );
      case "back-office":
        return <BackOffice />;
      case "language":
        return <Language/>
      // Add more cases for each option
      default:
        return null;
    }
  };
  
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          ...modalStyle,
          ...(window.innerWidth > 650 ? largerModalStyle : heightModalStyle),
          ...modalContainerStyle,
        }}
      >
        <Box display="flex" justifyContent="space-between">
          {/* <Box sx={{ p: "2%" }}>
            <Typography variant="h3" style={{ fontWeight: "1.1rem" }}>
              {userDetails.username}
            </Typography>
          </Box> */}
        </Box>
        <Box sx={appBarStyle}>
          <Toolbar sx={{ width: "100%" }}>
            <List sx={appbarContentStyle}>
              {[
                "general",
                "back-office",
                "accounting-numbers",
                "accounting-options",
                "language",
                "pos-options",
                "export-files",
              ].map((option) => (
                <Box
                  key={option}
                  sx={{
                    flex: "1",
                    display: "flex",
                    //justifyContent: "center",
                    "& .MuiButtonBase-root": {
                      fontSize: "1.1rem",
                      fontWeight: "700",
                    },
                  }}
                >
                  <Button
                    key={option}
                    onClick={() => handleOptionChange(option)}
                    style={{
                      ...listItemStyle,
                      //variant:"contained",
                      background:
                        selectedOption === option
                          ? colors.greenAccent[600]
                          : colors.grey[700],
                      color:
                        selectedOption === option ? colors.primary[500] : "",
                    }}
                  >
                    {getOptionLabel(option)}
                  </Button>
                </Box>
              ))}
            </List>
          </Toolbar>
        </Box>
        <Box
          sx={{
            flexGrow: 1, // Allow the table to grow and take available space
            width: window.innerWidth < 650 ? "60%" : "100%",
            //maxHeight: "60%",
            height: "500px",
            //overflowY: "auto",
          }}
        >
          {renderSelectedTable()}
        </Box>
      </Box>   
    </Box>
  );
};

export default Company;
