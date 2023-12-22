// import React, { useState, useEffect } from "react";
// import EditIcon from "@mui/icons-material/Edit";
// import CheckIcon from "@mui/icons-material/Check";
// import CancelIcon from "@mui/icons-material/Cancel";
// import IconButton from "@mui/material/IconButton";
// import InputBase from "@mui/material/InputBase";
// import Box from "@mui/material/Box";
// import TableCell from "@mui/material/TableCell";
// import { Typography } from "@mui/material";

// const EditableTableCell = ({
//   value,
//   isEditing,
//   onEdit,
//   onUpdate,
// }) => {
//   const [editedValue, setEditedValue] = useState(value);


//   const handleInputChange = (e) => {
//     console.log("valueeeeeeeeeeeeeeeeee", e.target.value);
//     setEditedValue(e.target.value);
//   };

//     const handleSaveClick = () => {
//       onUpdate(editedValue);
//       console.log("here the value changes ", editedValue);
//       onSave();
//     };


//   return (
//     <TableCell style={{ minWidth: "120px" }}>
//       {isEditing ? (
//         <Box sx={{ maxWidth: "100px" }}>
//           <InputBase value={editedValue} onChange={handleInputChange} />
//         </Box>
//       ) : (
//         <Typography variant="h4">{value}</Typography>
//       )}
//       {isEditing ? (
//         <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
//           <IconButton onClick={handleSaveClick}>
//             <CheckIcon />
//           </IconButton>
//           <IconButton onClick={onCancel}>
//             <CancelIcon />
//           </IconButton>
//         </Box>
//       ) : (
//         <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
//           <IconButton onClick={onEdit}>
//             <EditIcon />
//           </IconButton>
//         </Box>
//       )}
//     </TableCell>
//   );
// };

// export default EditableTableCell;