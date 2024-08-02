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
import Avatar from "@mui/material/Avatar";

import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import { useState, useRef } from "react";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material/styles";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import { useEffect } from 'react';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import NumericKeypad from './NumericKeybad';
import { format, lastDayOfDecade } from "date-fns";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import ModifierDialog from './ModifierDialaog';
import printJS from "print-js";
import FileSaver from "file-saver";
import { resolveBreakpointValues } from '@mui/system/breakpoints';
import { useRefresh } from '../RefreshContex';
import { useLocation, useNavigate } from "react-router-dom";
import KitchenDialog from './KitchenDialog';
import { preventDefault } from '@fullcalendar/core/internal';
import DelModal from './DelModal';
import QRCode from 'qrcode.react';
import { useMediaQuery } from "@mui/material";
import ButtonBase from "@mui/material/ButtonBase";
import IngredDialog from './IngredDialog';
import AllowDialog from './AllowDialog';
import { display } from '@mui/system';
  
const PoS = ({
  companyName,
  branch,
  invType,
  isCollapsed,
  selectedRow,
  setSelectedRow,
  oldItemNo,
  newItemNo,
  username,
  isConfOpenDialog,
  setIsConfOpenDialog,
  isNav,
  setIsNav,
  pageRed,
  setSelectedTop,
  isOpenDel,
  setIsOpenDel,
  addTitle,
  setAddTitle,
  message,
  setMessage,
  filterValue,
  url,
  v,
  compPhone,
  compCity,
  compStreet,
  accno,
  activeField,
  setActiveField,
  showKeyboard,
  setShowKeyboard,
  valMessage,
  setValMessage,
  userName,
  setUserName,
  clientDetails,
  setClientDetails,
  clientDetailsCopy,
  setClientDetailsCopy,
  compTime,
  searchClient,
  setSearchClient,tickKey,
                          inputValue,
                          setInputValue,
                          setTickKey, branchDes
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCategoryCode, setSelectedCategoryCode] = useState("");
  //const [quantity, setQuantity] = useState(1);
  const [categories, setCategories] = useState([]);
  const [mealsCopy, setMealsCopy] = useState([]);
  const [meals, setMeals] = useState([]);
  const [isNumericKeypadOpen, setNumericKeypadOpen] = useState(false);
  const [finalTotal, setFinalTotal] = useState(0);
  const [numericKeypadType, setNumericKeypadType] = useState("Discount");
  const [isModifierDialogOpen, setIsModifierDialogOpen] = useState(false);
  const [selectedMealForModify, setSelectedMealForModify] = useState();
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedModifiers, setSelectedModifiers] = useState([]);
  // const [message, setMessage] = useState("");
  const [srv, setSrv] = useState(0);
  const [discValue, setDiscValue] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const selectedTableId = searchParams.get("selectedTableId");
  const sectionNo = searchParams.get("sectionNo");
  // Ref for the last item in the list
  const lastItemRef = useRef(null);
  const [openIngred, setOpenIngred] = useState(false);
  const [nameCard, setNameCard] = useState("");
  const [ingredCard, setIngredCard] = useState("");
  const [closeTClicked, setCloseTClicked] = useState(false);
  const [curr, setCurr] = useState("");
  const [infCom, setInfCom] = useState({});
  const [defaultPrinter, setDefaultPrinter] = useState("");
  const [allowPrintInv, setAllowPrintInv] = useState("Y");
  const [allowPrintKT, setAllowPrintKT] = useState("Y");
  const [allowDialog, setAllowDialog] = useState(false);
  const [qtyPrintKT, setQtyPrintKT] = useState(1);
  const [prRemark, setPrRemark] = useState("");
  const [orderId, setOrderId] = useState();
  const [invN, setInvN] = useState();
  const [newcurrDate, setNewCurrDate] = useState("");
  const [newcurrTime, setNewCurrTime] = useState("");
  const [vat, setVat] = useState("");

  const handleCloseAllow = () => {
    setAllowDialog(false);
  };
  // Function to scroll the last item into view
  const scrollToLastItem = () => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  const prevSelectedMealsLength = useRef(selectedMeals.length);

  // Effect to scroll to the last item whenever a new item is added to selectedMeals
  useEffect(() => {
    if (selectedMeals.length > prevSelectedMealsLength.current) {
      scrollToLastItem();
      // Update the previous length to the current length
      prevSelectedMealsLength.current = selectedMeals.length;
    }
  }, [selectedMeals]);

  const handleConfCancel = async () => {
    setIsConfOpenDialog(false);
  };

  const handleConfKitchen = async() => {
    await handlePlace();
    setIsConfOpenDialog(false);
  };

  useEffect(() => {
    const handleAsync = async () => {
      if (closeTClicked) {
        await handlePlace();
      }
    };
    handleAsync();
  }, [closeTClicked]);

  const handlePrint = async() => {
      if (allowPrintInv === "Y") {
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
          printerName: defaultPrinter,
        });
      
    } else {
      setAllowDialog(true);
      setPrRemark("print is not allowed");
    }
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
      let ref;
      if (selectedCategoryCode) {
        // If a category is selected, fetch items for the selected category
        ref = `${url}/pos/categoriesitems/${companyName}/${selectedCategoryCode}`;
      } else {
        // Otherwise, fetch all items
        ref = `${url}/pos/allitems/${companyName}`;
      }
      const response = await fetch(ref);
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

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
    } else if (numericKeypadType === "Service") {
      setSrv(value);
    }
  };

  useEffect(() => {
    const copy = meals.map((meal, index) => ({
      ...meal,
      quantity: 1,
    }));
    setMealsCopy(copy);
  }, [meals]);

  useEffect(() => {
    fetchCategories();
    // Fetch categories when the component mounts
    fetchAllItems();

    fetchCur();

    fetchAllowPrint();

    fetchVAT();
  }, []);

  const fetchVAT = async () => {
    try {
      const response = await fetch(`${url}/pos/getVAT/${companyName}`);
      const data = await response.json();
      setVat(data["VAT"]);
    } catch (error) {
      console.error("Error fetching categoriesitems:", error);
    }
  }


  const fetchAllowPrint = async () => {
    try {
      const response = await fetch(`${url}/pos/getAllowPrint/${companyName}`);
      const data = await response.json();
      setDefaultPrinter(data["defaultPrinter"]);
      setAllowPrintKT(data["allowKT"]);
      setAllowPrintInv(data["allowInv"]);
      setQtyPrintKT(data["qtyPrintKT"]);
    } catch (error) {
      console.error("Error fetching categoriesitems:", error);
    }
  };

  const fetchCur = async () => {
    try {
      const response = await fetch(`${url}/pos/getCurr/${companyName}`);
      const data = await response.json();
      setCurr(data["Code"]); // Assuming your API response has a 'categories' property
      setInfCom(data);
    } catch (error) {
      console.error("Error fetching categoriesitems:", error);
    }
  };

  useEffect(() => {
    // Fetch items when selectedCategoryCode changes
    if (selectedCategoryCode !== "") {
      fetchItemsCategory();
    }
  }, [selectedCategoryCode]);

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
      const response = await fetch(`${url}/pos/categories/${companyName}`);
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
  };

  const handleOrderClick = (mealId, newQuantity) => {
    setMealsCopy((prevMealsCopy) =>
      prevMealsCopy.map((meal) =>
        meal.ItemNo === mealId ? { ...meal, quantity: 1 } : meal
      )
    );
    // Find the meal in mealsCopy
    const selectedMeal = mealsCopy.find((meal) => meal.ItemNo === mealId);
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
        `${url}/pos/categoriesitems/${companyName}/${selectedCategoryCode}`
      );
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error("Error fetching categoriesitems:", error);
    }
  };

  const fetchAllItems = async () => {
    try {
      const response = await fetch(`${url}/pos/allitems/${companyName}`);
      const data = await response.json();
      setMeals(data);
    } catch (error) {
      console.error("Error fetching categoriesitems:", error);
    }
  };

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

  useEffect(() => {
    const handleCh = async () => { 
     if (invN && orderId) {
        if (!selectedTableId || (selectedTableId && closeTClicked)) {
          await handlePrint();
       } 
       navigate(`/${v}/PoS`);
       setSelectedTop("Takeaway");
       setIsNav(true);
       setIsConfOpenDialog(false);
       setCloseTClicked(false);
       setSelectedModifiers([]);
       setSelectedMeals([]);
       setSelectedRow(null);
       setMealsCopy((prevMealsCopy) =>
         prevMealsCopy.map((meal) => ({ ...meal, quantity: 1 }))
       );
       setFinalTotal(0);
       setDiscValue(0);
       setSrv(0);
       
      }
    }
    handleCh();
  }, [invN, orderId]);

  let placeOrderCount = 0;
  const handlePlace = async () => {
    try {
      const currentDate = new Date();
      let formattedDate = format(currentDate, "dd/MM/yyyy");
      const realDate = format(currentDate, "dd/MM/yyyy");
      setNewCurrDate(realDate);
      //let orderId;
      // No need to format the time, use currentDate directly
      // const compTimeRequest = await fetch(
      //   `${url}/pos/getCompTime/${companyName}`
      // );
      if (compTime) {
        // Extract the time components from the compTime string
        const [hours, minutes, seconds] = compTime.split(":").map(Number);

        // Create a new Date object with the company's end time
        const endTime = new Date();
        endTime.setHours(hours);
        endTime.setMinutes(minutes);
        endTime.setSeconds(seconds);

        // Create a new Date object with the current time
        const currentTime = new Date();

        // Check if the current time is between 12:00 AM and the company's end time
        if (
          currentTime.getHours() >= 0 && // Check if the current hour is after midnight
          currentTime.getHours() < hours && // Check if the current hour is before the end time hour
          (currentTime.getHours() !== hours || // Additional check for the hour
            currentTime.getMinutes() < minutes || // Check if current minutes are before the end time minutes
            (currentTime.getMinutes() === minutes && // Additional check for minutes
              currentTime.getSeconds() < seconds)) // Check if current seconds are before the end time seconds
        ) {
          formattedDate = currentDate;
          formattedDate.setDate(currentDate.getDate() - 1);
          formattedDate = formattedDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        }
        // else {
        //   const lastOrderIdDate = await fetch(
        //     `${url}/pos/getLastOrderIdDate/${companyName}`
        //   );
        //   if (lastOrderIdDate.ok) {
        //     const lastDate = await lastOrderIdDate.json();
        //     console.log("lastttt", lastDate);
        //     if (realDate > lastDate) {
        //       orderId = 1;
        //     } else {
        //       orderId = 0;
        //     }
        //   }
        // }
        // Encode the formatted date
        const formattedTime = format(currentDate, "HH:mm:ss");
        setNewCurrTime(formattedTime);

        // Encode the formatted date
        const delivery =
          selectedRow && selectedRow["AccNo"] ? selectedRow["AccNo"] : "";
        const unsentMeals = selectedMeals.filter(
          (meal) => meal.Printed !== "p"
        );
        const requestBody = {
          date: formattedDate,
          time: formattedTime,
          discValue: discValue,
          srv: srv,
          meals: selectedMeals,
          branch: branch,
          invType: invType,
          closeTClicked: closeTClicked,
          tableNo: selectedTableId,
          unsentMeals: unsentMeals ? unsentMeals : selectedMeals,
          message: message,
          realDate: realDate,
          accno: delivery ? delivery : accno,
          qtyPrintKT: qtyPrintKT,
          username: username,
          invKind: selectedTableId ? "TABLE" : selectedRow ? "DELIVERY" : "TAKEAWAY"
        };
        const response = await fetch(`${url}/pos/invoiceitem/${companyName}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        // Check if the request was successful (status code 2xx)
        if (response.ok) {
          const responseData = await response.json();
          if (responseData["message"] === "Invoice items added successfully") {
            if (allowPrintKT === "Y") {
              setInvN(responseData["invoiceDetails"]["InvNo"]);
              setOrderId(responseData["invoiceDetails"]["OrderId"]);
              const jsonString = JSON.stringify(responseData, null, 2);
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

            // if (!selectedTableId) {
            //   handlePrint();
            // }
          } else if (responseData["message"] === "Table closed") {
            setInvN(responseData["invoiceDetails"]["InvNo"]);
            setOrderId(responseData["invoiceDetails"]["OrderId"]);
          }
        }
        // Reset selectedMeals to an empty array
        // setSelectedModifiers([]);
        // setSelectedMeals([]);
        // setMealsCopy((prevMealsCopy) =>
        //   prevMealsCopy.map((meal) => ({ ...meal, quantity: 1 }))
        // );
        // setFinalTotal(0);
        // setDiscValue(0);
        // setSrv(0);
        // setSelectedRow({});
        // navigate(`/${v}/PoS`);
        // setSelectedTop("Takeaway");
        // setIsNav(true);
        // setIsConfOpenDialog(false);
        // setCloseTClicked(false);
      } else {
        console.error("Failed to place order:");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const grossTotal = parseFloat(calculateTotalDiscountedPrice());
  const serviceValue = (grossTotal * srv) / 100;
  const discountValue = ((grossTotal + serviceValue) * discValue) / 100;
  const totalDiscount = (grossTotal + serviceValue) * (1 - discValue / 100);
  let totalTax = 0;
  if (selectedMeals && selectedMeals.length > 0) {
    const totalTaxSD =
      parseFloat(calculateTotalTax()) * (1 + srv / 100) * (1 - discValue / 100);
    const totall = ((serviceValue * vat) / 100) * (1 - discValue / 100);
    totalTax = totalTaxSD + totall;
  }
  const totalFinal = totalDiscount + totalTax;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.search.includes("selectedTableId")) {
          const response = await fetch(
            `${url}/pos/getInv/${companyName}/${selectedTableId}/${username}`
          );
          const data = await response.json();
          if (data.inv_list) {
            setSelectedMeals(data.inv_list);
            setMessage(data.invNo);
            setSrv(data.srv);
            setDiscValue(data.disc);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unsentMeals = selectedMeals.filter(
          (meal) => meal.Printed !== "p"
        );
        //if (location.search.includes("selectedTableId")) {
        if (unsentMeals.length > 0) {
          setIsNav(false);
        } else {
          setIsNav(true);
        }
        //}
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedMeals, location]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!location.search.includes("selectedTableId") && message) {
          const response = await fetch(
            `${url}/pos/resetUsedBy/${companyName}/${message}`
          );
          if (response.ok) {
            setSelectedMeals([]);
            setSelectedModifiers([]);
            setSrv(0);
            setDiscValue(0);
            setMessage("");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [location]);

  const handleCardClick = (mealName, mealIngred) => {
    setNameCard(mealName);
    setIngredCard(mealIngred);
    setOpenIngred(true);
  };

  const handleCloseCard = () => {
    setOpenIngred(false);
  };

  const isIpadPro = useMediaQuery("(min-width: 900px) and (max-width: 1300px)");

  const getItemListTable = () => {
    const styles = {
      container: {
        height: "100%",
        width:"100%"
       // margin: "16px",
        //padding: "16px",
        //border: "1px solid #ddd",
        //borderRadius: "4px",
        //backgroundColor: "#f9f9f9",
      },
      header: {
        display: "flex",
        justifyContent: "space-between",
        //borderBottom: "2px solid #3f51b5",
        //paddingBottom: "8px",
       // marginBottom: "8px",
        //color: "#3f51b5",
        fontWeight: "bold",
      },
      row: {
        display: "flex",
        justifyContent: "space-between",
        //borderBottom: "1px solid #ddd",
       // padding: "8px 0",
      },
      // cell: {
      //   flex: "1",
      //   textAlign: "right",
      // },
      // descriptionCell: {
      //   flex: "2",
      //   textAlign: "left",
      // },
      modifierRow: {
        display: "flex",
        justifyContent: "space-between",
       // padding: "4px 0",
       // backgroundColor: "#f5f5f5",
      },
      modifierCell: {
        flex: "1",
      },
    };

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.cell}>Qty</div>
          <div style={styles.descriptionCell}>Description</div>
          <div style={styles.cell}>Total</div>
        </div>
        <div>
          {selectedMeals.map((selectedMeal, index) => (
            <React.Fragment key={index}>
              {/* Meal row */}
              <div style={styles.row}>
                <div style={styles.cell}>{selectedMeal.quantity}</div>
                <div style={styles.descriptionCell}>
                  {selectedMeal.ItemName}
                </div>
                <div style={styles.cell}>
                  {(
                    (selectedMeal.UPrice -
                      (selectedMeal.UPrice * selectedMeal.Disc) / 100) *
                    selectedMeal.quantity
                  ).toFixed(2)}
                </div>
              </div>
              {/* Modifier rows */}
              {selectedMeal.chosenModifiers &&
                selectedMeal.chosenModifiers.map((modifier, modifierIndex) => (
                  <div
                    key={`${index}-${modifierIndex}`}
                    style={styles.modifierRow}
                  >
                    <div style={styles.modifierCell}></div>
                    <div style={styles.descriptionCell}>
                      {modifier.ItemName}
                    </div>
                    <div style={styles.modifierCell}></div>
                  </div>
                ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* First Box (70% width) */}
      <Box
        sx={{
          width: `calc(${window.innerWidth}px - (${
            isCollapsed ? "80px" : "270px"
          } + ${window.innerWidth * 0.3}px))`,
          padding: "1%",
          height: "90%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Filter Buttons with Icons */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            // marginBottom: "3%",
            height: "10%",
            width: "100%",
            overflowX: "auto",
          }}
        >
          <Box sx={{ flex: "0 0 auto", minWidth: "10%", height: "100%" }}>
            <Button
              style={{
                fontWeight: "bold",
                fontSize: "1rem",

                backgroundColor:
                  selectedCategory === "All"
                    ? colors.greenAccent[500]
                    : colors.primary[500],
                color:
                  selectedCategory === "All" ? colors.primary[500] : "black",
                //borderRadius: "20px",
              }}
              onClick={() => handleCategoryClick("All")}
            >
              {/* <Avatar
                alt="Image"
                src="/path/to/image.jpg"
                sx={{ width: 40, height: 40 }} // Customize the size as needed
              /> */}
              All
            </Button>
          </Box>

          {categories.map((category) => (
            <Box
              key={category.GroupNo}
              sx={{
                flex: "0 0 auto", // Allow item to shrink if necessary
                minWidth: "20%", // Ensure each category button has 20% width
                marginLeft: "5%",
                height: "100%",
              }}
            >
              <Button
                key={category.GroupNo}
                style={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  backgroundColor:
                    selectedCategory === category.GroupName
                      ? colors.greenAccent[500]
                      : colors.primary[500],
                  color:
                    selectedCategory === category.GroupName
                      ? colors.primary[500]
                      : "black",
                  width: "100%",
                }}
                // startIcon={<LocalCafeIcon />}
                onClick={() => handleCategoryClick(category)}
              >
                {category.GroupName}
              </Button>
            </Box>
          ))}
        </Box>
        {/* Cards in Grid Layout */}
        <Box sx={{ overflowY: "auto", height: "90%", width: "100%" }}>
          <Grid
            container
            spacing={1}
            // sx={{ height: "100%" }}
          >
            {filterValue
              ? mealsCopy
                  .filter((meal) =>
                    meal.ItemName.toLowerCase().includes(
                      filterValue.toLowerCase()
                    )
                  )
                  .map((meal) => (
                    <Grid
                      // sx={{ height: "50%" }}
                      item
                      xs={12}
                      sm={isCollapsed ? 6 : 12}
                      md={
                        isCollapsed
                          ? isIpadPro
                            ? 4 // iPad Pro collapsed
                            : 2.4 // Other devices collapsed
                          : isIpadPro
                          ? 6 // iPad Pro expanded
                          : 3 // Other devices expanded
                      }
                      key={meal.ItemNo}
                    >
                      <ButtonBase
                        sx={{
                          position: "relative",
                          height: "200px",
                          width: "100%",
                        }}
                        onClick={() =>
                          handleCardClick(meal.ItemName, meal.Ingredients)
                        }
                      >
                        <Card
                          sx={{
                            height: "100%",
                            width: "100%",
                            "& .MuiCardContent-root:last-child ": {
                              paddingBottom: "5px",
                            },
                            "& .MuiCardContent-root": {
                              padding: "5px",
                            },
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="40%"
                            src={
                              meal.Image
                                ? `${process.env.PUBLIC_URL}/${companyName}/images/${meal.Image}`
                                : `${process.env.PUBLIC_URL}/maxresdefault.jpg`
                            }
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
                          <CardContent
                            sx={{
                              height: "60%",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                height: "60%",
                                width: "100%",
                                //marginX: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  maxHeight: "50%",
                                  width: "100%", // Full width of the Box
                                  // overflow: "hidden", // Hide overflow
                                  wordWrap: "break-word", // Allow long words to break
                                  textOverflow: "ellipsis",
                                }}
                              >
                                <Typography
                                  sx={{ maxWidth: "100%" }}
                                  variant="h4"
                                >
                                  {meal.ItemName}
                                </Typography>
                              </Box>
                              {/* <Typography
                        variant="body2"
                        sx={{
                          textDecoration:
                            meal.Disc || meal.Tax ? "line-through" : "none",
                        }}
                      >
                        {`$${meal.UPrice.toFixed(2)}`}
                      </Typography> */}
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                height: "40%",
                                width: "100%",
                              }}
                            >
                              {/* <Box display="flex" alignItems="center">
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
                            <Typography variant="body1">
                              {meal.quantity}
                            </Typography>
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
                          </Box> */}

                              {meal.Tax !== null && meal.Tax !== 0 ? (
                                <Typography
                                  variant="body2"
                                  sx={{ width: "50%", height: "100%" }}
                                >{`${(
                                  meal.UPrice +
                                  meal.UPrice * (meal.Tax / 100)
                                ).toFixed(2)} ${curr}`}</Typography>
                              ) : (
                                <Typography
                                  sx={{ width: "50%", height: "100%" }}
                                  variant="body2"
                                >{`${meal.UPrice.toFixed(
                                  2
                                )} ${curr}`}</Typography>
                              )}

                              <Button
                                //  variant="outlined"
                                //  color="secondary"
                                sx={{
                                  height: "100%",
                                  width: "50%",
                                  fontSize: "0.9rem",
                                  borderRadius: "20px",
                                  border: `2px solid ${colors.greenAccent[500]}`,
                                  color: colors.greenAccent[500],
                                  "&:hover": {
                                    backgroundColor: colors.greenAccent[500],
                                    color: colors.primary[500],
                                  },
                                }}
                                onClick={(e) => {
                                  e.stopPropagation(); // Stop propagation here
                                  handleOrderClick(meal.ItemNo, meal.quantity);
                                }}
                              >
                                Choose
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      </ButtonBase>
                    </Grid>
                  ))
              : mealsCopy.map((meal) => (
                  <Grid
                    // sx={{ height: "50%" }}
                    item
                    xs={12}
                    sm={isCollapsed ? 6 : 12}
                    md={
                      isCollapsed
                        ? isIpadPro
                          ? 4 // iPad Pro collapsed
                          : 2.4 // Other devices collapsed
                        : isIpadPro
                        ? 6 // iPad Pro expanded
                        : 3 // Other devices expanded
                    }
                    key={meal.ItemNo}
                  >
                    <ButtonBase
                      sx={{
                        position: "relative",
                        height: "200px",
                        width: "100%",
                      }}
                      onClick={() =>
                        handleCardClick(meal.ItemName, meal.Ingredients)
                      }
                    >
                      <Card
                        sx={{
                          height: "100%",
                          width: "100%",
                          "& .MuiCardContent-root:last-child ": {
                            paddingBottom: "5px",
                          },
                          "& .MuiCardContent-root": {
                            padding: "5px",
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="40%"
                          src={
                            meal.Image
                              ? `${process.env.PUBLIC_URL}/${companyName}/images/${meal.Image}`
                              : `${process.env.PUBLIC_URL}/maxresdefault.jpg`
                          }
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
                        <CardContent
                          sx={{
                            height: "60%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              height: "60%",
                              width: "100%",
                              //marginX: 1,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                maxHeight: "50%",
                                width: "100%", // Full width of the Box
                                // overflow: "hidden", // Hide overflow
                                wordWrap: "break-word", // Allow long words to break
                                textOverflow: "ellipsis",
                              }}
                            >
                              <Typography
                                sx={{ maxWidth: "100%" }}
                                variant="h4"
                              >
                                {meal.ItemName}
                              </Typography>
                            </Box>
                            {/* <Typography
                        variant="body2"
                        sx={{
                          textDecoration:
                            meal.Disc || meal.Tax ? "line-through" : "none",
                        }}
                      >
                        {`$${meal.UPrice.toFixed(2)}`}
                      </Typography> */}
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              height: "40%",
                              width: "100%",
                            }}
                          >
                            {/* <Box display="flex" alignItems="center">
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
                            <Typography variant="body1">
                              {meal.quantity}
                            </Typography>
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
                          </Box> */}

                            {meal.Tax !== null && meal.Tax !== 0 ? (
                              <Typography
                                variant="h4"
                                sx={{ width: "50%", height: "100%" }}
                              >{`${(
                                meal.UPrice +
                                meal.UPrice * (meal.Tax / 100)
                              ).toFixed(2)}   ${curr}`}</Typography>
                            ) : (
                              <Typography
                                sx={{ width: "50%", height: "100%" }}
                                variant="h4"
                              >{`${meal.UPrice.toFixed(
                                2
                              )}   ${curr}`}</Typography>
                            )}

                            <Button
                              //  variant="outlined"
                              //  color="secondary"
                              sx={{
                                height: "100%",
                                width: "50%",
                                fontSize: "0.9rem",
                                borderRadius: "20px",
                                border: `2px solid ${colors.greenAccent[500]}`,
                                color: colors.greenAccent[500],
                                "&:hover": {
                                  backgroundColor: colors.greenAccent[500],
                                  color: colors.primary[500],
                                },
                              }}
                              onClick={(e) => {
                                e.stopPropagation(); // Stop propagation here
                                handleOrderClick(meal.ItemNo, meal.quantity);
                              }}
                            >
                              Choose
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </ButtonBase>
                  </Grid>
                ))}
          </Grid>
        </Box>
      </Box>
      {/* Second Box (30% width) */}

      <Box
        sx={{
          // marginLeft: "auto",
          height: "100%",
          //width: `calc(${window.innerWidth * 0.3}% - 270px)`,
          // width: isCollapsed ? "30%" : "26%",
          width: "30%",
          display: "flex",
          flexDirection: "column",
          top: 0,
          right: 0,
          position: "fixed",
          // paddingLeft: "1%",
          // paddingTop: "1%",
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
              {message && message}{" "}
              {selectedTableId && `Table: ${selectedTableId}`}{" "}
              {selectedMeals.length > 0 && (
                <span> Selected {selectedMeals.length}</span>
              )}
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
              // gap: theme.spacing(2), // Add some spacing between each ListCard
            }}
          >
            {selectedMeals.map((selectedMeal, index) => (
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
                          {`${
                            selectedMeal.UPrice -
                            (selectedMeal.UPrice * selectedMeal.Disc) / 100
                          } ${curr}`}
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
                            onClick={
                              !selectedMeal.Printed
                                ? () => handleModify(selectedMeal.index)
                                : () => {}
                            }
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
                {index === selectedMeals.length - 1 && (
                  <div ref={lastItemRef}></div>
                )}
              </Box>
            ))}
          </Box>
        </Box>
        {/* Final Box */}
        <Box sx={{ height: "40%", width: "100%" }}>
          <Card
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: colors.primary[400],
            }}
          >
            <CardContent
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "15%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ borderRadius: "20px", width: "50%" }}
                  onClick={handlePrint}
                >
                  Print
                </Button>
                {/* <Typography variant="h4" fontWeight="bold">
                  Payment Summary
                </Typography> */}
                {location.search.includes("selectedTableId") && (
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ borderRadius: "20px", width: "50%" }}
                    onClick={() => {
                      setCloseTClicked(true);
                    }}
                  >
                    Close Table
                  </Button>
                )}
              </Box>

              <Box
                sx={{
                  height: "9%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h4">Gross Total</Typography>
                <Typography variant="h4">
                  {grossTotal} {curr}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "15%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() => handleOpenNumericKeypad("Service")}
                  sx={{
                    width: "50%",
                    borderRadius: "20px",
                    border: `2px solid ${colors.greenAccent[500]}`,
                    color: colors.greenAccent[500],
                  }}
                >
                  Service
                </Button>
                <Typography variant="h4">{srv}%</Typography>
                <Typography variant="h4">
                  {serviceValue.toFixed(2)} {curr}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "15%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  onClick={() => handleOpenNumericKeypad("Discount")}
                  sx={{
                    width: "50%",
                    borderRadius: "20px",
                    border: `2px solid ${colors.greenAccent[500]}`,
                    color: colors.greenAccent[500],
                  }}
                >
                  Discount
                </Button>
                <Typography variant="h4">{discValue}%</Typography>
                <Typography variant="h4">
                  {discountValue.toFixed(2)} {curr}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "9%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h4">Total</Typography>
                <Typography variant="h4">
                  {totalDiscount.toFixed(2)} {curr}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "9%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h4" sx={{ width: "50%" }}>
                  Tax
                </Typography>
                <Typography variant="h4">{vat}%</Typography>
                <Typography variant="h4">
                  {totalTax.toFixed(2)} {curr}
                </Typography>
              </Box>
              <Box
                sx={{
                  height: "9%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ width: "45%" }}>
                  <Typography variant="h4">Total</Typography>
                </Box>
                <Box>
                  <Typography variant="h4">
                    {infCom.KD === "/"
                      ? (finalTotal / infCom.Rate).toLocaleString() + " USD"
                      : (finalTotal * infCom.Rate).toLocaleString() + " LBP"}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4">
                    {finalTotal.toLocaleString()} {curr}
                  </Typography>
                </Box>
              </Box>
              <NumericKeypad
                open={isNumericKeypadOpen}
                onClose={handleCloseNumericKeypad}
                onSubmit={handleSubmit}
                type={numericKeypadType}
              />
              <Box sx={{ height: "15%" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ borderRadius: "20px", width: "100%", height: "100%" }}
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
        <div
          style={{
            textAlign: "center",
            width: "100%",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {/* Company Information */}
          <div style={{ marginBottom: "20px" }}>
            <div style={{ fontWeight: "bold", fontSize: "20px" }}>
              {companyName}
            </div>
            <div style={{ marginBottom: "5px" }}>Order {orderId}</div>

            {compPhone && <div style={{ marginTop: "5px" }}>{compPhone}</div>}
            <div style={{ marginTop: "5px" }}>
              {compStreet && compStreet}
              {compStreet && compCity && ", "}
              {compCity && compCity}
              {branchDes && <span> {branchDes}</span>}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "5px",
                }}
              >
                <div style={{ marginRight: "10px" }}>InvNo {invN}</div>
                <div>
                  {newcurrDate} {newcurrTime}
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Information */}
        </div>

        {getItemListTable()}
        <div>
          <div style={{ fontWeight: "bold" }}>Payment Summary</div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>Gross Total:</div>
              <div>
                {grossTotal} {curr}
              </div>
            </div>
            {srv !== 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>Service:</div>
                <div>{srv}%</div>
                <div>
                  {serviceValue.toFixed(2)} {curr}
                </div>
              </div>
            )}
            {discValue !== 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>Discount:</div>
                <div>{discValue}%</div>
                <div>{discountValue.toFixed(2)}</div>
                <div>{curr}</div>
              </div>
            )}
            {totalDiscount !== 0 && (discValue !== 0 || srv !== 0) && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>Total:</div>
                <div>
                  {totalDiscount.toFixed(2)} {curr}
                </div>
              </div>
            )}
            {totalTax !== 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>Tax:</div>
                <div>{vat}%</div>
                <div>
                  {totalTax.toFixed(2)}
                  {curr}
                </div>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>Total:</div>
              <div>
                {infCom.KD === "/"
                  ? (finalTotal / infCom.Rate).toLocaleString() + " USD"
                  : (finalTotal * infCom.Rate).toLocaleString() + " LBP"}
              </div>
            </div>
          </div>
        </div>

        {selectedRow && Object.keys(selectedRow).length > 0 && (
          <div>
            <div style={{ fontWeight: "bold" }}>Client Address</div>
            {selectedRow["AccName"] !== "" && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Name:</div>
                <div>{selectedRow["AccName"]}</div>
              </div>
            )}
            {selectedRow["Tel"] !== "" && selectedRow["Tel"] !== null && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Tel:</div>
                <div>{selectedRow["Tel"]}</div>
              </div>
            )}
            {selectedRow["Address"] !== "" &&
              selectedRow["Address"] !== null && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>Address:</div>
                  <div>{selectedRow["Address"]}</div>
                </div>
              )}
            {selectedRow["Building"] !== "" &&
              selectedRow["Building"] !== null && (
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>Building:</div>
                  <div>{selectedRow["Building"]}</div>
                </div>
              )}
            {selectedRow["Street"] !== "" && selectedRow["Street"] !== null && (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Street:</div>
                <div>{selectedRow["Street"]}</div>
              </div>
            )}
            {selectedRow["GAddress"] !== "" &&
              selectedRow["GAddress"] !== null && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                  <QRCode
                    value={`https://www.google.com/maps/place/${selectedRow["GAddress"]}`}
                  />
                </div>
              )}
          </div>
        )}

        <Typography variant="h5" style={{ textAlign: "center" }}>
          Thank you{username && `, you were served by ${username}`}
        </Typography>
      </Box>
      <ModifierDialog
        open={isModifierDialogOpen}
        onClose={handleCloseModifierDialog}
        companyName={companyName} // Pass the company name as a prop
        handleAddMod={handleAddMod}
        selectedMealForModify={selectedMealForModify}
        selectedModifiers={selectedModifiers}
        setSelectedModifiers={setSelectedModifiers}
        url={url}
      />
      <KitchenDialog
        open={isConfOpenDialog}
        onCancel={handleConfCancel}
        onConfirm={handleConfKitchen}
      ></KitchenDialog>
      <DelModal
        isOpenDel={isOpenDel}
        companyName={companyName}
        setIsOpenDel={setIsOpenDel}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        addTitle={addTitle}
        setAddTitle={setAddTitle}
        url={url}
        activeField={activeField}
        setActiveField={setActiveField}
        showKeyboard={showKeyboard}
        setShowKeyboard={setShowKeyboard}
        valMessage={valMessage}
        setValMessage={setValMessage}
        userName={userName}
        setUserName={setUserName}
        clientDetails={clientDetails}
        setClientDetails={setClientDetails}
        clientDetailsCopy={clientDetailsCopy}
        setClientDetailsCopy={setClientDetailsCopy}
        searchClient={searchClient}
        setSearchClient={setSearchClient}
        tickKey={tickKey}
        inputValue={inputValue}
        setInputValue={setInputValue}
        setTickKey={setTickKey}
      ></DelModal>
      {ingredCard && (
        <IngredDialog
          open={openIngred}
          onCancel={handleCloseCard}
          nameCard={nameCard}
          ingredCard={ingredCard}
        ></IngredDialog>
      )}
      <AllowDialog
        open={allowDialog}
        onCancel={handleCloseAllow}
        nameCard={prRemark}
      ></AllowDialog>
    </>
  );
};

export default PoS;
