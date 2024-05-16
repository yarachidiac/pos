// Inside your Keyboard component
import React, { useState } from "react";
import Draggable from "react-draggable";
import { Button, Box, Grid } from "@mui/material";

const Keyboard = ({ onKeyPress }) => {
  const [language, setLanguage] = useState("english");
  const [capsLock, setCapsLock] = useState(false);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === "english" ? "arabic" : "english"
    );
  };

  const toggleCapsLock = () => {
    setCapsLock((prevCapsLock) => !prevCapsLock);
  };

  const handleKeyPress = (input) => {
    onKeyPress(input); // Pass the input to the parent component
  };

  const renderKeys = () => {
    const englishKeys = [
      ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
      ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
    ];

    const arabicKeys = [
      ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح"],
      ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م", "ك"],
      ["ئ", "ء", "ؤ", "ر", "لا", "ى", "ة", "و", "ز", "ظ"],
    ];

    const keys = language === "english" ? englishKeys : arabicKeys;

    return keys.map((row, rowIndex) => (
      <Grid container key={rowIndex} spacing={1} justifyContent="center">
        {row.map((key) => (
          <Grid item key={key}>
            <Button
              variant="contained"
              size="large"
              sx={{ fontSize: "1.5rem" }} // Increased font size for better visibility
              onClick={() => handleKeyPress(capsLock ? key.toUpperCase() : key)}
            >
              {capsLock ? key.toUpperCase() : key}
            </Button>
          </Grid>
        ))}
      </Grid>
    ));
  };

  const renderNumbersAndControls = () => (
    <Grid container spacing={1} justifyContent="center">
      {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "✔️"].map(
        (key) => (
          <Grid item xs={4} key={key}>
            <Button
              variant="contained"
              size="large"
              sx={{ fontSize: "1.5rem" }} // Increased font size for better visibility
              onClick={() => handleKeyPress(key)}
            >
              {key}
            </Button>
          </Grid>
        )
      )}
    </Grid>
  );

  const renderSpecialKeys = () => (
    <Grid container spacing={1} justifyContent="center">
      {[" ", "@", ".com", "'", "*", ":", "CapsLock", ";"].map((key) => (
        <Grid item key={key}>
          <Button
            variant="contained"
            size="large"
            onClick={
              key === "CapsLock" ? toggleCapsLock : () => handleKeyPress(key)
            }
            sx={{ fontSize: "1.5rem" }} // Increased font size for better visibility
          >
            {key}
          </Button>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Draggable>
      <Box
        sx={{
          border: "1px solid #333", // Changed border color to a darker shade
          borderRadius: "8px",
          padding: "16px",
          backgroundColor: "#f2f2f2", // Changed background color to a lighter shade
          width: "fit-content",
          userSelect: "none",
        }}
      >
        <Grid container spacing={1} justifyContent="center">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setLanguage("english")}
            >
              English
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setLanguage("arabic")}
            >
              Arabic
            </Button>
          </Grid>
        </Grid>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              {renderKeys()}
              <Box mt={2}>{renderSpecialKeys()}</Box>
            </Grid>
            <Grid item xs={3}>
              {renderNumbersAndControls()}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Draggable>
  );
};

export default Keyboard;
