import React, { useState } from "react";
import Draggable from "react-draggable";
import {
  Button,
  Box,
  Grid,
  TextField,
  IconButton,
  Typography,
  useTheme,
  Select,
  MenuItem,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { tokens } from "../../theme";
const Keyboard = ({
  onKeyPress,
  setShowKeyboard,
  showKeyboard,
  activeField,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [language, setLanguage] = useState("english");
  const [capsLock, setCapsLock] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === "english" ? "arabic" : "english"
    );
  };

  const toggleCapsLock = () => {
    console.log("ana fetett");
    setCapsLock((prevCapsLock) => !prevCapsLock);
  };

  const handleSelectChange = (event) => {
          setInputValue((prevValue) => prevValue + event.target.value);

  };

  const handleKeyPress = (input) => {
    // if (input === "CapsLock") {
    //   toggleCapsLock();
    // } else
      if (input === "Backspace" || input === "BACKSPACE") {
      setInputValue((prevValue) => prevValue.slice(0, -1));
    } else {
      setInputValue((prevValue) => prevValue + input);
    }
  };

  const handleSaveInput = () => {
    setInputValue("");
    setShowKeyboard(!showKeyboard);
    onKeyPress(inputValue);
  };

  const handleCloseKeyboard = () => {
    setShowKeyboard(!showKeyboard);
  };
  console.log("ana el capslock", capsLock);

  const renderKeys = () => {
    const englishKeys = [
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "Backspace",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      ";",
      "{",
      "}",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      "&",
      "'",
      "~",
      "CapsLock",
      ":",
      "/",
      "\\",
      " ",
      "*",
      "@",
      ".com", "List E-Mails Server"
    ];

    const arabicKeys = [
      "ض",
      "ص",
      "ث",
      "ق",
      "ف",
      "غ",
      "ع",
      "ه",
      "خ",
      "ح",
      "Backspace",
      "ش",
      "س",
      "ي",
      "ب",
      "ل",
      "ا",
      "ت",
      "ن",
      "م",
      ";",
      "{",
      "}",
      "ئ",
      "ء",
      "ؤ",
      "ر",
      "لا",
      "ى",
      "ة",
      "و",
      "ز",
      "ظ",
      ",",
      "&",
      ".",
      "~",
      "CapsLock",
      ":",
      "/",
      "\\",
      " ",
      "*",
      "@",
      ".com",
    ];

    const keys = language === "english" ? englishKeys : arabicKeys;

    return (
      console.log("ana b aleb l render", capsLock),
      (
        <Grid container spacing={1} justifyContent="center">
          {keys.map(
            (key, keyIndex) => (
              console.log("ana l upper", key.toUpperCase()),
              (
                <Grid
                  item
                  key={key}
                  xs={
                    key === " "
                      ? 4
                      : key === "CapsLock" ||
                        key === "Backspace" ||
                        key === "List E-Mails Server"
                      ? 2
                      : 1
                  }
                >
                  {key !== "List E-Mails Server" && (
                    <Button
                      size="large"
                      sx={{
                        fontSize: "1.25rem",
                        margin: "4px",
                        height: "3rem",
                        backgroundColor: "#f0f0f0",
                        color: "#333",
                        borderRadius: "8px",
                        //flex: "1",
                        width: "100%",
                        textTransform:
                          capsLock && key.length === 1 ? "uppercase" : "none",
                      }}
                      onClick={() =>
                        key === "CapsLock"
                          ? toggleCapsLock()
                          : handleKeyPress(capsLock ? key.toUpperCase() : key)
                      }
                    >
                      {key}
                    </Button>
                  )}
                  {key === "List E-Mails Server" && (
                    <Select
                      value="List E-Mails Server"
                      onChange={handleSelectChange}
                      sx={{
                        fontSize: "1.25rem",
                        // margin: "4px",
                        height: "3rem",
                        backgroundColor: "#f0f0f0",
                        color: "#333",
                        borderRadius: "8px",
                        width:"100%"
                      }}
                    >
                      <MenuItem value="@hotmail.com">@hotmail.com</MenuItem>
                      <MenuItem value="@gmail.com">@gmail.com</MenuItem>
                    </Select>
                  )}
                </Grid>
              )
            )
          )}
        </Grid>
      )
    );
  };

  const renderNumbersAndControls = () => (
    <Grid container spacing={1} justifyContent="center">
      {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].map(
        (key, index) => (
          <Grid item key={key} xs={4}>
            <Button
              variant="contained"
              size="large"
              fullWidth
              sx={{
                fontSize: "1.5rem",
                margin: "4px",
                height: "4rem",
                width: "100%",
                backgroundColor: "#f0f0f0",
                color: "#333",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#d4d4d4",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => handleKeyPress(key)}
            >
              {key}
            </Button>
          </Grid>
        )
      )}
    </Grid>
  );

  // const renderSpecialKeys = () => (
  //   <Grid container spacing={1} >
  //     {["@", ".com", "'", "*", " ", ":", ";", "CapsLock"].map((key, index) => (
  //       <Grid
  //         item
  //         key={key}
  //         xs={key === " " ? 4 : key === "CapsLock" ?
  //         2 : "auto"}
  //       >
  //         <Button
  //           variant="contained"
  //           size="large"
  //           onClick={
  //             key === "CapsLock" ? toggleCapsLock : () => handleKeyPress(key)
  //           }
  //           sx={{
  //             fontSize: "1.25rem",
  //             margin: "4px",
  //             height: "3rem",
  //             backgroundColor: "#f0f0f0",
  //             color: "#333",
  //             borderRadius: "8px",
  //             width: key === " " || key === "CapsLock" ? "100%" : "4rem",
  //             "&:hover": {
  //               backgroundColor: "#d4d4d4",
  //             },
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "center",
  //           }}
  //         >
  //           {key === " " ? "SPACE" : key.toUpperCase()}
  //         </Button>
  //       </Grid>
  //     ))}
  //   </Grid>
  // );

  return (
    <Draggable>
      <Box
        sx={{
          border: "2px solid #333",
          borderRadius: "12px",
          padding: "16px",
          backgroundColor: "#fafafa",
          width: "fit-content",
          userSelect: "none",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Grid
          container
          spacing={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Typography
              color="primary"
              variant="h1"
              // sx={{
              //   fontSize: "1rem",
              //   padding: "8px 16px",
              // }}
            >
              Data Entry for {activeField}
            </Typography>
          </Grid>

          <Grid item>
            <Button
              onClick={() => setLanguage("english")}
              sx={{
                fontSize: "1rem",
                padding: "8px 16px",
                marginLeft: "16px",
                color: language === "english" ? colors.primary[500] : "black",
                backgroundColor:
                  language === "english"
                    ? colors.greenAccent[500]
                    : colors.primary[500],
                "&:hover": {
                  background: colors.greenAccent[500],
                  color: colors.primary[500],
                },
              }}
            >
              ENGLISH
            </Button>
            <Button
              onClick={() => setLanguage("arabic")}
              sx={{
                fontSize: "1rem",
                padding: "8px 16px",
                marginLeft: "16px",
                color: language === "arabic" ? colors.primary[500] : "black",
                backgroundColor:
                  language === "arabic"
                    ? colors.greenAccent[500]
                    : colors.primary[500],
                "&:hover": {
                  background: colors.greenAccent[500],
                  color: colors.primary[500],
                },
              }}
            >
              ARABIC
            </Button>
            <IconButton
              color="secondary"
              onClick={handleCloseKeyboard}
              sx={{
                fontSize: "2rem",
                backgroundColor: "#f44336",
                color: "#fff",
                marginLeft: "16px",
                "&:hover": {
                  backgroundColor: "#e53935",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container spacing={1} alignItems="center" justifyContent="center">
          <Grid item xs={10}>
            <TextField
              value={inputValue}
              fullWidth
              variant="outlined"
              margin="normal"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ccc",
                  },
                  "&:hover fieldset": {
                    borderColor: "#aaa",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#333",
                  },
                },
              }}
            />
          </Grid>
          <Grid item>
            <IconButton
              color="primary"
              onClick={handleSaveInput}
              sx={{
                fontSize: "2rem",
                backgroundColor: "#4caf50",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#45a049",
                },
              }}
            >
              <CheckIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              {renderKeys()}
              {/* <Box mt={2}>{renderSpecialKeys()}</Box> */}
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
