import React, { useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import EditableTableCell from "./EditableTableCell";

const GeneralAccountingTable = ({ userDetails }) => {
  const [editableCells, setEditableCells] = useState([]);

  const handleEdit = (index) => {
    setEditableCells((prev) => [...prev, index]);
  };

  const handleCancel = () => {
    setEditableCells([]);
  };

  const handleSave = () => {
    // Handle saving edited values (e.g., update state, make API call, etc.)
    setEditableCells([]);
  };

  const rows = Object.entries(userDetails).map(([key, value], index) => (
    <TableRow key={key}>
      <TableCell style={{ minWidth: "80px" }}>{key}:</TableCell>
      <EditableTableCell
        value={value}
        isEditing={editableCells.includes(index)}
        onEdit={() => handleEdit(index)}
        onCancel={handleCancel}
        onSave={handleSave}
      />
    </TableRow>
  ));

  return (
    <Box>
      <Table>
        <TableBody>{rows}</TableBody>
      </Table>
    </Box>
  );
};

export default GeneralAccountingTable;
