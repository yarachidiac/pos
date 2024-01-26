import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CardMedia,
} from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

const ModifierDialog = ({
  open,
  onClose,
  companyName,
  handleAddMod,
  selectedMealForModify,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [modifiers, setModifiers] = useState([]);
  const [selectedModifiers, setSelectedModifiers] = useState([]);

  useEffect(() => {
    // Fetch modifiers based on the company name
    fetchModifiers();
  }, []);

  const fetchModifiers = async () => {
    try {
      const response = await fetch(
        `http://192.168.16.113:8000/getModifiers/${companyName}`
      );
      const data = await response.json();
      setModifiers(data);
    } catch (error) {
      console.error("Error fetching modifiers:", error);
    }
  };

const handleChooseModifier = (modifier) => {
  setSelectedModifiers((prevSelectedModifiers) => {
    const isItemAlreadySelected = prevSelectedModifiers.some(
      (item) => item.ItemNo === selectedMealForModify
    );

    if (!isItemAlreadySelected) {
      // If the item is not already selected, add a new object to the array
      const newModifiersArray = [
        ...prevSelectedModifiers,
        {
          ItemNo: selectedMealForModify,
          modifiers: [modifier],
        },
      ];

      console.log("After adding new item:", newModifiersArray);

      return newModifiersArray;
    }

    // If the item is already selected, check if the modifier is already present
    const updatedModifiersArray = prevSelectedModifiers.map((item) =>
      item.ItemNo === selectedMealForModify
        ? {
            ...item,
            modifiers: item.modifiers.some(
              (existingModifier) => existingModifier.ItemNo === modifier.ItemNo
            )
              ? item.modifiers.filter(
                  (existingModifier) =>
                    existingModifier.ItemNo !== modifier.ItemNo
                ) // If already present, remove the modifier
              : [...item.modifiers, modifier], // Otherwise, add the modifier
          }
        : item
    );

    console.log("After updating existing item:", updatedModifiersArray);

    return updatedModifiersArray;
  });
};


const handleConfirmSelection = () => {
  // console.log("selectedd Modifierssssssssssssssss", selectedModifiers);
  console.log("selected mealll for modifyyy", selectedMealForModify);

  // Pass the flattened array of selected modifiers to the parent component
  handleAddMod(selectedModifiers);

  // Close the dialog
  onClose();
};


  return (
    <Modal open={open} onClose={onClose} companyName={companyName}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          height: "90%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Grid container spacing={2} sx={{ overflow: "auto", height: "100%" }}>
          {Array.isArray(modifiers) &&
            modifiers.map((modifier) => (
              <Grid item xs={12} sm={6} md={3} key={modifier.id}>
                <Card sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="180"
                    src={`${process.env.PUBLIC_URL}/${companyName}/images/${modifier.Image}`}
                    alt={`Modifier ${modifier.ItemNo}`}
                  />
                  {/* <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    backgroundColor: "red", // Add your preferred styling
                    padding: "0.2rem 0.5rem",
                    color: "#fff",
                    fontSize: "1.4rem",
                  }}
                >
                  <Typography></Typography>
                </Box> */}
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Typography variant="h4">{modifier.ItemName}</Typography>
                      <Typography variant="body2"></Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        flexDirection: "row",
                      }}
                    >
                      <Button
                        sx={{
                          fontSize: "0.9rem",
                          borderRadius: "20px",
                          border: `2px solid ${colors.greenAccent[500]}`,
                          color: colors.greenAccent[500],
                          backgroundColor: selectedModifiers.some(
                            (meal) =>
                              meal.ItemNo === selectedMealForModify &&
                              meal.modifiers.some(
                                (selectedModifier) =>
                                  selectedModifier.ItemNo === modifier.ItemNo
                              )
                          )
                            ? colors.greenAccent[500] // Set background color to green for selected modifiers
                            : "inherit", // Set to default background color
                          color: selectedModifiers.some(
                            (meal) =>
                              meal.ItemNo === selectedMealForModify &&
                              meal.modifiers.some(
                                (selectedModifier) =>
                                  selectedModifier.ItemNo === modifier.ItemNo
                              )
                          )
                            ? colors.primary[500] // Set background color to green for selected modifiers
                            : colors.greenAccent[500],
                        }}
                        onClick={() => handleChooseModifier(modifier)}
                      >
                        {selectedModifiers.some(
                          (meal) =>
                            meal.ItemNo === selectedMealForModify &&
                            meal.modifiers.some(
                              (selectedModifier) =>
                                selectedModifier.ItemNo === modifier.ItemNo
                            )
                        )
                          ? "Unchoose" // If the modifier is selected, show "Unchoose"
                          : "Choose"}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
        <Button onClick={handleConfirmSelection}>Close</Button>
      </Box>
    </Modal>
  );
};

export default ModifierDialog;
