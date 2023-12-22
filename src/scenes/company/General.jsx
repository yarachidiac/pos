import React, {useState, useEffect} from "react";
import EditableTableCell from "../team/EditableTableCell";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { Typography } from "@mui/material";


const General = ({companyName, companyDetails, setCompanyDetails}) => {
  const [editableCells, setEditableCells] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEditing) {
      console.log("Updated companyDetails:", companyDetails);
      handleSave();
      setIsEditing(false); // Reset edit mode after save
    } 
  }, [companyDetails]);

  const handleEdit = (index) => {
    setEditableCells((prev) => [...prev, index]);
    setIsEditing(true); // Set edit mode when editing starts
  };

  const handleCancel = () => {
    setEditableCells([]);
    setIsEditing(false); // Reset edit mode when canceling
  };
  const handleValueUpdate = (field, updatedValue) => {
    console.log("updateddd valueeeeeeeeeeeeeee", updatedValue);

    setCompanyDetails((prev) => ({
      ...prev,
      [field]: updatedValue,
    }));
  };

  const handleSave = async () => {
    // try {
    //   // Prepare the data to be sent in the request
    //   const data = userDetails;
    //   console.log("updateddddddddddddddddddddddd", data);
    //   // Send a POST request to the endpoint
    //   const response = await fetch(
    //     `http://192.168.16.109:8000/users/${companyName}/${userDetails.id}`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(data),
    //     }
    //   );
    //   // Check if the request was successful (status code 2xx)
    //   if (response.ok) {
    //     // If save is successful, fetch the updated users
    //     const response = await fetch(
    //       `http://192.168.16.109:8000/users/${companyName}`
    //     );
    //     const updatedUsers = await response.json();
    //     // Update the users state in the Team component
    //     setUsers(updatedUsers);
    //     // Update the userDetails state in the GeneralAccountingTable component
    //     setUserDetails(data);
    //     console.log("userrrrrrrrrrr detailssssssssssssssssssssss", userDetails);
    //     // Handle success, e.g., update state or perform any additional actions
    //     console.log("Save successful");
    //   } else {
    //     // Handle errors, e.g., display an error message
    //     console.error("Save failed");
    //   }
    // } catch (error) {
    //   console.error("Error during save:", error);
    // } finally {
    //   // Handle any cleanup or additional actions
    //   setEditableCells([]);
    // }
  };

   const rows = companyDetails
     ? Object.entries(companyDetails).map(([key, value], index) => {
         console.log("valueeeeeeeeeeeeeeeeee", value); // Log the value

         return (
           <TableRow key={key}>
             <TableCell style={{ minWidth: "80px" }}>
               <Typography variant="h4">{key}:</Typography>
             </TableCell>
             {/* <EditableTableCell
               value={value}
               isEditing={editableCells.includes(index)}
               onEdit={() => handleEdit(index)}
               onCancel={handleCancel}
               onSave={handleSave}
               onUpdate={(updatedValue) => handleValueUpdate(key, updatedValue)}
             /> */}
           </TableRow>
         );
       })
     : null;

  
  return (
    <Box>
      <Table>
        <TableBody>{rows}</TableBody>
      </Table>
    </Box>
  );
};

export default General;