import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton,
} from "@mui/material";

import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import { useState } from 'react';
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";

import { height } from '@mui/system';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";

const PoS = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedCategory, setSelectedCategory] = useState("Menu");
  const [quantity, setQuantity] = useState(1);
  
   const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const [selectedMeals, setSelectedMeals] = useState([]);

  const handleOrderClick = (mealId) => {
    // Check if the meal is already selected
    const isMealSelected = selectedMeals.some((meal) => meal.id === mealId);

    // If not selected, add to the selectedMeals array
    if (!isMealSelected) {
      setSelectedMeals((prevSelectedMeals) => [
        ...prevSelectedMeals,
        { id: mealId, quantity: 1 },
      ]);
    }
  }

  const meals = [
    { id: 1, title: "Meal 1", price: 10.99 },
    { id: 2, title: "Meal 2", price: 12.99 },
    { id: 3, title: "Meal 3", price: 8.99 },
    { id: 4, title: "Meal 4", price: 14.99 },
  ];

 return (
   <Box display="flex" height="90%">
     {/* First Box (70% width) */}
     <Box width="70%" padding={2}>
       {/* Filter Buttons with Icons */}
       <Box display="flex" justifyContent="space-between" marginBottom={2}>
         <Button
           style={{
             backgroundColor:
               selectedCategory === "Menu"
                 ? colors.greenAccent[500]
                 : colors.primary[500],
             color: selectedCategory === "Menu" ? colors.primary[500] : "black",
           }}
           startIcon={<FastfoodIcon />}
           onClick={() => handleCategoryClick("Menu")}
         >
           Menu
         </Button>
         <Button
           style={{
             backgroundColor:
               selectedCategory === "Cafe"
                 ? colors.greenAccent[500]
                 : colors.primary[500],
             color: selectedCategory === "Cafe" ? colors.primary[500] : "black",
           }}
           startIcon={<LocalCafeIcon />}
           onClick={() => handleCategoryClick("Cafe")}
         >
           Cafe
         </Button>
         <Button
           style={{
             backgroundColor:
               selectedCategory === "Restaurant"
                 ? colors.greenAccent[500]
                 : colors.primary[500],
             color:
               selectedCategory === "Restaurant"
                 ? colors.primary[500]
                 : "black",
           }}
           startIcon={<RestaurantIcon />}
           onClick={() => handleCategoryClick("Restaurant")}
         >
           Restaurant
         </Button>
         <Button
           style={{
             backgroundColor:
               selectedCategory === "Beverage"
                 ? colors.greenAccent[500]
                 : colors.primary[500],
             color:
               selectedCategory === "Beverage" ? colors.primary[500] : "black",
           }}
           startIcon={<EmojiFoodBeverageIcon />}
           onClick={() => handleCategoryClick("Beverage")}
         >
           Beverage
         </Button>
         {/* Add more buttons as needed */}
       </Box>
       {/* Cards in Grid Layout */}
       <Grid container spacing={2}>
         {meals.map((meal) => (
           <Grid item xs={12} sm={6} md={4} key={meal.id}>
             <Card>
               <CardMedia
                 component="img"
                 height="180"
                 image={`${process.env.PUBLIC_URL}/im${meal.id}.jpg`}
                 alt={`Meal ${meal.id}`}
               />
               <CardContent>
                 <Box
                   sx={{
                     display: "flex",
                     flexDirection: "row",
                     //marginX: 1,
                   }}
                 >
                   <Typography variant="h4">{meal.title}</Typography>

                   <Typography variant="body2">{`$${meal.price.toFixed(
                     2
                   )}`}</Typography>
                 </Box>
                 <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                   <Box display="flex" alignItems="center">
                     <IconButton
                     
                       onClick={() =>
                         setQuantity((prev) => Math.max(prev - 1, 1))
                       }
                     >
                       <RemoveCircleOutlineOutlinedIcon />
                     </IconButton>
                     <Typography variant="body1">{quantity}</Typography>
                     <IconButton
                       onClick={() => setQuantity((prev) => prev + 1)}
                     >
                       <AddCircleOutlineOutlinedIcon />
                     </IconButton>
                   </Box>

                   <Button
                     //  variant="outlined"
                     //  color="secondary"
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
                     onClick={() => handleOrderClick(meal.id)}
                   >
                     Choose
                   </Button>
                 </Box>
               </CardContent>
             </Card>
           </Grid>
         ))}
       </Grid>
     </Box>
     {/* Second Box (30% width) */}
     <Box
       width="30%"
       padding={2}
       height="100%"
       style={{ backgroundColor: colors.primary[500] }}
     >
       {/* Order Summary Box */}
       <Box sx={{ height: "5%" }}>
         <Typography variant="h6">Order Summary</Typography>
         <Box borderBottom="1px solid #ccc" my={1}></Box>
       </Box>

       {/* ListCards */}

       <Box
         sx={{
           height: "70%",
           width: "100%",
           alignContent: "center",
           overflowY: "auto",
           display: "flex",
           flexDirection: "column",
           gap: theme.spacing(2), // Add some spacing between each ListCard
         }}
       >
         {selectedMeals.map((selectedMeal) => (
           <Card key={selectedMeal.id}>
             <CardContent>
               <Box sx={{ display: "flex", flexDirection: "row" }}>
                 {/* Display the image here */}
                 <Box sx={{ height: "20%", width: "20%" }}>
                   <CardMedia
                     component="img"
                     height="50"
                     width="100%"
                     image={`${process.env.PUBLIC_URL}/im${selectedMeal.id}.jpg`}
                     alt={`Meal ${selectedMeal.id}`}
                   />
                 </Box>
                 <Box
                   display="flex"
                   flexDirection="column"
                   flex="1" // Allow this box to take the available space
                   padding="5px"
                 >
                   <Typography variant="h4">
                     {meals.find((meal) => meal.id === selectedMeal.id).title}
                   </Typography>
                   <Typography variant="h4" color="text.secondary">
                     {`$${meals
                       .find((meal) => meal.id === selectedMeal.id)
                       .price.toFixed(2)}`}
                   </Typography>
                 </Box>
                 {/* Quantity and buttons */}
                 <Box display="flex" alignItems="center">
                   <IconButton
                     onClick={() =>
                       setQuantity((prev) => Math.max(prev - 1, 1))
                     }
                   >
                     <RemoveCircleOutlineOutlinedIcon />
                   </IconButton>
                   <Typography variant="body1">{quantity}</Typography>
                   <IconButton onClick={() => setQuantity((prev) => prev + 1)}>
                     <AddCircleOutlineOutlinedIcon />
                   </IconButton>
                 </Box>
               </Box>
             </CardContent>
           </Card>
         ))}
       </Box>

       {/* Final Box */}
       <Box sx={{ height: "20%" }}>
         <Card>
           <CardContent>
             <Box display="flex" flexDirection="column" marginBottom={2}>
               <Typography variant="h6">Payment Summary</Typography>
               <Box
                 display="flex"
                 flexDirection="column"
                 alignItems="flex-end"
                 marginTop={1}
               >
                 <Typography variant="body2">Price: $10.99</Typography>
                 <Typography variant="body2" color="error">
                   Discount: -$2.00
                 </Typography>
               </Box>
             </Box>
             <Box marginTop={2}>
               <Button
                 variant="contained"
                 color="secondary"
                 sx={{ borderRadius: "20px", width: "100%" }}
               >
                 Place Order
               </Button>
             </Box>
           </CardContent>
         </Card>
       </Box>
     </Box>
   </Box>
 );

};

export default PoS;
