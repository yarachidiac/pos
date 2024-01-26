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

const ManagePoS = ({ companyName, addTitle, setAddTitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState(10);

  //const [companyName, setCompanyName] = useState("");
  const [items, setItems] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [itemDetails, setItemDetails] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [successMess, setSuccessMess] = useState();

  useEffect(() => {
    // Read company_name from localStorage
    // const storedCompanyName = localStorage.getItem("company_name");
    // setCompanyName(storedCompanyName);

    console.log("stored companyyyyyy", companyName);

    // Fetch users based on the company name
    if (companyName) {
      fetch(`http://192.168.16.113:8000/allitemswithmod/${companyName}`)
        .then((response) => response.json())
        .then((data) => {
          // Ensure that data is an object with the 'initialState' property

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
  };


  const renderTextCell = ({ value }) => {
    return <Typography variant="h4">{value}</Typography>;
  };

  const columns = [
    {
      field: "GroupName",
      headerName: "Group Name",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
    },
    {
      field: "ItemNo",
      headerName: "Item No",
      headerAlign: "left",
      align: "left",
      minWidth: 100,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
    },
    {
      field: "ItemName",
      headerName: "Item Name",
      headerAlign: "left",
      align: "left",
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
      const apiUrl = `http://192.168.16.113:8000/additems/${companyName}/${newItemDetails.name}`;

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
      }, 2000);
      console.log("Response from the server:", responseData);

      // Fetch the details of the newly added user
      const itemDetailsResponse = await fetch(
        `http://192.168.16.113:8000/getItemDetail/${companyName}/${newItemDetails.name}`
      );

      if (!itemDetailsResponse.ok) {
        throw new Error(`HTTP error! Status: ${itemDetailsResponse.status}`);
      }

      const itemDetailsData = await itemDetailsResponse.json();

      // Set the userDetails state with the details of the newly added user
      setItemDetails(itemDetailsData);
      // Open the details modal
      setIsDetailsModalOpen(true);
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
        height: "90%",
        width: "100%",
      }}
    >
      <Box
        justifyContent="space-between"
        display="flex"
        height="20%"
        alignItems="center"
      >
        <Box sx={{ width: "50%", m: "2%" }}>
          <Header title="Items" subtitle="Managing Items" />
        </Box>
        <Box
          sx={{
            width: "10%",
            marginLeft: "auto",
            justifyContent: "flex-end",
            alignContent: "center",
          }}
        >
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
      />
      <Box
        m="0 auto"
        height="75%"
        width="90%"
        sx={{
          // "& .MuiDataGrid-root": {
          //   border: "none",
          // },
          // "& .MuiDataGrid-cell": {
          //   borderBottom: "none",
          // },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[500],
            color: colors.primary[500],
            borderBottom: "none",
            fontSize: "900",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[500],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.greenAccent[500],
            color: colors.primary[500],
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "20px",
          },
          "& .MuiToolbar-root.MuiTablePagination-toolbar": {
            color: colors.primary[500],
          },

          // "& .MuiCheckbox-root": {
          //   color: `${colors.greenAccent[200]} !important`,
          // },
        }}
      >
        <DataGrid
          style={{ height: "100%" }}
          rows={items}
          columns={columns}
          getRowId={(row) => row.ItemNo}
          //autoHeight
          {...(items && items.initialState)}
          initialState={{
            ...items.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 20, 30]}
          disableSelectionOnClick // Add this line to disable selection on click
          onSelectionModelChange={(newSelection) => {
            // Set the selected row when the selection changes
            setSelectedRow(newSelection.length > 0 ? newSelection[0] : null);
          }}
          onRowClick={(params) => {
            console.log("Params:", params);

            handleRowClick(params);
          }}
          selectionModel={[selectedRow]}
          pagination // Add this line to enable pagination
        />
      </Box>
      <AddUserDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onAdd={handleItemDetailsChange}
        successMess={successMess}
        title={addTitle}
      />
    </Box>
  );
};

export default ManagePoS;
