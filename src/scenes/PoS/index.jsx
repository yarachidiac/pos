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
import NumericKeypad from './NumericKeybad';
import { format } from "date-fns";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import ModifierDialog from './ModifierDialaog';

const PoS = ({companyName, branch, invType,  isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategoryCode, setSelectedCategoryCode] = useState("");
  //const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState([]);
  const [mealsCopy, setMealsCopy] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [isNumericKeypadOpen, setNumericKeypadOpen] = useState(false);
  const [discValue, setDiscValue] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [srv, setSrv] = useState(0);
  const [numericKeypadType, setNumericKeypadType] = useState("Discount");
  const [isModifierDialogOpen, setIsModifierDialogOpen] = useState(false);
  const [selectedMealForModify, setSelectedMealForModify] = useState();
  const [selectedModifiers, setSelectedModifiers] = useState([]);

  const handleModify = (index) => {
    setSelectedMealForModify(index);
    // Open the modifier dialog
    setIsModifierDialogOpen(true);
  };
  const handleCloseModifierDialog = () => {
    // Close the modifier dialog
    setIsModifierDialogOpen(false);
  };


  const handleAddMod = () => {
    console.log("selected Modifierssssssssssssssss", selectedModifiers);

    // Update the state with the modified selectedMeals array
    setSelectedMeals((prevSelectedMeals) =>
      prevSelectedMeals.map((meal) => {
        // Check if the meal has any chosenModifiers to update
        const correspondingChosenModifier = selectedModifiers.find(
          (item) => item.index === meal.index
        );

        // If corresponding chosenModifier is found, update the chosenModifiers for the meal
        if (correspondingChosenModifier) {
          const updatedModifiers = correspondingChosenModifier.modifiers.map(
            (modifier) => ({
              ItemNo: modifier.ItemNo,
              ItemName: modifier.ItemName,
            })
          );

          return {
            ...meal,
            chosenModifiers: updatedModifiers,
          };
        }
        return meal;
      })
    );
  };

  const handleOpenNumericKeypad = (type) => {
    setNumericKeypadType(type);
    setNumericKeypadOpen(true);
  };

  const handleCloseNumericKeypad = () => {
    setNumericKeypadOpen(false);
  };
  const handleSubmit = (value) => {
    // Handle the submitted discount value
    if (numericKeypadType === "Discount") {
      setDiscValue(value);
      console.log("Discount submitted:", value);

    } else if (numericKeypadType === "Service") {
      setSrv(value);
    }
   };

  useEffect(() => {
    const copy = meals.map((meal) => ({ ...meal, quantity: 1 }));
    setMealsCopy(copy);
    console.log("haydeeeeeeeeeeee l copy kel ma tetghayar l meal", mealsCopy)
  }, [meals]);
    console.log(" l copy kel ma tetghayar l meal", mealsCopy);

  useEffect(() => {
    fetchCategories();
    // Fetch categories when the component mounts
    fetchAllItems();
  }, []);

  console.log("the branch and the SATYpe", branch, invType);
  console.log("company in pos ", companyName)
  

  
  useEffect(() => {
    // Fetch items when selectedCategoryCode changes
    if (selectedCategoryCode !== "") {
      fetchItemsCategory();
    }
  }, [selectedCategoryCode]);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `http://192.168.16.113:8000/categories/${companyName}`
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
      setSelectedCategory(category.GroupName);
      setSelectedCategoryCode(category.GroupNo);
    }
    console.log(selectedCategoryCode);   
  };


  const handleOrderClick = (mealId, newQuantity) => {
    setMealsCopy((prevMealsCopy) =>
      prevMealsCopy.map((meal) =>
        meal.ItemNo === mealId ? { ...meal, quantity: 1 } : meal
      )
    );
    // Find the meal in mealsCopy
    const selectedMeal = mealsCopy.find((meal) => meal.ItemNo === mealId);

    // Add the meal to selectedMeals with a new index
    setSelectedMeals((prevSelectedMeals) => [
      ...prevSelectedMeals,
      {
        ...selectedMeal,
        quantity: newQuantity,
        index: prevSelectedMeals.length,
      },
    ]);
  };

  const handleQuantityChange = (index, newQuantity) => {
    setSelectedMeals((prevSelectedMeals) =>
      prevSelectedMeals.map((meal) =>
        meal.index === index ? { ...meal, quantity: newQuantity } : meal
      )
    );

    // setMealsCopy((prevMealsCopy) =>
    //   prevMealsCopy.map((meal) =>
    //     meal.ItemNo === mealId ? { ...meal, quantity: newQuantity } : meal
    //   )
    // );
  };


  const handleQuantityChangeGrid = (mealId, newQuantity) => {
    setMealsCopy((prevMealsCopy) =>
      prevMealsCopy.map((meal) =>
        meal.ItemNo === mealId ? { ...meal, quantity: newQuantity } : meal
      )
    );
  };
 

  const fetchItemsCategory = async () => {
    try {
      const response = await fetch(
        `http://192.168.16.113:8000/categoriesitems/${companyName}/${selectedCategoryCode}`
      );
      const data = await response.json();
      setMeals(data); // Assuming your API response has a 'categories' property
      console.log("haydeeeeeeeeeeee l copy kel ma tetghayar l meal", meals);
    } catch (error) {
      console.error("Error fetching categoriesitems:", error);
    }
  };

  const fetchAllItems = async () => {
    try {
      const response = await fetch(
        `http://192.168.16.113:8000/allitems/${companyName}`
      );
      const data = await response.json();
      setMeals(data); // Assuming your API response has a 'categories' property
    } catch (error) {
      console.error("Error fetching categoriesitems:", error);
    }
  };
  console.log("mealssssssssssss", meals);

  console.log("selected mealllllllll", selectedMeals)

  const calculateTotalDiscountedPrice = () => {
    let totalPrice = 0;

    selectedMeals.forEach((selectedMeal) => {
      // Use the selectedMeal directly from selectedMeals array
      const meal = selectedMeal;
      const price = meal.UPrice || 0;
      const quantity = meal.quantity || 0;
      const Disc = meal.Disc || 0;
      totalPrice += price * (1-Disc/100) * quantity;
    });

    return totalPrice.toFixed(2);
  };

  const calculateTotalTax = () => {
    let totalTax = 0;
    selectedMeals.forEach((selectedMeal) => {
      const meal = selectedMeal;
      const tax = meal.Tax || 0;
      totalTax += (meal.UPrice * (1 - meal.Disc / 100) * tax/100);
    })
    return totalTax.toFixed(2);
  }

   useEffect(() => {
     const newFinalTotal = totalFinal;

     setFinalTotal(newFinalTotal);
   }, [calculateTotalDiscountedPrice, discValue, calculateTotalTax]);

  const handleDelete = (mealCode) => {
    // Filter out the selectedMeal with the given mealCode
    const updatedSelectedMeals = selectedMeals.filter(
      (meal) => meal.index !== mealCode
    );

    // Update the state with the filtered array
    setSelectedMeals(updatedSelectedMeals);
    setSelectedModifiers([]);
  };

  const handlePlace = async () => {
    try {
      const currentDate = new Date();
      const formattedDateTime = format(currentDate, "dd-MM-yyyy HHmmss");

      console.log("CURRENTTTTTTTTTTdateeeeeeeeeeeeeeeee", currentDate);
      console.log("formatted dateeeeeeee", formattedDateTime)

      // Make a POST request to the /invoiceitem endpoint
      const response = await fetch(
        `http://192.168.16.113:8000/invoiceitem/${companyName}/${branch}/${invType}/${formattedDateTime}/${discValue}/${srv}`,
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
        setSelectedModifiers([]);
        console.log("emptyyy chosenModifier", selectedMeals);
        setSelectedMeals([]);
        setMealsCopy((prevMealsCopy) =>
          prevMealsCopy.map((meal) => ({ ...meal, quantity: 1 }))
        );
        setFinalTotal(0);
        setDiscValue(0);
        setSrv(0);
        console.log("Order placed successfully!");
      } else {
        console.error("Failed to place order:", response.statusText);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

    const grossTotal = parseFloat(calculateTotalDiscountedPrice());
    const serviceValue = (grossTotal * srv / 100);
    const discountValue = ((grossTotal + serviceValue) * discValue/100);
  const totalDiscount = (grossTotal + serviceValue) * (1 - discValue / 100);
  console.log("dddddddddddddddddddddddddddd", totalDiscount);
  let totalTax = 0;
  if (
    selectedMeals &&
    selectedMeals.length > 0 &&
    selectedMeals[0]["Tax"] !== undefined
  ) {
    
      const totalTaxSD = ((parseFloat(calculateTotalTax()) * (1 + srv/100))
       * (1 - discValue / 100))
    console.log(totalTaxSD);
        const totall= ((serviceValue * selectedMeals[0]["Tax"] / 100) * (1 - discValue / 100))
    console.log(totall);
    totalTax = totalTaxSD + totall;
  } 
  console.log("total taxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", totalTax);
  const totalFinal = totalDiscount + totalTax;
  console.log("totalllll finalllllllll", totalFinal);
  console.log("the finall meal with details", selectedMeals);

  return (
    <>
      {/* First Box (70% width) */}
      <Box width="70%" padding={2} height="90%">
        {/* Filter Buttons with Icons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "3%",
            height: "7%",
            width: "98%",
          }}
        >
          <Button
            style={{
              backgroundColor:
                selectedCategory === "All"
                  ? colors.greenAccent[500]
                  : colors.primary[500],
              color: selectedCategory === "All" ? colors.primary[500] : "black",
              //borderRadius: "20px",
            }}
            startIcon={<LocalCafeIcon />}
            onClick={() => handleCategoryClick("All")}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category.GroupNo}
              style={{
                backgroundColor:
                  selectedCategory === category.GroupName
                    ? colors.greenAccent[500]
                    : colors.primary[500],
                color:
                  selectedCategory === category.GroupName
                    ? colors.primary[500]
                    : "black",
              }}
              startIcon={<LocalCafeIcon />}
              onClick={() => handleCategoryClick(category)}
            >
              {category.GroupName}
            </Button>
          ))}
        </Box>
        {/* Cards in Grid Layout */}
        <Box sx={{ overflowY: "auto", height: "90%" }}>
          <Grid container spacing={2}>
            {mealsCopy.map((meal) => (
              <Grid item xs={12} sm={6} md={4} key={meal.ItemNo}>
                <Card sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="180"
                    src={`${process.env.PUBLIC_URL}/${companyName}/images/${meal.Image}`}
                    alt={`Meal ${meal.ItemNo}`}
                  />
                  {meal.Disc !== null && meal.Disc !== 0 && (
                    <Box
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
                      {meal.Disc !== null && meal.Disc !== 0 && (
                        <Typography>{`-${meal.Disc}%`}</Typography>
                      )}
                      {/* {meal.Tax !== null && meal.Tax !== 0 && (
                      <Typography>{`+${meal.Tax}%`}</Typography>
                    )} */}
                    </Box>
                  )}
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        //marginX: 1,
                      }}
                    >
                      <Typography variant="h4">{meal.ItemName}</Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          textDecoration:
                            meal.Disc || meal.Tax ? "line-through" : "none",
                        }}
                      >
                        {`$${meal.UPrice.toFixed(2)}`}
                      </Typography>

                      {meal.Tax !== null && meal.Tax !== 0 && (
                        <Typography variant="body2">{`$${(
                          meal.UPrice +
                          meal.UPrice * (meal.Tax / 100)
                        ).toFixed(2)}`}</Typography>
                      )}
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Box display="flex" alignItems="center">
                        <IconButton
                          onClick={() =>
                            handleQuantityChangeGrid(
                              meal.ItemNo,
                              meal.quantity - 1
                            )
                          }
                        >
                          <RemoveCircleOutlineOutlinedIcon
                            sx={{ fontSize: "35px" }}
                          />
                        </IconButton>
                        <Typography variant="body1">{meal.quantity}</Typography>
                        <IconButton
                          onClick={() =>
                            handleQuantityChangeGrid(
                              meal.ItemNo,
                              meal.quantity + 1
                            )
                          }
                        >
                          <AddCircleOutlineOutlinedIcon
                            sx={{ fontSize: "35px" }}
                          />
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
                        onClick={() =>
                          handleOrderClick(meal.ItemNo, meal.quantity)
                        }
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
      </Box>
      {/* Second Box (30% width) */}

      <Box
        sx={{
          height: "100%",
          width: isCollapsed ? "30%" : "26%",
          top: 0,
          right: 0,
          position: "absolute",
          paddingLeft: "1%",
          paddingTop: "1%",
        }}
      >
        <Box sx={{ height: "60%", backgroundColor: colors.primary[500] }}>
          {/* Order Summary Box */}
          <Box sx={{ height: "10%" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", paddingLeft: "10 px"}}>Order Summary</Typography>
            <Box borderBottom="1px solid #ccc" my={1}></Box>
          </Box>

          {/* ListCards */}

          <Box
            sx={{
              height: "90%",
              width: "100%",
              alignContent: "center",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: theme.spacing(2), // Add some spacing between each ListCard
            }}
          >
            {selectedMeals.map((selectedMeal) => (
              <Box sx={{ width: "100%" }}>
                <Card key={selectedMeal.index}>
                  <CardContent //sx={{ width: "100%" }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <IconButton
                        sx={{ width: "7%" }}
                        // sx={{ width: "10%" }}
                        onClick={() => handleDelete(selectedMeal.index)}
                      >
                        <DeleteOutlineOutlinedIcon sx={{ fontSize: "30px" }} />
                      </IconButton>
                      {/* Display the image here */}
                      {/* <Box
                        sx={{
                          height: "30%",
                          width: "20%",
                          alignItems: "center",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="50"
                          width="100%"
                          image={`${process.env.PUBLIC_URL}/${companyName}/images/${selectedMeal.Image}`}
                          alt={`Meal ${selectedMeal.ItemNo}`}
                        />
                      </Box> */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          //flex: "1", // Allow this box to take the available space
                          padding: "5px",
                          height: "100%",
                          width: "43%",
                        }}
                      >
                        <Typography
                          variant="h4"
                          style={{
                            display: "inline",
                            height: "20%",
                            width: "100%",
                          }}
                        >
                          {selectedMeal.ItemName}
                          {selectedMeal.Tax !== null &&
                            selectedMeal.Tax !== 0 && (
                              <Typography style={{ display: "inline" }}>
                                *
                              </Typography>
                            )}
                        </Typography>
                        <Typography
                          variant="h4"
                          color="text.secondary"
                          style={{ height: "10%", width: "100%" }}
                        >
                          {`$${
                            selectedMeal.UPrice -
                            (selectedMeal.UPrice * selectedMeal.Disc) / 100
                          }`}
                        </Typography>
                        {selectedMeal.chosenModifiers !== undefined && (
                          <Typography style={{ height: "50%", width: "100%" }}>
                            {selectedMeal.chosenModifiers.map(
                              (modifier, index) => (
                                <span key={index}>
                                  {index > 0 && ", "}{" "}
                                  {/* Add a comma if not the first modifier */}
                                  {modifier.ItemName}
                                </span>
                              )
                            )}
                          </Typography>
                        )}
                      </Box>

                      {/* Quantity and buttons */}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "50%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            width: "30%",
                          }}
                        >
                          <IconButton
                            onClick={() =>
                              handleQuantityChange(
                                selectedMeal.index,
                                selectedMeal.quantity - 1
                              )
                            }
                          >
                            <RemoveCircleOutlineOutlinedIcon
                              sx={{ fontSize: "35px" }}
                            />
                          </IconButton>
                          <Typography variant="body1" sx={{ width: "25%" }}>
                            {selectedMeal.quantity}
                          </Typography>
                          <IconButton
                            //sx={{ width: "10%" }}
                            onClick={() =>
                              handleQuantityChange(
                                selectedMeal.index,
                                selectedMeal.quantity + 1
                              )
                            }
                          >
                            <AddCircleOutlineOutlinedIcon
                              sx={{ fontSize: "35px" }}
                            />
                          </IconButton>
                        </Box>

                        <IconButton
                          sx={{ width: "20%" }}
                          onClick={() => handleModify(selectedMeal.index)}
                        >
                          <AutoFixHighOutlinedIcon sx={{ fontSize: "35px" }} />
                        </IconButton>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>
        {/* Final Box */}
        <Box sx={{ height: "40%" }}>
          <Card
            style={{
              height: "100%",
              backgroundColor: colors.primary[400],
            }}
          >
            <CardContent
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ height: "10%" }}>
                <Typography variant="h4" fontWeight="bold">
                  Payment Summary
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "10%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h4">Gross Total</Typography>
                <Typography variant="h4">${grossTotal}</Typography>
              </Box>
              <Box
                sx={{
                  height: "12%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() => handleOpenNumericKeypad("Service")}
                  sx={{
                    borderRadius: "20px",
                    border: `2px solid ${colors.greenAccent[500]}`,
                    color: colors.greenAccent[500],
                  }}
                >
                  Service
                </Button>
                <Typography variant="h4">{srv}%</Typography>
                <Typography variant="h4">${serviceValue.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{
                  height: "12%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() => handleOpenNumericKeypad("Discount")}
                  sx={{
                    borderRadius: "20px",
                    border: `2px solid ${colors.greenAccent[500]}`,
                    color: colors.greenAccent[500],
                  }}
                >
                  Discount
                </Button>
                <Typography variant="h4">{discValue}%</Typography>
                <Typography variant="h4">
                  ${discountValue.toFixed(2)}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "10%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h4">Total</Typography>
                <Typography variant="h4">
                  ${totalDiscount.toFixed(2)}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "10%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h4">Tax</Typography>
                {selectedMeals && selectedMeals.length > 0 && (
                  <Typography variant="h4">
                    {selectedMeals[0]["Tax"]}%
                  </Typography>
                )}

                <Typography variant="h4">${totalTax.toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{
                  height: "10%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h4">Total</Typography>
                <Typography variant="h4">${finalTotal.toFixed(2)}</Typography>
              </Box>
              <NumericKeypad
                open={isNumericKeypadOpen}
                onClose={handleCloseNumericKeypad}
                onSubmit={handleSubmit}
                type={numericKeypadType}
              />
              <Box sx={{ height: "10%" }}>
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
      <ModifierDialog
        open={isModifierDialogOpen}
        onClose={handleCloseModifierDialog}
        companyName={companyName} // Pass the company name as a prop
        handleAddMod={handleAddMod}
        selectedMealForModify={selectedMealForModify}
        selectedModifiers={selectedModifiers}
        setSelectedModifiers={setSelectedModifiers}
      />
    </>
  );
};

export default PoS;
