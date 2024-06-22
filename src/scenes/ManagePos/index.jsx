import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddUserDialog from "../team/AddUserDialog";
import ItemDetailsModal from "./ItemDetailsModal";
import DatagridTable from "../DatagridTable";

const ManagePoS = ({
  companyName,
  addTitle,
  setAddTitle,
  setOldItemNo,
  setNewItemNo,
  url,
  activeField,
  setActiveField,
  showKeyboard,
  setShowKeyboard, itemDetails, setItemDetails, itemDetailsCopy, setItemDetailsCopy, valMessage, setValMessage, 
  userName, setUserName
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState(10);

  //const [companyName, setCompanyName] = useState("");
  const [items, setItems] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [successMess, setSuccessMess] = useState();

  useEffect(() => {
    // Read company_name from localStorage
    // const storedCompanyName = localStorage.getItem("company_name");
    // setCompanyName(storedCompanyName);

    console.log("stored companyyyyyy", companyName);

    // Fetch users based on the company name
    if (companyName) {
      fetch(`${url}/pos/allitemswithmod/${companyName}`)
        .then((response) => response.json())
        .then((data) => {
          // Ensure that data is an object with the 'initialState' property
          console.log("ssssssssssssss", data);
          if (Array.isArray(data)) {
            setItems(data);
          } else {
            console.error("Invalid data format received:", data);
          }
        })
        .catch((error) => console.error("Error fetching users", error));
    }
  }, [itemDetails]);

  const handleRowClick = (params) => {
    // Open the details modal and set the selected user details
    setIsDetailsModalOpen(true);
    setItemDetails(params.row);
    setItemDetailsCopy(params.row)
  };

  const renderTextCell = ({ value }) => {
    return <Typography variant="h4">{value}</Typography>;
  };

  const columns = [
    {
      field: "ItemNo",
      headerName: "Item No",
      headerAlign: "left",
      align: "left",
      minWidth: 100,
      flex: 1,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
    },
    {
      field: "ItemName",
      headerName: "Item Name",
      headerAlign: "left",
      align: "left",
      minWidth: 200,
      flex: 1,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
    },
    {
      field: "GroupName",
      headerName: "Group Name",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
    },
  ];

  const handleAddItem = (title) => {
    setAddTitle(title);
    // Open the modal when "Add" button is clicked
    setIsDialogOpen(true);
  };

  const handleItemDetailsChange = async (newItemDetails) => {
    try {
      console.log("newUserDetailssssssssss", newItemDetails.name);
      const apiUrl = `${url}/pos/additems/${companyName}/${newItemDetails.name}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItemDetails),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      setSuccessMess(responseData.message);
      setTimeout(() => {
        setSuccessMess("");
      }, 8000);
      console.log("Response from the server:", responseData);

      // Fetch the details of the newly added user
      const itemDetailsResponse = await fetch(
        `${url}/pos/getItemDetail/${companyName}/${newItemDetails.name}`
      );

      if (!itemDetailsResponse.ok) {
        throw new Error(`HTTP error! Status: ${itemDetailsResponse.status}`);
      }

      const itemDetailsData = await itemDetailsResponse.json();

      // Set the userDetails state with the details of the newly added user
      setItemDetails(itemDetailsData);
      setItemDetailsCopy(itemDetailsData);
      // Open the details modal
      setTimeout(() => {
        setIsDetailsModalOpen(true);
      }, 2000);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleCloseDialog = () => {
    // Close the dialog when needed
    setIsDialogOpen(false);
  };

  return (
    <Box
      sx={{
        display:"flex",
        justifyContent: "center",
        flexDirection:"column",
        alignItems: "center",
        //ml: "2%",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        justifyContent="space-between"
        display="flex"
        height="8%"
        alignItems="center"
        width="90%"
      >
        <Box>
          <Header title="Manage Items" />
        </Box>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            style={{ fontSize: "1.1rem" }}
            onClick={() => handleAddItem("Add Item Number")}
          >
            Add
          </Button>
        </Box>
      </Box>
      <ItemDetailsModal
        isOpen={isDetailsModalOpen}
        setIsDetailsModalOpen={setIsDetailsModalOpen}
        itemDetails={itemDetails}
        setItemDetails={setItemDetails}
        items={items}
        setItems={setItems}
        companyName={companyName}
        setOldItemNo={setOldItemNo}
        setNewItemNo={setNewItemNo}
        itemDetailsCopy={itemDetailsCopy}
        setItemDetailsCopy={setItemDetailsCopy}
        url={url}
        activeField={activeField}
        setActiveField={setActiveField}
        showKeyboard={showKeyboard}
        setShowKeyboard={setShowKeyboard}
        valMessage={valMessage}
        setValMessage={setValMessage}
      />
      <DatagridTable
        rows={items}
        columns={columns}
        handleRowClick={handleRowClick}
        getRowId={(row) => row.ItemNo}
      ></DatagridTable>
      <AddUserDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onAdd={handleItemDetailsChange}
        successMess={successMess}
        title={addTitle}
        setShowKeyboard={setShowKeyboard}
        setActiveField={setActiveField}
        userName={userName}
        setUserName={setUserName}
        valMessage={valMessage}
        setValMessage={setValMessage}
      />
    </Box>
  );
};

export default ManagePoS;
