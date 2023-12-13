import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";

const EditableTableCell = ({ value, isEditing, onEdit, onCancel, onSave }) => {
  const [editedValue, setEditedValue] = useState(value);

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  return (
    <TableCell style={{ minWidth: "120px" }}>
      {isEditing ? (
        <InputBase value={editedValue} onChange={handleInputChange} fullWidth />
      ) : (
        value
      )}
      {isEditing ? (
        <Box>
          <IconButton onClick={onSave}>
            <CheckIcon />
          </IconButton>
          <IconButton onClick={onCancel}>
            <CancelIcon />
          </IconButton>
        </Box>
      ) : (
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
      )}
    </TableCell>
  );
};

export default EditableTableCell;