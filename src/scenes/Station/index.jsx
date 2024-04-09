import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import StatSet from "./StatSet";

const Station = ({ companyName }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const modalStyle = {
    marginLeft: "5%",
    background: colors.whiteblack[100],
    boxShadow: 24,
    pt: 0, // Set top padding to 2
    pr: 2, // Set right padding to 3
    pb: 2, // Set bottom padding to 3
    pl: 2, // Set left padding to 3
    minWidth: "90%",
    maxHeight: "90%",
    display: "flex",
    flexDirection: window.innerWidth < 650 ? "row" : "column",
  };

  const modalContainerStyle = {
    position: "relative",
    overflow: "hidden", // Hide overflow from the Drawer
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

  return (
    <Box
      sx={{
        ...modalStyle,
        ...(window.innerWidth > 650 ? largerModalStyle : heightModalStyle),
        ...modalContainerStyle,
      }}
    >
      <Box
        sx={{
          flexGrow: 1, // Allow the table to grow and take available space
          width: window.innerWidth < 650 ? "60%" : "100%",
          //maxHeight: "60%",
          height: "500px",
          //overflowY: "auto",
        }}
      >
        <StatSet companyName={companyName}/>
      </Box>
    </Box>
  );
};
export default Station;
