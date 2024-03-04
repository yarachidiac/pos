import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import ClientDetailsModal from "./ClientDetailsModal";
import Button from "@mui/material/Button";
import AddUserDialog from "../team/AddUserDialog";
import { Checkbox } from "@mui/material";

const ChartAcc = ({
  companyName,
  addTitle,
  setAddTitle,
  selectedRow,
  setSelectedRow,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState(10);

  //const [companyName, setCompanyName] = useState("");
  const [clients, setClients] = useState([]);
  // const [selectedRow, setSelectedRow] = useState(() => {
  //   const storedSelectedRow = localStorage.getItem("selectedRow");
  //   return storedSelectedRow ? JSON.parse(storedSelectedRow) : null;
  // });
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [clientDetails, setClientDetails] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [successMess, setSuccessMess] = useState();

  const storedSelectedRow = localStorage.getItem("selectedRow");
  console.log("ssssssssssssssssssss", storedSelectedRow);
  useEffect(() => {
    console.log("stored companyyyyyy", companyName);

    // Fetch users based on the company name
    if (companyName) {
      fetch(`http://192.168.16.113:8000/clients/${companyName}`)
        .then((response) => response.json())
        .then((data) => {
          // Ensure that data is an object with the 'initialState' property

          if (Array.isArray(data)) {
            setClients(data);
          } else {
            console.error("Invalid data format received:", data);
          }
        })
        .catch((error) => console.error("Error fetching clients", error));
    }
  }, [clientDetails]);

  useEffect(() => {
    localStorage.setItem("selectedRow", JSON.stringify(selectedRow));
  }, [selectedRow]);

  // useEffect(() => {
  //   // Check if userDetails is truthy and open the modal
  //   if (userDetails) {
  //     setIsDetailsModalOpen(true);
  //   }
  // }, [userDetails]);

  const handleRowClick = (params) => {
    // Check if the clicked column is not the checkbox column
    if (params.field !== "checkbox") {
      setIsDetailsModalOpen(true);
      setClientDetails(params.row);
    }
  };

  const closeDetailsModal = () => {
    // Close the details modal
    setIsDetailsModalOpen(false);
    //setSelectedUserDetails(null);
    setClientDetails(null);
  };

  const renderTextCell = ({ value }) => {
    return <Typography variant="h4">{value}</Typography>;
  };

  console.log("Seeeeeeeeeeeeeeeeee", selectedRow)
  const renderCheckboxCell = ({ row }) => {
    console.log("Rrrrrrrrrrrrrrrrrr", row); // Moved outside the return statement
    return (
      <Checkbox
        checked={selectedRow !== null && selectedRow["AccNo"] === row["AccNo"]}
        onChange={(event) => {
          setSelectedRow(selectedRow === row ? null : row);
          event.stopPropagation();
        }}
        onClick={(event) => {
          event.stopPropagation();
        }}
      />
    );
  };

  const columns = [
    {
      field: "AccName",
      headerName: "Account Name",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      flex: 1,
      onClick: handleRowClick,
    },
    {
      field: "Address",
      headerName: "Address",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
    },
    {
      field: "Building",
      headerName: "Building",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
    },
    {
      field: "checkbox",
      headerName: "",
      renderCell: renderCheckboxCell,
      minWidth: 50,
      headerClassName: "header-cell",
    },
    // {
    //   field: "password",
    //   headerName: "Password",
    //   headerAlign: "left",
    //   minWidth: 200,
    //   renderCell: renderTextCell,
    //   headerClassName: "header-cell", // Apply the custom style to the header
    // },
    // {
    //   field: "phone",
    //   headerName: "Phone",
    //   flex: 1,
    //   minWidth: 200,
    // },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    //   minWidth: 250,
    // },
    // {
    //   field: "accessLevel",
    //   headerName: "Access Level",
    //   flex: 1,
    //   minWidth: 250,
    //   type: "singleSelect",
    //   valueOptions: ["manager", "user", "admin"],
    //   editable: true,

    //   renderCell: renderAccessLevelCell,
    // },
  ];

  const handleAddUser = (title) => {
    setAddTitle(title);
    // Open the modal when "Add" button is clicked
    setIsDialogOpen(true);
  };

  const handleUserDetailsChange = async (newUserDetails) => {
    try {
      console.log("newUserDetailssssssssss", newUserDetails.name);
      const apiUrl = `http://192.168.16.113:8000/addclients/${companyName}/${newUserDetails.name}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserDetails),
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
      const clientDetailsResponse = await fetch(
        `http://192.168.16.113:8000/getClientDetail/${companyName}/${newUserDetails.name}`
      );

      if (!clientDetailsResponse.ok) {
        throw new Error(`HTTP error! Status: ${clientDetailsResponse.status}`);
      }

      const clientDetailsData = await clientDetailsResponse.json();

      // Set the userDetails state with the details of the newly added user
      setClientDetails(clientDetailsData);
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
          <Header title="Client" subtitle="Managing Client Members" />
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
            onClick={() => handleAddUser("Add Client")}
          >
            Add
          </Button>
        </Box>
      </Box>
      <ClientDetailsModal
        isOpen={isDetailsModalOpen}
        setIsDetailsModalOpen={setIsDetailsModalOpen}
        //setSelectedUserDetails={setSelectedUserDetails}
        clientDetails={clientDetails}
        setClientDetails={setClientDetails}
        clients={clients}
        setClients={setClients}
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
          "& .MuiDataGrid-toolbarContainer": {
            height: "10%",
            // backgroundColor: colors.grey[800],
          },
          "& .css-3be3ve-MuiFormControl-root-MuiTextField-root-MuiDataGrid-toolbarQuickFilter input":
            {
              color: colors.greenAccent[600],
              height: "100%",
              fontSize: "1.5rem",
            },
          "& .css-ptiqhd-MuiSvgIcon-root": {
            fontSize: "2rem",
          },
          // "& .MuiCheckbox-root": {
          //   color: `${colors.greenAccent[200]} !important`,
          // },
        }}
      >
        <DataGrid
          style={{ height: "100%" }}
          rows={clients}
          columns={columns}
          getRowId={(row) => row.AccNo}
          onSelectionModelChange={(newSelection) => {
            setSelectedRow(newSelection.selectedRow);
          }}
          selectionModel={selectedRow}
          //autoHeight
          {...(clients && clients.initialState)}
          initialState={{
            ...clients.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 20, 30]}
          disableSelectionOnClick // Add this line to disable selection on click
          // onSelectionModelChange={(newSelection) => {
          //   // Set the selected row when the selection changes
          //   setSelectedRow(newSelection.length > 0 ? newSelection[0] : null);
          // }}
          onRowClick={(params) => {
            console.log("Params:", params);

            handleRowClick(params);
          }}
          // selectionModel={[selectedRow]}
          pagination // Add this line to enable pagination
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
        />
      </Box>
      <AddUserDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onAdd={handleUserDetailsChange}
        successMess={successMess}
        title={addTitle}
      />
    </Box>
  );
};

export default ChartAcc;
