import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import { tokens } from "../../theme";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import GeneralAccountingTable from "./GeneralAccountingTable";

// const GeneralAccountingTable = ({ userDetails }) => (
//   <Box>
//     <Table>
//       <TableBody>
//         <TableRow>
//           <TableCell style={{ minWidth: "80px" }}>Name:</TableCell>
//           <TableCell style={{ minWidth: "120px" }}>
//             {userDetails.username}
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell style={{ minWidth: "80px" }}>Email:</TableCell>
//           <TableCell style={{ minWidth: "120px" }}>
//             {userDetails.email}
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell style={{ minWidth: "80px" }}>User Control:</TableCell>
//           <TableCell style={{ minWidth: "120px" }}>
//             {userDetails.user_control}
//           </TableCell>
//         </TableRow>
//         <TableRow>
//           <TableCell style={{ minWidth: "80px" }}>Sales:</TableCell>
//           <TableCell style={{ minWidth: "120px" }}>
//             {userDetails.sales}
//           </TableCell>
//         </TableRow>
//         {/* Add more rows specific to General Accounting */}
//       </TableBody>
//     </Table>
//   </Box>
// );

const StockInventoryTable = ({ userDetails }) => (
  <Box>
    <Table>
      <TableBody>
        <TableRow>
          <TableCell style={{ minWidth: "80px" }}>User Control:</TableCell>
          <TableCell style={{ minWidth: "120px" }}>
            {userDetails.user_control}
          </TableCell>
        </TableRow>
        {/* Add more rows specific to Stock Inventory */}
      </TableBody>
    </Table>
  </Box>
);


const UserDetailsModal = ({ isOpen, onClose, userDetails }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedOption, setSelectedOption] = useState("general");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

 
  
  if (!userDetails) {
    return null;
  }

  const modalStyle = {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    pt: 0, // Set top padding to 2
    pr: 2, // Set right padding to 3
    pb: 2, // Set bottom padding to 3
    pl: 2, // Set left padding to 3
    width: "90%",
    maxWidth: 600,
    minHeight: 300, // Set a minimum height for smaller screens
    maxHeight: "90%", // Set a maximum height for smaller screens
    display: "flex",
    flexDirection: window.innerWidth < 650 ? "row" : "column",
  };

  const modalContainerStyle = {
    position: "relative",
    overflow: "hidden", // Hide overflow from the Drawer
  };

  const largerModalStyle = {
    width: "90%",
    maxWidth: 800,
  };

  const heightModalStyle = {
    width: "100%",
    minHeight: 500, // Set the fixed height for smaller screens
    maxHeight: "80%", // Adjust the maximum height as needed
  };


  const iconButtonStyle = {
    // Other styles...
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

  const appBarStyle = {
    background: colors.primary[400],
    borderRadius: "4px 4px 0 0",
  };

  const toolbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    //padding: theme.spacing(1),
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
      // justifyContent: "space-between",
      //position: "relative"
    },
  };


  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };
  
  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const renderSelectedTable = () => {
    switch (selectedOption) {
      case "general":
        return <GeneralAccountingTable userDetails={userDetails} />;
      case "stock-inventory":
        return <StockInventoryTable userDetails={userDetails} />;
      // Add more cases for each option
      default:
        return null;
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          ...modalStyle,
          ...(window.innerWidth > 650 ? largerModalStyle : heightModalStyle),
          ...modalContainerStyle,
        }}
      >
        <Box>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          sx={iconButtonStyle}
       
        >
          <CloseIcon />
          </IconButton>
          </Box>
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
                  onClick={() => handleOptionChange("accounting")}
                  sx={{
                    color:
                      selectedOption === "accounting"
                        ? colors.greenAccent[400]
                        : colors.grey[100],
                  }}
                >
                  <ListItemText primary="Accounting" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleOptionChange("stock-inventory")}
                  sx={{
                    color:
                      selectedOption === "stock-inventory"
                        ? colors.greenAccent[400]
                        : colors.grey[100],
                  }}
                >
                  <ListItemText primary="Stock Inventory" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleOptionChange("invoices")}
                  sx={{
                    color:
                      selectedOption === "invoices"
                        ? colors.greenAccent[400]
                        : colors.grey[100],
                  }}
                >
                  <ListItemText primary="Invoices & Types Conditions" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleOptionChange("sales")}
                  sx={{
                    color:
                      selectedOption === "sales"
                        ? colors.greenAccent[400]
                        : colors.grey[100],
                  }}
                >
                  <ListItemText primary="Sales Invoices Conditions" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleOptionChange("tables")}
                  sx={{
                    color:
                      selectedOption === "tables"
                        ? colors.greenAccent[400]
                        : colors.grey[100],
                  }}
                >
                  <ListItemText primary="Tables-Dine In & Beauty" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleOptionChange("other")}
                  sx={{
                    color:
                      selectedOption === "other"
                        ? colors.greenAccent[400]
                        : colors.grey[100],
                  }}
                >
                  <ListItemText primary="Other" />
                </ListItem>
                {/* Add more list items for each route */}
              </List>
            </Drawer>
          </Box>
        ) : (
          <AppBar position="static" sx={appBarStyle}>
            <Toolbar sx={toolbarStyle}>
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
                  onClick={() => handleOptionChange("accounting")}
                  sx={{
                    color:
                      selectedOption === "accounting"
                        ? colors.greenAccent[400]
                        : colors.grey[100],
                  }}
                >
                  <ListItemText primary="Accounting" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleOptionChange("stock-inventory")}
                  sx={{
                    color:
                      selectedOption === "stock-inventory"
                        ? colors.greenAccent[400]
                        : colors.grey[100],
                  }}
                >
                  <ListItemText primary="Stock Inventory" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleOptionChange("invoices")}
                  sx={{
                    color:
                      selectedOption === "invoices"
                        ? colors.greenAccent[400]
                        : colors.grey[100],
                  }}
                >
                  <ListItemText primary="Invoices & Types Conditions" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleOptionChange("sales")}
                  sx={{
                    color:
                      selectedOption === "sales"
                        ? colors.greenAccent[400]
                        : colors.grey[100],
                  }}
                >
                  <ListItemText primary="Sales Invoices Conditions" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleOptionChange("tables")}
                  sx={{
                    color:
                      selectedOption === "tables"
                        ? colors.greenAccent[400]
                        : colors.grey[100],
                  }}
                >
                  <ListItemText primary="Tables-Dine In & Beauty" />
                </ListItem>
                <ListItem
                  button
                  onClick={() => handleOptionChange("other")}
                  sx={{
                    color:
                      selectedOption === "other"
                        ? colors.greenAccent[400]
                        : colors.grey[100],
                  }}
                >
                  <ListItemText primary="Other" />
                </ListItem>
              </List>
            </Toolbar>
          </AppBar>
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
    </Modal>
  );
};

export default UserDetailsModal;
