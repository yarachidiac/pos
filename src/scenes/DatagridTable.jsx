import React, { useState, useEffect } from "react";
import {

  Box,

} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";


export default function DatagridTable(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const handleRowClick = (params) => {
    props.setModalOpen(true);
    console.log("Ssssssssssssss", params.row.InvNo);
    props.setSelectedRow(params.row.InvNo);
  };
  return (
    <Box
      sx={{
        height: "90%",
        width: "100%",
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
          backgroundColor: colors.primary[500],
          color: colors.grey[800],
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          fontSize: "20px",
        },
        
        "& .css-zylse7-MuiButtonBase-root-MuiIconButton-root": {
          backgroundColor: colors.greenAccent[500],
          width: "100px",
          color: colors.primary[500],
          margin: "2px",
        },
        "& .css-smjw5k-MuiTablePagination-displayedRows": {
          fontSize: "1rem",
        },
        "& .css-rtrcn9-MuiTablePagination-root .MuiTablePagination-selectLabel":
          {
            fontSize: "1rem",
          },
        "& .css-rtrcn9-MuiTablePagination-root .MuiTablePagination-input": {
          fontSize: "1rem",
        },
      }}
    >
      <DataGrid
        rows={props.rows}
        columns={props.columns}
        getRowId={(row) => row.InvNo}
        initialState={{
          ...props.rows.initialState,
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 20, 30]}
        onRowClick={(params) => {
          console.log("Params:", params);
          handleRowClick(params);
        }}
      />
    </Box>
  );
}
