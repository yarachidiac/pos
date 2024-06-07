import { Box, TextField, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import InvDetailsModal from "./InvDetailsModal";
import { format } from "path-browserify";
import { format as dateFnsFormat } from "date-fns";
import InvTotalDialog from "../InvTotalDialog";

const Journal = ({ companyName, url}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState(10);
  const [inv, setInv] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [openInvDetailsModal, setOpenIvDetailsModal] = useState(false);
  const [selectedInv, setSelectedInv] = useState("");
  const [grossTotal, setGrossTotal] = useState("");
  const [totalQty, setTotalQty] = useState("");
  const [srvValue, setSrvValue] = useState("");
  const [discValue, setDiscValue] = useState("");
  const [totalDiscount, setTotalDiscount] = useState("");
  const [totalTax, setTotalTax] = useState("");
  const [selectedInvType, setSelectedInvType] = useState("");
  const [srv, setSrv] = useState("");
  const [disc, setDisc] = useState("");
  const [totalInv, setTotalInv] = useState("");
  const [openTotalDetail, setOpenTotalDetail] = useState(false);
  const [formattedStartDate, setFormattedStartDate] = useState("");
  const [formattedEndDate, setFormattedEndDate] = useState("");
  const [formattedStartTime, setFormattedStartTime] = useState("");
  const [formattedEndTime, setFormattedEndTime] = useState("");


  const handleStartDateChange = (date) => {
    setStartDate(date);
    setFormattedStartDate(date.format("DD/MM/YYYY"));
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    setFormattedEndDate(date.format("DD/MM/YYYY"));
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
    setFormattedStartTime(time.format("HH:mm"));
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
    setFormattedEndTime(time.format("HH:mm"));
  };

  const handleRowClick = (params) => {
    setOpenIvDetailsModal(true);
    console.log("Ssssssssssssss", params.row.InvNo);
    setSelectedInv(params.row.InvNo);
  };

  useEffect(() => {
    const currentDate = new Date();
    const formattedTime = dateFnsFormat(currentDate, "HH:mm:ss");
    const formattedDate = dateFnsFormat(currentDate, "dd/MM/yyyy");
    const fetchHisFiltered = async () => {
      console.log("afafaf", startDate);
        const requestBody = {
          currDate: formattedDate,
          currTime: formattedTime,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
        };
        const response = await fetch(`${url}/pos/filterInvHis/${companyName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        if (response.ok) {
          const filteredData = await response.json();
          setTotalInv(calculateTotalFinal(filteredData));
          setFilteredData(filteredData);
        }
      }
    
    fetchHisFiltered();    //setFilteredData(filtered);
  }, [startDate, endDate, startTime, endTime]);

  const renderTotalFinalCell = (params) => {
    const value = parseFloat(params.value);
    return (
      <Typography>{!isNaN(value) ? value.toFixed(3) : params.value}</Typography>
    );
  };
  // useEffect(() => {
  //     console.log("innnnnnnnnnnnnnnnnnnnn", inv);
  //     const filtered = inv.filter((row) => {
  //       const rowDate = row.Date;
  //       const rowTime = row.Time;

  //       if (rowDate || rowTime) {
  //         // Check if rowDate is not null
  //         const [day, month, year] = rowDate.split("/");
  //         const [hour, min] = rowTime.split(":");
  //         const startDateObject = new Date(startDate);
  //         const endDateObject = new Date(endDate);
  //         const startTimeObject = new Date(startTime);
  //         const endTimeObject = new Date(endTime);
  //         const startDateY = startDateObject.getFullYear();
  //         const startDateM = startDateObject.getMonth() + 1;
  //         const startDateD = startDateObject.getDate();
  //         const endDateY = endDateObject.getFullYear();
  //         const endDateM = endDateObject.getMonth() + 1;
  //         const endDateD = endDateObject.getDate();
  //         console.log("hhhhh", startTimeObject.getHours());
  //         console.log("hhhhh", startTimeObject.getMinutes());
  //         const startTimeH = startTimeObject.getHours();
  //         const startTimeM = startTimeObject.getMinutes();
  //         const endTimeH = endTimeObject.getHours();
  //         const endTimeM = endTimeObject.getMinutes();
  //         if (startDate !== null && endDate !== null && startTime == null && endTime == null) {
  //           return (
  //             (year > startDateY ||
  //               (year == startDateY && month > startDateM) ||
  //               (year == startDateY &&
  //                 month == startDateM &&
  //                 day >= startDateD)) &&
  //             (year < endDateY ||
  //               (year == endDateY && month < endDateM) ||
  //               (year == endDateY && month == endDateM && day <= endDateD))
  //           );
  //         } else if (startTime!==null && endTime!==null && startDate == null && endDate == null) {
  //           return (
  //             (hour > startTimeH ||
  //               (hour == startTimeH && min > startTimeM)) &&
  //             (hour < endTimeH ||
  //               (hour == endTimeH && min < endTimeM))
  //           );
  //         } else if(startTime!== null && endTime !== null && startDate!==null && endDate !==null){
  //           return (
  //             (year > startDateY ||
  //               (year == startDateY && month > startDateM) ||
  //               (year == startDateY &&
  //                 month == startDateM &&
  //                 day >= startDateD)) &&
  //             (year < endDateY ||
  //               (year == endDateY && month < endDateM) ||
  //               (year == endDateY && month == endDateM && day <= endDateD)) &&
  //             (hour > startTimeH || (hour == startTimeH && min > startTimeM)) &&
  //             (hour < endTimeH || (hour == endTimeH && min < endTimeM))
  //           );
  //         }
  //       } 
  //     });
  //     setFilteredData(filtered);
  // }, [startDate, endDate, startTime, endTime, inv]);

  console.log("Filterrrrrrrrrr", filteredData)
  const calculateTotalNumber = (data) => {
    return data.reduce((sum, item) => sum + item.TotalInvoices, 0);
  };
  const calculateTotalFinal = (data) => {
    return data.reduce((sum, item) => sum + item.totalFinal, 0);
  };
  const calculateGrossTotal = (data) => {
    return data.reduce((sum, item) => sum + item.GrossTotal, 0);
  };
  const calculateTotalQty = (data) => {
    return data.reduce((sum, item) => sum + item.TotalQty, 0);
  };

  const calculateTotalDiscount = (data) => {
    return data.reduce((sum, item) => sum + item.TotalDiscount, 0);
  };
  const calculateDiscValue = (data) => {
    return data.reduce((sum, item) => sum + item.discountValue, 0);
  };
  const calculateSrvValue = (data) => {
    return data.reduce((sum, item) => sum + item.serviceValue, 0);
  };
  const calculateTotalTax = (data) => {
    return data.reduce((sum, item) => sum + item.totalTax, 0);
  };

  const calculateTotalDisc = (data) => {
    return data.reduce((sum, item) => sum + item.disc, 0);
  };
  const calculateTotalSrv = (data) => {
    return data.reduce((sum, item) => sum + item.srv, 0);
  };

  useEffect(() => {
      fetch(`${url}/pos/getInvHistory/${companyName}`)
        .then((response) => response.json())
        .then((data) => {
          // Ensure that data is an object with the 'initialState' property

          if (Array.isArray(data)) {
            setInv(data);
            //setNumInv(calculateTotalNumber(data));
            setTotalInv(calculateTotalFinal(data));
            setGrossTotal(calculateGrossTotal(data));
            setTotalQty(calculateTotalQty(data));
            setSrvValue(calculateSrvValue(data));
            setDiscValue(calculateDiscValue(data));
            setTotalDiscount(calculateTotalDiscount(data));
            setTotalTax(calculateTotalTax(data));
            setDisc(calculateTotalDisc(data));
            setSrv(calculateTotalSrv(data));
          } else {
            console.error("Invalid data format received:", data);
          }
        })
        .catch((error) => console.error("Error fetching users", error));
    
  }, []);

  const renderTextCell = ({ value }) => {
    return <Typography variant="h4">{value}</Typography>;
  };

  const handleDoubleClick = () => {
    setOpenTotalDetail(true);
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
      field: "totalFinal",
      headerName: "Total",
      //flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 100,
      renderCell: renderTotalFinalCell,
      headerClassName: "header-cell",
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
          height: "15%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <Header title="Invoices History" />
        <Button
          component="h1"
          variant="contained"
          color="secondary"
          style={{ fontSize: "1.1rem" }}
          onDoubleClick={handleDoubleClick}
        >
          Total &nbsp;&nbsp;{Number(totalInv).toFixed(3)}
        </Button>
        <InvTotalDialog
          openTotalDetail={openTotalDetail}
          setOpenTotalDetail={setOpenTotalDetail}
          totalQty={totalQty}
          grossTotal={grossTotal}
          srv={srv}
          srvValue={srvValue}
          disc={disc}
          discValue={discValue}
          totalDiscount={totalDiscount}
          totalTax={totalTax}
          totalInv={totalInv}
        ></InvTotalDialog>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={handleStartDateChange}
            format="DD/MM/YYYY"
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={handleEndDateChange}
            format="DD/MM/YYYY"
          />
          <TimePicker
            label="Start Time"
            value={startDate}
            onChange={handleStartTimeChange}
          />
          <TimePicker
            label="End Time"
            value={endDate}
            onChange={handleEndTimeChange}
          />
        </LocalizationProvider>
        {/* <Button
            variant="contained"
            color="primary"
            sx={{ height: "100%", ml: "2%" }}
          >
            Apply
          </Button> */}
      </Box>
      <Box
        sx={{
          height: "80%",
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
          rows={
            filteredData.length > 0 ||
            startTime ||
            endTime ||
            startDate ||
            endDate
              ? filteredData
              : inv
          }
          columns={columns}
          getRowId={(row) => row.InvNo}
          //autoHeight
          {...(inv && inv.initialState)}
          initialState={{
            ...inv.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 20, 30]}
          disableSelectionOnClick // Add this line to disable selection on click
          onRowClick={(params) => {
            console.log("Params:", params);

            handleRowClick(params);
          }}
          pagination // Add this line to enable pagination
        />
      </Box>
      <InvDetailsModal
        isOpen={openInvDetailsModal}
        setOpenIvDetailsModal={setOpenIvDetailsModal}
        companyName={companyName}
        setSelectedInv={setSelectedInv}
        selectedInv={selectedInv}
        url={url}
      />
    </Box>
  );
};

export default Journal;
