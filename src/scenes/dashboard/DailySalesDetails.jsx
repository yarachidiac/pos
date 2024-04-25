import { useTheme, Typography, Box } from "@mui/material";
import { tokens } from "../../theme";
import DailySalesModal from "./DailySalesModal";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const DailySalesDetails = ({ companyName, selectedItem, url }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dailyDet, setDailyDet] = useState([]);

  useEffect(() => {
    fetch(`${url}/pos/getDailySalesDetails/${companyName}/${selectedItem}`)
      .then((response) => response.json())
      .then((data) => {
        // Ensure that data is an object with the 'initialState' property

        if (Array.isArray(data)) {
          setDailyDet(data);
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
      headerName: "Item No",
      minWidth: 150,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      flex: "1",
    },
    {
      field: "InvNo",
      headerName: "Item No",
      minWidth: 150,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      flex: "1",
    },
    {
      field: "ItemNo",
      headerName: "Item No",
      minWidth: 100,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      flex: "1",
    },
    {
      field: "ItemName",
      headerName: "Item Name",
      cellClassName: "name-column--cell",
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      minWidth: 300,
      flex: "1",
    },
    {
      field: "UPrice",
      headerName: "UPrice",
      headerAlign: "left",
      align: "left",
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      minWidth: 100,
      flex: "1",
    },
    {
      field: "Disc",
      headerName: "Disc",
      headerAlign: "left",
      align: "left",
      minWidth: 100,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      minWidth: 100,
      flex: "1",
    },
    {
      field: "Tax",
      headerName: "Tax",
      headerAlign: "left",
      align: "left",
      minWidth: 100,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      minWidth: 100,
      flex: "1",
    },  
  ];

  return (
    <Box
      sx={{
        height: "100%",
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
        <Header title="Daily Sales" />
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}></Box>
      </Box>
      <Box
        sx={{
          height: "90%",
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
          rows={dailyDet.map((item, index) => ({
            id: index, // You need to provide a unique identifier for each row
            ...item, // Spread the original item properties
          }))}
          columns={columns}
          //autoHeight
          {...(dailyDet && dailyDet.initialState)}
          initialState={{
            ...dailyDet.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 20, 30]}
          disableSelectionOnClick // Add this line to disable selection on click
          pagination // Add this line to enable pagination
        />
      </Box>
    </Box>
  );
};

export default DailySalesDetails;
