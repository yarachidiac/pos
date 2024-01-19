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
    fetchModifiers(companyName);
  }, [companyName]);

  const fetchModifiers = async (companyName) => {
    try {
      const response = await fetch(
        `http://192.168.16.147:8000/getModifiers/${companyName}`
      );
      const data = await response.json();
      setModifiers(data);
    } catch (error) {
      console.error("Error fetching modifiers:", error);
    }
  };

  const handleChooseModifier = (modifier) => {
    // Add the selected modifier to the array
    setSelectedModifiers([...selectedModifiers, modifier]);
  };

    const handleConfirmSelection = () => {
        console.log("selectedd Modifierssssssssssssssss",selectedModifiers);
        console.log("selected mealll for modifyyy",selectedMealForModify)
    // Pass the array of selected modifiers to the parent component
    handleAddMod(selectedModifiers, selectedMealForModify);
        // Close the dialog
    setSelectedModifiers([]);
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
          {modifiers.map((modifier) => (
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
                        "&:hover": {
                          backgroundColor: colors.greenAccent[500],
                          color: colors.primary[500],
                        },
                      }}
                      onClick={() => handleChooseModifier(modifier)}
                    >
                      Choose
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
