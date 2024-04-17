import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { height } from "@mui/system";
import KitchenDetails from "./KitchenDetails";
import Header from "../../components/Header";
import { Button } from "@mui/material";
import AddUserDialog from "../team/AddUserDialog";
import { useState, useEffect } from "react";
const Kitchen = ({ companyName, addTitle, setAddTitle}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [successMess, setSuccessMess] = useState();
  const [kitchenDetails, setKitchenDetails] = useState([]);
  const [kitchenDetailsCopy, setKitchenDetailsCopy] = useState([
    ...kitchenDetails,
  ]);

    const [unsavedChanges, setUnsavedChanges] = useState(false);
    const [prList, setPrList] = useState([]);

  const modalStyle = {
    background: colors.whiteblack[100],
    boxShadow: 24,
    pt: 2, // Set top padding to 2
    pr: 2, // Set right padding to 3
    pb: 2, // Set bottom padding to 3
    pl: 2, // Set left padding to 3
    width: "90%",
    height: "90%",
    display: "flex",
    flexDirection: window.innerWidth < 650 ? "row" : "column",
   
  };
    
    const handleAddUser = (title) => {
    setAddTitle(title);
    // Open the modal when "Add" button is clicked
    setIsDialogOpen(true);
    };
    
    
  useEffect(() => {
    const fetchStationDetails = async () => {
      try {
        const response = await fetch(
          `http://192.168.16.113:8000/kitchen/${companyName}`
        );
        if (response.ok) {
          const data = await response.json();
            setKitchenDetails(data);
            setKitchenDetailsCopy(data);
        } else {
          console.error("Failed to fetch company details");
        }
        const response1 = await fetch(
          `http://192.168.16.113:8000/prlist/${companyName}`
        );
        if (response1.ok) {
          const data = await response1.json();
          setPrList(data);
        } else {
          console.error("Failed to fetch company details");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };
    fetchStationDetails();
  }, []);
    
    const handleUserDetailsChange = async (newUserDetails) => {
    //   try {
    //     console.log("newUserDetailssssssssss", newUserDetails.name);
    //     const apiUrl = `http://192.168.16.113:8000/addusers/${companyName}/${newUserDetails.name}`;

    //     const response = await fetch(apiUrl, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(newUserDetails),
    //     });

    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }

    //     const responseData = await response.json();
    //     setSuccessMess(responseData.message);
    //     setTimeout(() => {
    //       setSuccessMess("");
    //     }, 2000);
    //     console.log("Response from the server:", responseData);

    //     // Fetch the details of the newly added user
    //     const userDetailsResponse = await fetch(
    //       `http://192.168.16.113:8000/getUserDetail/${companyName}/${newUserDetails.name}`
    //     );

    //     if (!userDetailsResponse.ok) {
    //       throw new Error(`HTTP error! Status: ${userDetailsResponse.status}`);
    //     }

    //     const userDetailsData = await userDetailsResponse.json();

    //     // Set the userDetails state with the details of the newly added user
    //     setUserDetails(userDetailsData);
    //     setUserDetailsCopy(userDetailsData);
    //     // Open the details modal
    //     setTimeout(() => {
    //       setIsDetailsModalOpen(true);
    //     }, 2000);
    //   } catch (error) {
    //     console.error("Error:", error.message);
    //   }
    };

    const handleCloseDialog = () => {
      // Close the dialog when needed
      setIsDialogOpen(false);
    };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "10%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box sx={{}}>
          <Header title="Kitchen Settings" />
        </Box>
        <Box>
          <Button
            variant="contained"
            color="secondary"
            style={{ fontSize: "1.1rem" }}
            onClick={() => handleAddUser("Add Kitchen Number")}
          >
            Add
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            ...modalStyle,
          }}
        >
          <KitchenDetails
            companyName={companyName}
            kitchenDetails={kitchenDetails}
            setKitchenDetails={setKitchenDetails}
            kitchenDetailsCopy={kitchenDetailsCopy}
            setKitchenDetailsCopy={setKitchenDetailsCopy}
            unsavedChanges={unsavedChanges}
            setUnsavedChanges={setUnsavedChanges}
            prList={prList}
            setPrList={setPrList}
          ></KitchenDetails>
          <AddUserDialog
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            onAdd={handleUserDetailsChange}
            successMess={successMess}
            title={addTitle}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Kitchen;
