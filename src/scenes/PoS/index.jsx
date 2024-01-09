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
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { useEffect } from 'react';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const PoS = ({ companyName }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategoryCode, setSelectedCategoryCode] = useState("");
  //const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState([]);
  const [mealsCopy, setMealsCopy] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);

  useEffect(() => {
    const copy = meals.map((meal) => ({ ...meal, quantity: 1 }));
    setMealsCopy(copy);
  }, [meals]);

  useEffect(() => {
    fetchCategories();
    // Fetch categories when the component mounts
    fetchAllItems();
  }, []);


  useEffect(() => {
    // Fetch items when selectedCategoryCode changes
    if (selectedCategoryCode !== "") {
      fetchItemsCategory();
    }
  }, [selectedCategoryCode]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `http://192.168.16.128:8000/categories/${companyName}`
      );
      const data = await response.json();
      setCategories(data); // Assuming your API response has a 'categories' property
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleCategoryClick = (category) => {
    if (category === "All") {
      fetchAllItems();
      setSelectedCategory("All");
      setSelectedCategoryCode("");
    } else {
      setSelectedCategory(category.title);
      setSelectedCategoryCode(category.code);
    }
    console.log(selectedCategoryCode);   
  };


  const handleOrderClick = (mealId, newQuantity) => {
    const isMealSelected = selectedMeals.some((meal) => meal.code === mealId);

    if (!isMealSelected) {
      // Find the meal in mealsCopy
      const selectedMeal = mealsCopy.find((meal) => meal.code === mealId);

      setSelectedMeals((prevSelectedMeals) => [
        ...prevSelectedMeals,
        { ...selectedMeal, quantity: newQuantity },
      ]);
    }

    console.log("ana b aleb l click choose", selectedMeals);
  };

  const handleQuantityChange = (mealId, newQuantity) => {
    setSelectedMeals((prevSelectedMeals) =>
      prevSelectedMeals.map((meal) =>
        meal.code === mealId ? { ...meal, quantity: newQuantity } : meal
      )
    );

    setMealsCopy((prevMealsCopy) =>
      prevMealsCopy.map((meal) =>
        meal.code === mealId ? { ...meal, quantity: newQuantity } : meal
      )
    );
  };

 

  const fetchItemsCategory = async () => {
    try {
      const response = await fetch(
        `http://192.168.16.128:8000/categoriesitems/${companyName}/${selectedCategoryCode}`
      );
      const data = await response.json();
      setMeals(data); // Assuming your API response has a 'categories' property
    } catch (error) {
      console.error("Error fetching categoriesitems:", error);
    }
  };

  const fetchAllItems = async () => {
    try {
      const response = await fetch(
        `http://192.168.16.128:8000/allitems/${companyName}`
      );
      const data = await response.json();
      setMeals(data); // Assuming your API response has a 'categories' property
    } catch (error) {
      console.error("Error fetching categoriesitems:", error);
    }
  };
  console.log("mealssssssssssss", meals);

  console.log("selected mealllllllll", selectedMeals)

  const calculateTotalPrice = () => {
    let totalPrice = 0;

    selectedMeals.forEach((selectedMeal) => {
      // Use the selectedMeal directly from selectedMeals array
      const meal = selectedMeal;
      const price = meal.price || 0;
      const quantity = meal.quantity || 0;
      totalPrice += price * quantity;
    });

    return totalPrice.toFixed(2);
  };

  const handleDelete = (mealCode) => {
    // Filter out the selectedMeal with the given mealCode
    const updatedSelectedMeals = selectedMeals.filter(
      (meal) => meal.code !== mealCode
    );

    // Update the state with the filtered array
    setSelectedMeals(updatedSelectedMeals);
  };

  const handlePlace = async () => {
    try {
      // Make a POST request to the /invoiceitem endpoint
      const response = await fetch(
        `http://192.168.16.128:8000/invoiceitem/${companyName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedMeals),
        }
      );
      console.log("selecteddddddddd bl place order",selectedMeals);

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Reset selectedMeals to an empty array
        setSelectedMeals([]);
        setMealsCopy((prevMealsCopy) =>
          prevMealsCopy.map((meal) => ({ ...meal, quantity: 1 }))
        );
        console.log("Order placed successfully!");
      } else {
        console.error("Failed to place order:", response.statusText);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <Box display="flex" height="90%">
      {/* First Box (70% width) */}
      <Box width="70%" padding={2}>
        {/* Filter Buttons with Icons */}
        <Box display="flex" justifyContent="space-between" marginBottom={2}>
          <Button
            style={{
              backgroundColor:
                selectedCategory === "All"
                  ? colors.greenAccent[500]
                  : colors.primary[500],
              color: selectedCategory === "All" ? colors.primary[500] : "black",
            }}
            startIcon={<LocalCafeIcon />}
            onClick={() => handleCategoryClick("All")}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.code}
              style={{
                backgroundColor:
                  selectedCategory === category.title
                    ? colors.greenAccent[500]
                    : colors.primary[500],
                color:
                  selectedCategory === category.title
                    ? colors.primary[500]
                    : "black",
              }}
              startIcon={<LocalCafeIcon />}
              onClick={() => handleCategoryClick(category)}
            >
              {category.title}
            </Button>
          ))}
        </Box>
        {/* Cards in Grid Layout */}
        <Grid container spacing={2}>
          {mealsCopy.map((meal) => (
            <Grid item xs={12} sm={6} md={4} key={meal.code}>
              <Card>
                <CardMedia
                  component="img"
                  height="180"
                  src={`${process.env.PUBLIC_URL}/${companyName}/images/${meal.image}`}
                  alt={`Meal ${meal.code}`}
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
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Box display="flex" alignItems="center">
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(meal.code, meal.quantity - 1)
                        }
                      >
                        <RemoveCircleOutlineOutlinedIcon />
                      </IconButton>
                      <Typography variant="body1">{meal.quantity}</Typography>
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(meal.code, meal.quantity + 1)
                        }
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
                      onClick={() => handleOrderClick(meal.code, meal.quantity)}
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
            <Card key={selectedMeal.code}>
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  {/* Display the image here */}
                  <Box sx={{ height: "20%", width: "20%" }}>
                    <CardMedia
                      component="img"
                      height="50"
                      width="100%"
                      image={`${process.env.PUBLIC_URL}/${companyName}/images/${selectedMeal.image}`}
                      alt={`Meal ${selectedMeal.code}`}
                    />
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    flex="1" // Allow this box to take the available space
                    padding="5px"
                  >
                    <Typography variant="h4">{selectedMeal.title}</Typography>
                    <Typography variant="h4" color="text.secondary">
                      {`$${selectedMeal.price}`}
                    </Typography>
                  </Box>

                  {/* Quantity and buttons */}
                  <Box display="flex" alignItems="center">
                    <IconButton
                      onClick={() =>
                        handleQuantityChange(
                          selectedMeal.code,
                          selectedMeal.quantity - 1
                        )
                      }
                    >
                      <RemoveCircleOutlineOutlinedIcon />
                    </IconButton>
                    <Typography variant="body1">
                      {selectedMeal.quantity}
                    </Typography>
                    <IconButton
                      onClick={() =>
                        handleQuantityChange(
                          selectedMeal.code,
                          selectedMeal.quantity + 1
                        )
                      }
                    >
                      <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(selectedMeal.code)}>
                      <DeleteOutlineOutlinedIcon />
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
                  <Typography variant="body2">
                    Price: {calculateTotalPrice()}
                  </Typography>
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
                  onClick={() => handlePlace()}
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
