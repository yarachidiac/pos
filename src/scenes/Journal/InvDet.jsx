import { Box, TextField, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import DatagridTable from "../DatagridTable";

const InvDet = ({ companyName, selectedInv, url, selectedInvType }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState(10);
  const [inv, setInv] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [invDet, setInvDet] = useState([]);

  useEffect(() => {
    fetch(`${url}/pos/getInvHistoryDetails/${companyName}/${selectedInv}`)
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
    {
      field: "totalItem",
      headerName: "Total",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 100,
      renderCell: renderTextCell,
      headerClassName: "header-cell",
    },
  ];

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box>
        <Header title={`${selectedInvType} ${selectedInv}`} />
      </Box>
      <DatagridTable
        rows={invDet.map((row, index) => ({ ...row, id: index }))}
        columns={columns}
        getRowId={(row) => row.id}
      />
    </Box>
  );
};

export default InvDet;
