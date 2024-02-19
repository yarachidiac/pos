import React from "react";
import { tokens } from "../../theme";

import {
  Box,
  Button,
  ButtonBase,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import TableDialog from "./TableDialog";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Tables = ({ addTitle, setAddTitle, companyName }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [successMess, setSuccessMess] = useState();
    const [tables, setTables] = useState([]);
    const [tableNo, setTableNo] = useState("");
    const [tableWaiter, setTableWaiter] = useState("");
    const [active, setActive] = useState("");
    const [description, setDescription] = useState("");
    const { sectionNo } = useParams();
    const [selectedTableId, setSelectedTableId] = useState("");  
    const navigate = useNavigate();

  console.log("section no in tablesssss", sectionNo)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.16.113:8000/alltables/${companyName}/${sectionNo}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTables(data); // Update sections state with fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call fetchData function when component mounts or companyName changes
  }, [companyName]); // Run useEffect whenever companyName changes

  const handleAddSection = (title) => {
    setAddTitle(title);
    // Open the modal when "Add" button is clicked
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    // Close the dialog when needed
    setIsDialogOpen(false);
  };

  const handleEditClick = (title, tableNo) => {
    setSelectedTableId(tableNo);
    setAddTitle(title);
    setIsDialogOpen(true);
    // Handle edit action here
  };
    console.log("Edit clicked for:", tableNo);

  const onAdd = async (sectionInfo) => {
    try {
      if (addTitle === "Add Table") {
        console.log("newwwwwwwww sectionnnnnn", sectionInfo);
        const apiUrl = `http://192.168.16.113:8000/addtables/${companyName}/${sectionNo}`;

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sectionInfo),
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
      } else {
        const apiUrl = `http://192.168.16.113:8000/updateTables/${companyName}/${sectionNo}/${selectedTableId}`;

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sectionInfo),
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
      }
      // Fetch the details of the newly added user
      const tablesResponse = await fetch(
        `http://192.168.16.113:8000/alltables/${companyName}/${sectionNo}`
      );

      if (!tablesResponse.ok) {
        throw new Error(`HTTP error! Status: ${tablesResponse.status}`);
      }

        const alltable = await tablesResponse.json();

      // Set the userDetails state with the details of the newly added user
      setTables(alltable);
      // Open the details modal
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleOpenPOS = (tableNo) => {
    window.location.href = `/PoS?selectedTableId=${tableNo}`;
  };

  return (
    <Box
      sx={{
        height: "90%",
        width: "100%",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          height: "20%",
          width: "90%",
          justifyContent: "space-around",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box sx={{ ml: "10%", mt: "2%"}}>
          <Header title="Table" subtitle="Choose Table" />
        </Box>
        <Box
          sx={{
            height: "100%",
            width: "10%",
            marginLeft: "auto",
            justifyContent: "flex-end",
            alignContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            style={{ fontSize: "1.1rem" }}
            onClick={() => handleAddSection("Add Table")}
          >
            Add
          </Button>
        </Box>
      </Box>
      <Container sx={{ height: "80%" }}>
        <Grid
          container
          spacing={2}
          sx={{
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            overflow: "auto",
          }}
        >
          {tables.map((table) => (
            <Grid key={table.TableNo} item xs={12} sm={6} md={4} lg={3}>
              <Box
                position="relative"
                width="100%"
                paddingTop="100%"
                bgcolor={colors.blueAccent[800]}
              >
                <Typography
                  variant="h5"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {table.TableNo}
                </Typography>
                <ButtonBase
                  component={Link}
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={() => handleOpenPOS(table.TableNo)}
                />
                <Button
                  size="large"
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    backgroundColor: colors.greenAccent[500],
                    color: colors.primary[500],
                    zIndex: 1, // Ensure the Edit button is above the ButtonBase
                  }}
                  onClick={() => {
                    console.log("honnnnnnnnnnnnnn", table.TableNo);
                    setTableNo(table.TableNo);
                    setTableWaiter(table.TableWaiter);
                    setActive(table.Active);
                    setDescription(table.Description)
                    handleEditClick("Update Table", table.TableNo);
                  }}
                >
                  Edit
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <TableDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onAdd={onAdd}
        successMess={successMess}
        title={addTitle}
        tableNo={tableNo}
        setTableNo={setTableNo}
        tableWaiter={tableWaiter}
        setTableWaiter={setTableWaiter}
        active={active}
        setActive={setActive}
        description={description}
        setDescription={setDescription}
      />
    </Box>
  );
};

export default Tables;
