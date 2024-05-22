import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { useEffect, useState } from "react";
import { height } from "@mui/system";
import { format } from "date-fns";

const EndOfDay = ({
  open,
  onCancel,
  onConfirm,
  url,
  username,
  companyName,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    height: "95%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentDate = new Date();
        const formattedDate = format(currentDate, "dd.MM.yyyy");
        const response = await fetch(
          `${url}/pos/eod/${companyName}/${formattedDate}`
        );
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open]);

  const renderTextCell = ({ value }) => {
    return <Typography variant="h4">{value}</Typography>;
  };

  const columns = [
    {
      field: "User",
      headerName: "User",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      flex: 1,
    },
    {
      field: "InvType",
      headerName: "InvType",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      flex: 1,
    },
    {
      field: "InvNo",
      headerName: "InvNo",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
    },
    {
      field: "OrderId",
      headerName: "Account Name",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      flex: 1,
    },
    {
      field: "Date",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
    },
    {
      field: "Time",
      headerName: "Time",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
    },
  ];

  return (
    <Modal open={open} onClose={onCancel}>
      <Box sx={style}>
        <Box sx={{ height: "8%" }}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: "500" }}>
            Do you want to end your day?
          </Typography>
        </Box>
        <Box sx={{ height: "82%", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.InvNo}
            initialState={{
              ...rows.initialState,
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[10, 20, 30]}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            height: "8%",
            mt: "2%",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={onConfirm}
            autoFocus
            style={{ fontSize: "0.9rem", marginRight: "8px" }}
          >
            Yes
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={onCancel}
            style={{ fontSize: "0.9rem" }}
          >
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EndOfDay;
