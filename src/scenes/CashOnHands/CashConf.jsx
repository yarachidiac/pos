import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { format } from "date-fns";

const CashConfirm = ({
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
  const [originalData, setOriginalData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
  const [filterUser, setFilterUser] = useState([]);
  const [totalInv, setTotalInv] = useState("");
  const [totalUser, setTotalUser] = useState("");

  const handleChange = (event) => {
    const selectedUser = event.target.value;
    setSelectedOption(selectedUser);

    if (selectedUser === "all") {
      setRows(originalData); // Reset to full data if 'All' is selected
      setTotalInv(calculateTotalFinal(totalUser));
    } else {
      const filteredData = originalData.filter(
        (item) => item.User === selectedUser
      );
      const userShift = totalUser.find((shift) => shift.User === selectedUser);
      setTotalInv(userShift ? userShift.totalFinal : 0);
      setRows(filteredData); // Filter data based on the selected user
    }
  };

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
      const currentDate = new Date();
      const formattedDate = format(currentDate, "dd.MM.yyyy");
      try {
        const calc = await fetch(
          `${url}/pos/calculateUserShifts/${companyName}/${formattedDate}`
        );
        const invoices = await calc.json();
        console.log("invoices", invoices);
        setTotalUser(invoices);
        setTotalInv(calculateTotalFinal(invoices));
        const response = await fetch(
          `${url}/pos/reportUserShift/${companyName}/${formattedDate}`
        );
        const data = await response.json();
        setRows(data);
        setOriginalData(data); // Store the original data
        const uniqueUsers = [...new Set(data.map((item) => item.User))];
        setFilterUser(uniqueUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (open) {
      fetchData();
    }
  }, [open, url, companyName,]);

  const calculateTotalFinal = (data) => {
    return data.reduce((sum, item) => sum + item.totalFinal, 0);
  };

  const renderTextCell = ({ value }) => {
    return <Typography variant="h4">{value}</Typography>;
  };

  const columns = [
    {
      field: "User",
      headerName: "User",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell",
      flex: 1,
    },
    {
      field: "InvType",
      headerName: "InvType",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell",
      flex: 1,
    },
    {
      field: "InvNo",
      headerName: "InvNo",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell",
    },
    {
      field: "OrderId",
      headerName: "Account Name",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell",
      flex: 1,
    },
    {
      field: "Date",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell",
    },
    {
      field: "Time",
      headerName: "Time",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 200,
      renderCell: renderTextCell,
      headerClassName: "header-cell",
    },
  ];

  return (
    <Modal open={open} onClose={onCancel}>
      <Box sx={style}>
        <Box
          sx={{
            height: "8%",
            width: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box sx={{ width: "50%" }}>
            <Typography variant="h3" component="h1" sx={{ fontWeight: "500" }}>
              Do you want to end your shift?
            </Typography>
            <Typography variant="h3" component="h1" sx={{ fontWeight: "500" }}>
              {totalInv}
            </Typography>
          </Box>
          <Box sx={{ width: "10%" }}>
            <Select
              value={selectedOption}
              onChange={handleChange}
              sx={{ width: "100%", textAlign: "center" }}
            >
              <MenuItem value="all">All</MenuItem>
              {filterUser.map((user) => (
                <MenuItem key={user} value={user}>
                  {user}
                </MenuItem>
              ))}
            </Select>
          </Box>
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

export default CashConfirm;
