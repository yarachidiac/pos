// import { Modal, Box } from "@mui/material";
// import ChartAcc from "../ChartAcc";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import { useTheme } from "@mui/material/styles";
// import { tokens } from "../../theme";

// const MapDialog = ({
//     openMap,
//     setOpenMap
// }) => {
//   const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
    
//   const handleClose = () => {
//     setOpenMap(false);
//   };

//   const modalStyle = {
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     background: colors.whiteblack[100],
//     //background: "#FFFEFC",
//     //backgroundColor: "#fcfcfc",
//     boxShadow: 24,
//     pt: 0, // Set top padding to 2
//     pr: 2, // Set right padding to 3
//     pb: 2, // Set bottom padding to 3
//     pl: 2, // Set left padding to 3
//     //width: "100%",
//     minWidth: "90%",
//     minHeight: "80%", // Set a minimum height for smaller screens
//     //maxHeight: "90%", // Set a maximum height for smaller screens
//     display: "flex",
//     flexDirection: window.innerWidth < 650 ? "row" : "column",
//   };
//   const modalContainerStyle = {
//     position: "relative",
//     overflow: "hidden", // Hide overflow from the Drawer
//     //backgroundColor: "rgba(252, 252, 252, 0.92)",
//   };
//   const largerModalStyle = {
//     width: "90%",
//     //maxWidth: 800,
//   };
//   const heightModalStyle = {
//     width: "100%",
//     minHeight: "60%", // Set the fixed height for smaller screens
//     maxHeight: "80%", // Adjust the maximum height as needed
//   };
//   const iconButtonStyle = {
//     // Other styles...
//     display: "flex",
//     color: colors.greenAccent[500],
//     ...(window.innerWidth < 650
//       ? {
//           position: "absolute",
//           top: "8px",
//           right: "8px",
//         }
//       : {
//           position: "relative",
//         }),
//     marginLeft: "auto", // Push the button to the right
//     // Other styles...
//   };

//   return (
//     <Modal open={openMap} onClose={handleClose}>
//       <Box
//         sx={{
//           ...modalStyle,
//           ...(window.innerWidth > 650 ? largerModalStyle : heightModalStyle),
//           ...modalContainerStyle,
//         }}
//       >
//         <Box>
//           <IconButton
//             edge="end"
//             color="inherit"
//             onClick={handleClose}
//             sx={iconButtonStyle}
//           >
//             <CloseIcon />
//           </IconButton>
//         </Box>
//         {/* Include Google Maps iframe here */}
//         <Box
//           sx={{
//             flex: 1,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <iframe
//             title="Google Maps"
//             src="https://www.google.com/maps/place/Lebanon/@33.8729351,35.1866176,9z/data=!3m1!4b1!4m6!3m5!1s0x151f17028422aaad:0xcc7d34096c00f970!8m2!3d33.854721!4d35.862285!16zL20vMDRocXo?hl=en&entry=ttu"
//             width="600"
//             height="450"
//             style={{ border: "0", borderRadius: "4px" }} // Use an object here
//             allowFullScreen=""
//             loading="lazy"
//           ></iframe>
//         </Box>
//       </Box>
//     </Modal>
//   );
// };

// export default MapDialog;
