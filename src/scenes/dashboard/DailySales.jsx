import { useTheme, Typography, Box } from "@mui/material";
import { tokens } from "../../theme";
import DailySalesModal from "./DailySalesModal";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import DatagridTable from "../DatagridTable";
import { format as dateFnsFormat } from "date-fns";

const DailySales = ({ companyName, url }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [daily, setDaily] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [openSaleModal, setOpenSaleModal] = useState(false);
  const [selectedName, setSelectedName] = useState("");

    const handleRowClick = (params) => {
        setOpenSaleModal(true);
      setSelectedItem(params.row.ItemNo);
      setSelectedName(params.row.ItemName);
    }

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = dateFnsFormat(currentDate, "dd.MM.yyyy");
    fetch(`${url}/pos/allitemswithmod/${companyName}/${formattedDate}`)
      .then((response) => response.json())
      .then((data) => {
        // Ensure that data is an object with the 'initialState' property

        if (Array.isArray(data)) {
          setDaily(data);
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
      minWidth: 200,
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
    {
      field: "TotalQty",
      headerName: "Qty",
      headerAlign: "left",
      align: "left",
      renderCell: renderTextCell,
      headerClassName: "header-cell", // Apply the custom style to the header
      minWidth: 100,
      flex: "1",
    },
    {
      field: "TotalItem",
      headerName: "Total",
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
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
         alignItems:"center"
      }}
    >
      <Box sx={{alignItems:"flex-start"}}>
        <Header title="Daily Sales" />
      </Box>
      <DatagridTable
        rows={daily}
        columns={columns}
        getRowId={(row) => row.ItemNo}
        handleRowClick={handleRowClick }
      />
      <DailySalesModal
        isOpen={openSaleModal}
        setOpenSaleModal={setOpenSaleModal}
        companyName={companyName}
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        url={url}
        selectedName={selectedName}
      />
    </Box>
  );
};

export default DailySales;
