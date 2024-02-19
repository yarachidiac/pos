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
  Stack
} from "@mui/material";
import Header from "../../components/Header";
import { useState, useEffect } from "react";
import SectionDialog from "./SectionDialog";
import { Link } from "react-router-dom";
import Tables from "./Tables";
import { useNavigate } from "react-router-dom";

const Section = ({addTitle, setAddTitle, companyName }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [successMess, setSuccessMess] = useState();
  const [sections, setSections] = useState([]);
  const [sectionName, setSectionName] = useState("");
  const [sectionNo, setSectionNo] = useState("");

  const navigate = useNavigate();
  const handleOpenTables = (sectionNo) => {
    navigate(`/tables/${sectionNo}`);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://192.168.16.113:8000/allsections/${companyName}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setSections(data); // Update sections state with fetched data
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

  const handleEditClick = (title) => {
    setAddTitle(title);
    setIsDialogOpen(true);

    // Handle edit action here
  };

  const onAdd = async (sectionInfo) => {
    try {
      if (addTitle === "Add Section") {
        console.log("newwwwwwwww sectionnnnnn", sectionInfo);
        const apiUrl = `http://192.168.16.113:8000/addsections/${companyName}`;

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
        const apiUrl = `http://192.168.16.113:8000/updateSections/${companyName}/${sectionNo}`;

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
      const sectionsResponse = await fetch(
        `http://192.168.16.113:8000/allsections/${companyName}`
      );

      if (!sectionsResponse.ok) {
        throw new Error(`HTTP error! Status: ${sectionsResponse.status}`);
      }

      const allsection = await sectionsResponse.json();

      // Set the userDetails state with the details of the newly added user
      setSections(allsection);
      // Open the details modal
    } catch (error) {
      console.error("Error:", error.message);
    }
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
          height: "10%",
          width: "90%",
          justifyContent: "space-around",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box sx={{ ml: "10%", mt: "2%" }}>
          <Header title="Section" subtitle="Choose Title" />
        </Box>
        <Box
          sx={{
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
            onClick={() => handleAddSection("Add Section")}
          >
            Add
          </Button>
        </Box>
      </Box>
      <Container sx={{ height: "90%" }}>
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
          {sections.map((section, index) => (
            <Grid key={section.SectionNo} item xs={12} sm={6} md={4} lg={3}>
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
                  {section.Name}
                </Typography>
                <ButtonBase
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  onClick={() => handleOpenTables(section.SectionNo)}
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
                  onClick={(event) => {
                    event.stopPropagation();
                    setSectionNo(section.SectionNo);
                    setSectionName(section.Name);
                    handleEditClick("Update Section");
                  }}
                >
                  Edit
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <SectionDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onAdd={onAdd}
        successMess={successMess}
        title={addTitle}
        sectionName={sectionName}
        sectionNo={sectionNo}
        setSectionName={setSectionName}
        setSectionNo={setSectionNo}
      />
    </Box>
  );
};

export default Section;
