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
import GroupDetailsModal from "./GroupDetailsModal";

const Groups = ({
  companyName,
  addTitle,
  setAddTitle,
  setOldItemNo,
  setNewItemNo,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState(10);

  //const [companyName, setCompanyName] = useState("");
  const [groups, setGroups] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [groupDetails, setGroupDetails] = useState({});
  const [groupDetailsCopy, setGroupDetailsCopy] = useState({ ...groupDetails });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [successMess, setSuccessMess] = useState();

  useEffect(() => {
    // Read company_name from localStorage
    // const storedCompanyName = localStorage.getItem("company_name");
    // setCompanyName(storedCompanyName);

    console.log("stored companyyyyyy", companyName);

    // Fetch users based on the company name
    if (companyName) {
      fetch(`http://192.168.16.113:8000/groupitems/${companyName}`)
        .then((response) => response.json())
        .then((data) => {
          // Ensure that data is an object with the 'initialState' property

          if (Array.isArray(data)) {
            setGroups(data);
          } else {
            console.error("Invalid data format received:", data);
          }
        })
        .catch((error) => console.error("Error fetching users", error));
    }
  }, [groupDetails]);

  const handleRowClick = (params) => {
    // Open the details modal and set the selected user details
    setIsDetailsModalOpen(true);
    setGroupDetails(params.row);
    setGroupDetailsCopy(params.row);
  };

  const renderTextCell = ({ value }) => {
    return <Typography variant="h4">{value}</Typography>;
  };

  const columns = [
    {
      field: "GroupNo",
      headerName: "Group No",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
    },
    {
      field: "GroupName",
      headerName: "Group Name",
      headerAlign: "left",
      align: "left",
      minWidth: 300,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
    },
    {
      field: "Image",
      headerName: "Image",
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

  const handleGroupDetailsChange = async (newGroupDetails) => {
    try {
      console.log("newUserDetailssssssssss", newGroupDetails.name);
      const apiUrl = `http://192.168.16.113:8000/addgroup/${companyName}/${newGroupDetails.name}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGroupDetails),
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
      const groupDetailsResponse = await fetch(
        `http://192.168.16.113:8000/getGroupDetail/${companyName}/${newGroupDetails.name}`
      );

      if (!groupDetailsResponse.ok) {
        throw new Error(`HTTP error! Status: ${groupDetailsResponse.status}`);
      }

      const groupDetailsData = await groupDetailsResponse.json();

      // Set the userDetails state with the details of the newly added user
      setGroupDetails(groupDetailsData);
      setGroupDetailsCopy(groupDetailsData);
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
          <Header title="Item Groups" subtitle="Managing Groups" />
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
            onClick={() => handleAddItem("Add Group Number")}
          >
            Add
          </Button>
        </Box>
      </Box>
      <GroupDetailsModal
        isOpen={isDetailsModalOpen}
        setIsDetailsModalOpen={setIsDetailsModalOpen}
        groupDetails={groupDetails}
        setGroupDetails={setGroupDetails}
        groups={groups}
        setGroups={setGroups}
        companyName={companyName}
        setOldItemNo={setOldItemNo}
        setNewItemNo={setNewItemNo}
        groupDetailsCopy={groupDetailsCopy}
        setGroupDetailsCopy={setGroupDetailsCopy}
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
          rows={groups}
          columns={columns}
          getRowId={(row) => row.GroupNo}
          //autoHeight
          {...(groups && groups.initialState)}
          initialState={{
            ...groups.initialState,
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
        onAdd={handleGroupDetailsChange}
        successMess={successMess}
        title={addTitle}
      />
    </Box>
  );
};

export default Groups;
