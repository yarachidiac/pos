import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { height } from "@mui/system";
import Header from "../../components/Header";
import { Button } from "@mui/material";
import AddUserDialog from "../team/AddUserDialog";
import { useState, useEffect } from "react";
import CurrencyDetails from "./CurrencyDetails";
import Keyboard from "../form/Keyboard";

const Currency = ({ companyName, addTitle, setAddTitle, url, activeField, setActiveField, showKeyboard,
setShowKeyboard, currencyDetails, setCurrencyDetails, currencyDetailsCopy, setCurrencyDetailsCopy}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [successMess, setSuccessMess] = useState();
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
    const fetchCurrencyDetails = async () => {
      try {
        const response = await fetch(`${url}/pos/currency/${companyName}`);
        if (response.ok) {
          const data = await response.json();
          console.log("akanfkenf", data);
            setCurrencyDetails(data);
            setCurrencyDetailsCopy(data);
        } else {
          console.error("Failed to fetch company details");
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };
    fetchCurrencyDetails();
  }, []);
    
    const handleCurrencyDetailsChange = async (newKitchenDetails) => {
      try {
        console.log("newUserDetailssssssssss", newKitchenDetails.name);
        const apiUrl = `${url}/pos/addCurrency/${companyName}`;

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newKitchenDetails),
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

        // Fetch the details of the newly added user
        const CurrencyDetailsResponse = await fetch(
          `${url}/pos/currency/${companyName}`
        );

        if (!CurrencyDetailsResponse.ok) {
          throw new Error(
            `HTTP error! Status: ${CurrencyDetailsResponse.status}`
          );
        }

        const CurrencyDetailsData = await CurrencyDetailsResponse.json();

        // Set the userDetails state with the details of the newly added user
        setCurrencyDetails(CurrencyDetailsData);
        setCurrencyDetailsCopy(CurrencyDetailsData);
        // Open the details modal
        // setTimeout(() => {
        //   setIsDetailsModalOpen(true);
        // }, 2000);
      } catch (error) {
        console.error("Error:", error.message);
      }
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
          //justifyContent: "space-around",
          //alignItems: "center",
        }}
      >
        <Box sx={{ width: "50%", m: "2%" }}>
          <Header title="Currency Settings" />
        </Box>
        <Box
          sx={{
            width: "10%",
            marginLeft: "auto",
            justifyContent: "flex-end",
            alignContent: "center",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            style={{ fontSize: "1.1rem" }}
            onClick={() => handleAddUser("Add Currency Number")}
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
          <CurrencyDetails
            companyName={companyName}
            currencyDetails={currencyDetails}
            setCurrencyDetails={setCurrencyDetails}
            currencyDetailsCopy={currencyDetailsCopy}
            setCurrencyDetailsCopy={setCurrencyDetailsCopy}
            unsavedChanges={unsavedChanges}
            setUnsavedChanges={setUnsavedChanges}
            url={url}
            activeField={activeField}
            setActiveField={setActiveField}
            showKeyboard={showKeyboard}
            setShowKeyboard={setShowKeyboard}
          ></CurrencyDetails>
          <AddUserDialog
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            onAdd={handleCurrencyDetailsChange}
            successMess={successMess}
            title={addTitle}
          />
        </Box>   
      </Box>
    </Box>
  );
};
export default Currency;
