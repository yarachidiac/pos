import { Modal, Box } from "@mui/material";
import ChartAcc from "../ChartAcc";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import Button from "@mui/material/Button";
import AddUserDialog from "../team/AddUserDialog";
import Header from "../../components/Header";
import { useState } from "react";

const DelModal = ({
  isOpenDel,
  companyName,
  setIsOpenDel,
  selectedRow,
  setSelectedRow,
  addTitle,
  setAddTitle,
  url,
  activeField,
  setActiveField,
  showKeyboard,
  setShowKeyboard,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = () => {
    setIsOpenDel(false);
  };

  const modalStyle = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: colors.whiteblack[100],
    //background: "#FFFEFC",
    //backgroundColor: "#fcfcfc",
    boxShadow: 24,
    pt: 0, // Set top padding to 2
    pr: 2, // Set right padding to 3
    pb: 2, // Set bottom padding to 3
    pl: 2, // Set left padding to 3
    //width: "100%",
    minWidth: "90%",
    height: "100%", // Set a minimum height for smaller screens
    //maxHeight: "90%", // Set a maximum height for smaller screens
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
  const iconButtonStyle = {
    // Other styles..
    width: "5%",
    heigh:"5%",
    display: "flex",
    color: colors.greenAccent[500],
    ...(window.innerWidth < 650
      ? {
          position: "absolute",
          top: "8px",
          right: "8px",
        }
      : {
          position: "relative",
        }),
    marginLeft: "auto", // Push the button to the right
    // Other styles...
  };

 const handleAddUser = (title) => {
   setAddTitle(title);
   // Open the modal when "Add" button is clicked
   setIsDialogOpen(true);
 };

  return (
    <Modal open={isOpenDel} onClose={handleClose}>
      <Box
        sx={{
          ...modalStyle,
          ...(window.innerWidth > 650 ? largerModalStyle : heightModalStyle),
          ...modalContainerStyle,
        }}
      >
        <Box
          sx={{
            justifyContent: "space-between",
            display: "flex",
            height: "10%",
            mt: "1%",
            ml: "2%",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Header title="Client" />
          </Box>
          <Box
            sx={
              {
                //width: "10%",
              }
            }
          >
            <Button
              variant="contained"
              color="secondary"
              style={{ fontSize: "1.1rem" }}
              onClick={() => setSelectedRow(null)}
            >
              Clear
            </Button>
          </Box>
          <Box
            sx={
              {
                // width: "5%",
              }
            }
          >
            <Button
              variant="contained"
              color="secondary"
              style={{ fontSize: "1.1rem" }}
              onClick={() => handleAddUser("Add Client")}
            >
              Add
            </Button>
          </Box>
          <Box
            sx={{
              mr: "2%",
            }}
          >
            <IconButton edge="end" color="inherit" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        <ChartAcc
          companyName={companyName}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          addTitle={addTitle}
          setAddTitle={setAddTitle}
          setIsOpenDel={setIsOpenDel}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          url={url}
          activeField={activeField}
          setActiveField={setActiveField}
          showKeyboard={showKeyboard}
          setShowKeyboard={setShowKeyboard}
        />
      </Box>
    </Modal>
  );
};

export default DelModal;
