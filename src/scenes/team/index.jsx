import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import UserDetailsModal from "./UserDetailsModal";
import Button from "@mui/material/Button";

const Team = ({companyName}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState(5);

  //const [companyName, setCompanyName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  //const [selectedUserDetails, setSelectedUserDetails] = useState(null);
  // const [userDetailsCopy, setUserDetailsCopy] = useState({
  //   ...selectedUserDetails,
  // });



  useEffect(() => {
    // Read company_name from localStorage
    // const storedCompanyName = localStorage.getItem("company_name");
    // setCompanyName(storedCompanyName);

    console.log("stored companyyyyyy", companyName);

    // Fetch users based on the company name
    if (companyName) {
      fetch(`http://192.168.16.133:8000/users/${companyName}`)
        .then((response) => response.json())
        .then((data) => {
          // Ensure that data is an object with the 'initialState' property

          if (Array.isArray(data)) {
            setUsers(data);
          } else {
            console.error("Invalid data format received:", data);
          }
        })
        .catch((error) => console.error("Error fetching users", error));
    }
  }, []);

  const handleRowClick = (params) => {
    // Open the details modal and set the selected user details
    setIsDetailsModalOpen(true);
    setUserDetails(params.row);
  };

  const closeDetailsModal = () => {
    // Close the details modal
    setIsDetailsModalOpen(false);
    //setSelectedUserDetails(null);
    setUserDetails(null);
  };

  const renderAccessLevelCell = ({ value }) => {
    const iconMap = {
      admin: <AdminPanelSettingsOutlinedIcon />,
      manager: <SecurityOutlinedIcon />,
      user: <LockOpenOutlinedIcon />,
    };

    const colorMap = {
      admin: colors.greenAccent[600],
      manager: colors.greenAccent[700],
      user: colors.greenAccent[700],
    };

    return (
      <Box
        width="100%"
        m="0 auto"
        p="5px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        backgroundColor={colorMap[value]}
        borderRadius="4px"
        color={colors.grey[100]}
      >
        {iconMap[value]}
        <Typography sx={{ ml: "5px" }}>{value}</Typography>
      </Box>
    );
  };

  const renderTextCell = ({ value }) => {
    return <Typography variant="h4">{value}</Typography>;
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 100,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
    },
    {
      field: "username",
      headerName: "Username",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
    },
    {
      field: "password",
      headerName: "Password",
      headerAlign: "left",
      align: "left",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
    },
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

  return (
    <Box
      sx={{
        height: "90%",
        width: "100%",
      }}
    >
      <Box justifyContent="space-between" display="flex" height="20%"  alignItems= 'center'>
        <Box sx={{width:"50%", m: "2%"}}>
          <Header title="Team" subtitle="Managing the Team Members" />
        </Box>
        <Box sx={{ width: "10%", marginLeft:"auto", justifyContent: "flex-end", alignContent:"center"}}>
          <Button
            variant="contained"
            style={{ background: colors.greenAccent[500] ,}}
            onClick={() => {}}
          >
            Add
          </Button>
        </Box>
      </Box>
      <UserDetailsModal
        isOpen={isDetailsModalOpen}
        setIsDetailsModalOpen={setIsDetailsModalOpen}
        //setSelectedUserDetails={setSelectedUserDetails}
        userDetails={userDetails}
        setUserDetails={setUserDetails}
        users={users}
        setUsers={setUsers}
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
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.primary[400],
            borderBottom: "none",
            fontSize: "900",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "20px",
          },
          // "& .MuiCheckbox-root": {
          //   color: `${colors.greenAccent[200]} !important`,
          // },
        }}
      >
        <DataGrid
          rows={users}
          columns={columns}
          autoHeight
          {...(users && users.initialState)}
          initialState={{
            ...users.initialState,
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
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
    </Box>
  );
};

export default Team;
