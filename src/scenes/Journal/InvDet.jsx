import { Box, TextField, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";

const InvDet = ({ companyName, selectedInv }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState(10);
  const [inv, setInv] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [invDet, setInvDet] = useState([]);

  useEffect(() => {
    fetch(
      `http://192.168.16.113:8000/getInvHistoryDetails/${companyName}/${selectedInv}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Ensure that data is an object with the 'initialState' property
        if (Array.isArray(data)) {
          setInvDet(data);
        } else {
          console.error("Invalid data format received:", data);
        }
      })
      .catch((error) => console.error("Error fetching users", error));
  }, []);

  const renderTextCell = ({ value }) => {
    return <Typography variant="h4">{value}</Typography>;
  };

  const columns = [
    {
      field: "InvType",
      headerName: "InvType",
      minWidth: 100,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      flex: "1",
    },
    {
      field: "InvNo",
      headerName: "InvNo",
      cellClassName: "name-column--cell",
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      minWidth: 100,
      flex: "1",
    },
    {
      field: "ItemName",
      headerName: "Item",
      headerAlign: "left",
      align: "left",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      flex: "1",
    },
    {
      field: "GroupName",
      headerName: "Group",
      headerAlign: "left",
      align: "left",
      minWidth: 100,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      flex: "1",
    },
    {
      field: "Branch",
      headerName: "Branch",
      headerAlign: "left",
      align: "left",
      minWidth: 150,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      flex: "1",
    },
    {
      field: "Disc",
      headerName: "Disc",
      headerAlign: "left",
      align: "left",
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      minWidth: 50,
      flex: "1",
    },
    {
      field: "Tax",
      headerName: "Tax",
      headerAlign: "left",
      align: "left",
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      minWidth: 50,
      flex: "1",
    },
    {
      field: "UPrice",
      headerName: "UPrice",
      headerAlign: "left",
      align: "left",
      minWidth: 100,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      minWidth: 100,
      flex: "1",
    },
    {
      field: "Qty",
      headerName: "Qty",
      headerAlign: "left",
      align: "left",
      minWidth: 100,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      minWidth: 50,
      flex: "1",
    },
    {
      field: "Date",
      headerName: "Date",
      headerAlign: "left",
      align: "left",
      minWidth: 100,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      minWidth: 100,
      flex: "1",
    },
    {
      field: "Time",
      headerName: "Time",
      headerAlign: "left",
      align: "left",
      minWidth: 100,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      minWidth: 100,
      flex: "1",
    },
    {
      field: "RealDate",
      headerName: "RealDate",
      headerAlign: "left",
      align: "left",
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      minWidth: 100,
      flex: "1",
    },
  ];

  return (
    <Box
      sx={{
        height: "90%",
        width: "95%",
        flexDirection: "column",
        ml: "2%",
      }}
    >
      <Box
        sx={{
          height: "10%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Header title="Invoices History" />
      </Box>
      <Box
        sx={{
          height: "85%",
          width: "100%",
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
          style={{ height: "100%", width: "100%" }}
          rows={invDet.map((row, index) => ({ ...row, id: index }))}
          columns={columns}
          getRowId={(row) => row.id}
          //autoHeight
          {...(inv && inv.initialState)}
          initialState={{
            ...inv.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 20, 30]}
          disableSelectionOnClick // Add this line to disable selection on click
          //   onSelectionModelChange={(newSelection) => {
          //     // Set the selected row when the selection changes
          //     setSelectedRow(newSelection.length > 0 ? newSelection[0] : null);
          //   }}
          //   selectionModel={[selectedRow]}
          pagination // Add this line to enable pagination
        />
      </Box>
    </Box>
  );
};

export default InvDet;
