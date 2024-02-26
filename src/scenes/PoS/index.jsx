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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";

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
import printJS from "print-js";
import FileSaver from "file-saver";
import { resolveBreakpointValues } from '@mui/system/breakpoints';
import { useRefresh } from '../RefreshContex';
import { useLocation } from "react-router-dom";

const PoS = ({ companyName, branch, invType, isCollapsed, selectedRow, setSelectedRow, oldItemNo, newItemNo, username }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategoryCode, setSelectedCategoryCode] = useState("");
  //const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState([]);
  const [mealsCopy, setMealsCopy] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedMeals, setSelectedMeals] = useState(() => {
    const storedMeals = localStorage.getItem("selectedMeals");
    return storedMeals ? JSON.parse(storedMeals) : [];
  });
  const [isNumericKeypadOpen, setNumericKeypadOpen] = useState(false);
  const [discValue, setDiscValue] = useState(() => {
    const storedDiscValue = localStorage.getItem("discValue");
    return storedDiscValue ? JSON.parse(storedDiscValue) : 0;
  });
  const [finalTotal, setFinalTotal] = useState(0);
  const [srv, setSrv] = useState(() => {
    const storedSrv = localStorage.getItem("srv");
    return storedSrv ? JSON.parse(storedSrv) : 0;
  });
  const [numericKeypadType, setNumericKeypadType] = useState("Discount");
  const [isModifierDialogOpen, setIsModifierDialogOpen] = useState(false);
  const [selectedMealForModify, setSelectedMealForModify] = useState();
  const [selectedModifiers, setSelectedModifiers] = useState(() => {
    const storedModifiers = localStorage.getItem("selectedModifiers");
    return storedModifiers ? JSON.parse(storedModifiers) : [];
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedTableId = searchParams.get("selectedTableId");
  const [message, setMessage] = useState("");
  const [dispTable, setDisTable] = useState("");

  console.log("tablee iddddddd", selectedTableId);
  console.log("Storeddddd clienttttttt", selectedRow);
  const handleKitchen = async () => {
    try {
      const currentDate = new Date();
      const formattedDateTime = format(currentDate, "dd/MM/yyyy HH:mm:ss");
      const requestBody = {
        date: formattedDateTime,
        discValue: discValue,
        srv: srv,
        meals: selectedMeals,
        branch: branch,
        invType: invType,
      };

      const response = await fetch(
        `http://192.168.16.113:8000/insertInv/${companyName}/${selectedTableId}/${username}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      let mess;
      if (response.ok) {
        mess = await response.json()
        setMessage(mess["invNo"]);
        setSelectedMeals([]);
        window.location.href = `/PoS `;
        // Request successful
        console.log("Insertion to kitchen successful");
      } else {
        // Handle error response
        console.error("Error inserting into kitchen:", response.statusText);
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error inserting into kitchen:", error);
    }
  }

  const handlePrint = () => {
    printJS({
      printable: "myPrintableContent",
      type: "html",
      targetStyles: ["*"],
      documentTitle: "Receipt",
      honorColor: true,
      scanStyles: false,
      // style: `
      //   @media print {
      //     @page {
      //       marginLeft: 1mm;
      //     }
      //   }
      // `,
      header: null,
      footer: null,
      showModal: true,
      onError: (error) => {
        console.error("Printing error:", error);
      },
      onPrintDialogClose: () => {
        console.log("Print dialog closed");
      },
      printerName: "OP",
    });
  };

  const { refreshNeeded, resetRefresh } = useRefresh();

  // Use the refreshNeeded state to trigger a refresh
  useEffect(() => {
    if (refreshNeeded) {
      // Perform actions to refresh data or components
      // For example, refetch data from the server
      loadItems();

      // Reset the refresh flag
      resetRefresh();
    }
  }, [refreshNeeded]);

  const loadItems = async () => {
    try {
      let url;
      if (selectedCategoryCode) {
        // If a category is selected, fetch items for the selected category
        url = `http://192.168.16.113:8000/categoriesitems/${companyName}/${selectedCategoryCode}`;
      } else {
        // Otherwise, fetch all items
        url = `http://192.168.16.113:8000/allitems/${companyName}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    localStorage.setItem(
      "selectedModifiers",
      JSON.stringify(selectedModifiers)
    );
  }, [selectedModifiers]);

  useEffect(() => {
    localStorage.setItem("srv", JSON.stringify(srv));
  }, [srv]);

  useEffect(() => {
    localStorage.setItem("discValue", JSON.stringify(discValue));
  }, [discValue]);

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
    // Create a copy of meals with a unique identifier
    const copy = meals.map((meal, index) => ({
      ...meal,
      quantity: 1,
    }));
    setMealsCopy(copy);
    console.log("Copy with unique identifiers:", copy);
  }, [meals]);


  console.log(" l copy kel ma tetghayar l meal", mealsCopy);

  useEffect(() => {
    fetchCategories();
    // Fetch categories when the component mounts
    fetchAllItems();
  }, []);

  console.log("the branch and the SATYpe", branch, invType);
  console.log("company in pos ", companyName);
  // Retrieve selectedMeals from Local Storage on component mount
  // useEffect(() => {
  //   localStorage.setItem("selectedMeals", JSON.stringify(selectedMeals));
  // }, [selectedMeals]);
  console.log(
    "storedddddddddddddd storageeeeee",
    localStorage.getItem("selectedMeals")
  );
  // Save selectedMeals to Local Storage whenever it changes
  
  useEffect(() => {
    if (window.location.pathname === "/PoS"){
      localStorage.setItem("selectedMeals", JSON.stringify(selectedMeals));
      }
  }, [selectedMeals]);

  
  useEffect(() => {
    // Fetch items when selectedCategoryCode changes
    if (selectedCategoryCode !== "") {
      fetchItemsCategory();
    }
  }, [selectedCategoryCode]);
  
  console.log("olddd itemm noooooooooo", oldItemNo);
  console.log("newwwww itemm noooo", newItemNo);
 useEffect(() => {
   // Update the selected meals to match the ItemNo in mealsCopy
   const updatedSelectedMeals = selectedMeals.map((meal) => {
     // Find the corresponding meal in mealsCopy based on a unique identifier
     const correspondingMeal = mealsCopy.find(
       (copyMeal) => copyMeal.ItemNo === newItemNo
     );
     if (correspondingMeal && meal.ItemNo === oldItemNo) {
       // If there is a corresponding meal and the meal's ItemNo matches the oldItemNo, update only the ItemNo
       return { ...meal, ItemNo: correspondingMeal.ItemNo };
     } else {
       // If no corresponding meal is found or the meal's ItemNo doesn't match the oldItemNo, return the original meal
       return meal;
     }
   });

   // Update the state with the updated selected meals
   setSelectedMeals(updatedSelectedMeals);
 }, [mealsCopy]);



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

  console.log("selected mealllllllll", selectedMeals);

  const calculateTotalDiscountedPrice = () => {
    let totalPrice = 0;

    selectedMeals.forEach((selectedMeal) => {
      // Use the selectedMeal directly from selectedMeals array
      const meal = selectedMeal;
      const price = meal.UPrice || 0;
      const quantity = meal.quantity || 0;
      const Disc = meal.Disc || 0;
      totalPrice += price * (1 - Disc / 100) * quantity;
    });

    return totalPrice.toFixed(2);
  };

  const calculateTotalTax = () => {
    let totalTax = 0;
    selectedMeals.forEach((selectedMeal) => {
      const meal = selectedMeal;
      const tax = meal.Tax || 0;
      totalTax += (meal.UPrice * (1 - meal.Disc / 100) * tax) / 100;
    });
    return totalTax.toFixed(2);
  };

  useEffect(() => {
    const newFinalTotal = totalFinal;

    setFinalTotal(newFinalTotal);
  }, [calculateTotalDiscountedPrice, discValue, calculateTotalTax]);

  const handleDelete = (mealCode) => {
    // Filter out the selectedMeal with the given mealCode
    const updatedSelectedMeals = selectedMeals.filter(
      (meal) => meal.index !== mealCode
    );

    // Find the meal with the given mealCode
    const deletedMeal = selectedMeals.find((meal) => meal.index === mealCode);

    // If the meal is found, set selectedModifiers to an empty array for that meal
    if (deletedMeal) {
      setSelectedModifiers((prevModifiers) => {
        const updatedModifiers = prevModifiers.filter(
          (modifier) => modifier.index !== mealCode
        );
        return updatedModifiers;
      });
    }

    // Update the state with the filtered array
    setSelectedMeals(updatedSelectedMeals);
  };

  let placeOrderCount = 0;
  const handlePlace = async () => {
    try {
      const currentDate = new Date();
      const formattedDateTime = format(currentDate, "dd/MM/yyyy HH:mm:ss");
      // Encode the formatted date
      console.log("CURRENTTTTTTTTTTdateeeeeeeeeeeeeeeee", currentDate);
      console.log("formatted dateeeeeeee", formattedDateTime);
      const requestBody = {
        date: formattedDateTime,
        discValue: discValue,
        srv: srv,
        meals: selectedMeals,
        branch: branch,
        invType: invType,
      };
      console.log("bodyyyyyyyyyyyyyyy", requestBody);

      // Make a POST request to the /invoiceitem endpoint
      const response = await fetch(
        `http://192.168.16.113:8000/invoiceitem/${companyName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );
      console.log("selecteddddddddd bl place order", requestBody);

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        const responseData = await response.json();
        console.log("mmmmmmmmmmmmmmmmmmmmmmm", responseData);
        if (responseData["message"] === "Invoice items added successfully") {
          // Convert the JSON data to a string
          const jsonString = JSON.stringify(responseData, null, 2);
          // Use FileSaver to save the JSON data as a TXT file
          const blob = new Blob([jsonString], { type: "application/json" });
          FileSaver.saveAs(blob, "response-data.json");

          // Increment the placeOrderCount
          placeOrderCount++;

          // Check if the placeOrderCount reaches 3
          if (placeOrderCount === 3) {
            // Reload the page after 3 placing orders
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        }
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
        setSelectedRow({});
        console.log("Order placed successfully!");
      } else {
        console.error("Failed to place order:", response.statusText);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const grossTotal = parseFloat(calculateTotalDiscountedPrice());
  const serviceValue = (grossTotal * srv) / 100;
  const discountValue = ((grossTotal + serviceValue) * discValue) / 100;
  const totalDiscount = (grossTotal + serviceValue) * (1 - discValue / 100);
  console.log("dddddddddddddddddddddddddddd", totalDiscount);
  let totalTax = 0;
  if (
    selectedMeals &&
    selectedMeals.length > 0 &&
    selectedMeals[0]["Tax"] !== undefined
  ) {
    const totalTaxSD =
      parseFloat(calculateTotalTax()) * (1 + srv / 100) * (1 - discValue / 100);
    console.log(totalTaxSD);
    const totall =
      ((serviceValue * selectedMeals[0]["Tax"]) / 100) * (1 - discValue / 100);
    console.log(totall);
    totalTax = totalTaxSD + totall;
  }
  console.log("total taxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", totalTax);
  const totalFinal = totalDiscount + totalTax;
  console.log("totalllll finalllllllll", totalFinal);
  console.log("the finall meal with details", selectedMeals);

   useEffect(() => {
     const fetchData = async () => {
       try {
         if (selectedTableId !== null) {
           // Reset selectedMeals, selectedModifiers, srv, discValue, and remove from localStorage
           setSelectedMeals([]);
           setSelectedModifiers([]);
           setSrv(0);
           setDiscValue(0);
           localStorage.removeItem("selectedMeals");
           const response = await fetch(
             `http://192.168.16.113:8000/getInv/${companyName}/${selectedTableId}/${username}`
           );
           const data = await response.json();
           console.log("getttttttttt invvvvv", data)
           if (data.inv_list) {
             setSelectedMeals(data.inv_list);
             setMessage(data.invNo);
             setDisTable(data.tableNo)
           }
         } else{
           setSelectedMeals([]);
           setMessage("");
           setDisTable("");
         }
       } catch (error) {
         console.error("Error fetching data:", error);
       }
     };

     fetchData();
   }, [selectedTableId]);
  
  const getItemListTable = () => {
    return (
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Qty</TableCell>
              <TableCell>Barcode</TableCell>
              <TableCell>Unit Price</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedMeals.map((selectedMeal, index) => (
              <React.Fragment key={index}>
                {/* Meal row */}
                <TableRow>
                  <TableCell>{selectedMeal.quantity}</TableCell>
                  <TableCell>{selectedMeal.ItemName}</TableCell>
                  <TableCell>
                    $
                    {(
                      selectedMeal.UPrice -
                      (selectedMeal.UPrice * selectedMeal.Disc) / 100
                    ).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    $
                    {(
                      (selectedMeal.UPrice -
                        (selectedMeal.UPrice * selectedMeal.Disc) / 100) *
                      selectedMeal.quantity
                    ).toFixed(2)}
                  </TableCell>
                </TableRow>
                {/* Modifier rows */}
                {selectedMeal.chosenModifiers &&
                  selectedMeal.chosenModifiers.map(
                    (modifier, modifierIndex) => (
                      <TableRow key={`${index}-${modifierIndex}`}>
                        <TableCell></TableCell> {/* Empty cell for spacing */}
                        <TableCell colSpan={2}>
                          {modifier.ItemName}
                        </TableCell>{" "}
                        {/* Span the next two cells for modifier name */}
                      </TableRow>
                    )
                  )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };
  
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
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                paddingLeft: "15px",
                paddingTop: "10px",
              }}
            >
              Order Summary {selectedRow && selectedRow["AccName"]}{" "}
              {message && message} {dispTable && `Table: ${dispTable}`}
            </Typography>
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
                <Card
                  key={selectedMeal.index}
                  sx={{
                    background: selectedMeal.Printed
                      ? colors.redAccent[600]
                      : "inherit",
                    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
                  }}
                >
                  <CardContent //sx={{ width: "100%" }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Tooltip
                        title={
                          <span style={{ fontSize: "16px" }}>
                            You can't update this when printed
                          </span>
                        }
                        disableHoverListener={!selectedMeal.Printed}
                      >
                        <IconButton
                          sx={{ width: "7%" }}
                          // sx={{ width: "10%" }}
                          onClick={
                            !selectedMeal.Printed
                              ? () => handleDelete(selectedMeal.index)
                              : () => {}
                          }
                        >
                          <DeleteOutlineOutlinedIcon
                            sx={{ fontSize: "30px" }}
                          />
                        </IconButton>
                      </Tooltip>
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
                          <Tooltip
                            title={
                              <span style={{ fontSize: "16px" }}>
                                You can't update this when printed
                              </span>
                            }
                            disableHoverListener={!selectedMeal.Printed}
                          >
                            <IconButton
                              onClick={
                                !selectedMeal.Printed
                                  ? () =>
                                      handleQuantityChange(
                                        selectedMeal.index,
                                        selectedMeal.quantity - 1
                                      )
                                  : () => {}
                              }
                            >
                              <RemoveCircleOutlineOutlinedIcon
                                sx={{ fontSize: "35px" }}
                              />
                            </IconButton>
                          </Tooltip>

                          <Typography variant="body1" sx={{ width: "25%" }}>
                            {selectedMeal.quantity}
                          </Typography>
                          <Tooltip
                            title={
                              <span style={{ fontSize: "16px" }}>
                                You can't update this when printed
                              </span>
                            }
                            disableHoverListener={!selectedMeal.Printed}
                          >
                            <IconButton
                              //sx={{ width: "10%" }}
                              onClick={
                                !selectedMeal.Printed
                                  ? () =>
                                      handleQuantityChange(
                                        selectedMeal.index,
                                        selectedMeal.quantity + 1
                                      )
                                  : () => {}
                              }
                            >
                              <AddCircleOutlineOutlinedIcon
                                sx={{ fontSize: "35px" }}
                              />
                            </IconButton>
                          </Tooltip>
                        </Box>
                        <Tooltip
                          title={
                            <span style={{ fontSize: "16px" }}>
                              You can't update this when printed
                            </span>
                          }
                          disableHoverListener={!selectedMeal.Printed}
                        >
                          <IconButton
                            sx={{ width: "20%" }}
                            onClick={!selectedMeal.Printed ? () => handleModify(selectedMeal.index) : () => {}}
                          >
                            <AutoFixHighOutlinedIcon
                              sx={{ fontSize: "35px" }}
                            />
                          </IconButton>
                        </Tooltip>
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
              <Box
                sx={{
                  height: "10%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h4" fontWeight="bold">
                  Payment Summary
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ borderRadius: "20px", width: "50%" }}
                  onClick={handleKitchen}
                >
                  Send to Kitchen
                </Button>
              </Box>
              <Button onClick={handlePrint}>Print</Button>
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
      <Box id="myPrintableContent" sx={{ display: "none" }}>
        <div>
          <Typography variant="h3">Your Order</Typography>
          {getItemListTable()}
        </div>
        <div>
          <Typography variant="h3">Payment Summary</Typography>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Gross Total:</TableCell>
                  <TableCell>${grossTotal}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Service:</TableCell>
                  <TableCell>
                    {srv}% (${serviceValue.toFixed(2)})
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Discount:</TableCell>
                  <TableCell>
                    {discValue}% (${discountValue.toFixed(2)})
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Discount:</TableCell>
                  <TableCell>${totalDiscount.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tax:</TableCell>
                  <TableCell>
                    {selectedMeals.length > 0 ? selectedMeals[0].Tax : 0}% ($
                    {totalTax.toFixed(2)})
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total:</TableCell>
                  <TableCell>${finalTotal.toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        {selectedRow && Object.keys(selectedRow).length > 0 && (
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography variant="h3">Client Address</Typography>
                  </TableCell>
                </TableRow>
                {selectedRow["AccName"] !== "" && (
                  <TableRow>
                    <TableCell>Name:</TableCell>
                    <TableCell>{selectedRow["AccName"]}</TableCell>
                  </TableRow>
                )}
                {selectedRow["Tel"] !== "" && selectedRow["Tel"] !== null && (
                  <TableRow>
                    <TableCell>Tel:</TableCell>
                    <TableCell>{selectedRow["Tel"]}</TableCell>
                  </TableRow>
                )}
                {selectedRow["Address"] !== "" &&
                  selectedRow["Address"] !== null && (
                    <TableRow>
                      <TableCell>Address:</TableCell>
                      <TableCell>{selectedRow["Address"]}</TableCell>
                    </TableRow>
                  )}
                {selectedRow["Building"] !== "" &&
                  selectedRow["Building"] !== null && (
                    <TableRow>
                      <TableCell>Building:</TableCell>
                      <TableCell>{selectedRow["Building"]}</TableCell>
                    </TableRow>
                  )}
                {selectedRow["Street"] !== "" &&
                  selectedRow["Street"] !== null && (
                    <TableRow>
                      <TableCell>Street:</TableCell>
                      <TableCell>{selectedRow["Street"]}</TableCell>
                    </TableRow>
                  )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
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
