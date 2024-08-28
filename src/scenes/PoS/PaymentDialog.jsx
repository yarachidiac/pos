import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Grid,
  Typography,
} from "@mui/material";
import { fontWeight } from "@mui/system";
import VisaDialog from "./VisaDialog";

const PaymentDialog = ({
  setPayDialog,
  open,
  onClose,
  finalTotal,
  infCom,
  paymentMethod,
  setPaymentMethod,
  payInLBP,
  setPayInLBP,
  payOutLBP,
  setPayOutLBP,
  payInUSD,
  setPayInUSD,
  payOutUSD,
  setPayOutUSD,
  payInLBPVISA1,
  setPayInLBPVISA1,
  payInUSDVISA1,
  setPayInUSDVISA1,
  payInLBPVISA2,
  setPayInLBPVISA2,
  payInUSDVISA2,
  setPayInUSDVISA2,
  payInLBPVISA3,
  setPayInLBPVISA3,
  payInUSDVISA3,
  setPayInUSDVISA3,
  currency,
  setCurrency,
  onClick,
  payInLBPVISA,
  setPayInLBPVISA,
  payInUSDVISA,
  setPayInUSDVISA,
  setTClicknyed,
  companyName,
  url, selectedAmounts, setSelectedAmounts
}) => {
  const [payType, setPayType] = useState("PayIn");
  const [openVisaDialog, setOpenVisaDialog] = useState(false);
  const [visaType, setVisaType] = useState("");

  const handleSubmit = () => {
    onClick();
    setPayDialog(false);
  };

  const ClearFields = () => {
    setSelectedAmounts([]);
    setPayInLBP(0);
    setPayOutLBP(0);
    setPayInUSD(0);
    setPayOutUSD(0);
    setPayInUSDVISA(0);
    setPayInLBPVISA(0);
    setPayInUSDVISA1(0);
    setPayInLBPVISA1(0);
    setPayInUSDVISA2(0);
    setPayInLBPVISA2(0);
    setPayInUSDVISA3(0);
    setPayInLBPVISA3(0);
    setPayType("PayIn");
    setCurrency("USD");
    setPaymentMethod("Cash");
  };

  const handlePresetAmount = (amount) => {
    if (paymentMethod === "Cash") {
      if (currency === "USD" && payType === "PayIn") {
        setPayInUSD((prev) => prev + amount);
      } else if (currency === "USD" && payType === "PayOut") {
        setPayOutUSD((prev) => prev + amount);
      } else if (currency === "LBP" && payType === "PayIn") {

        setPayInLBP((prev) => prev + amount);
      } else if (currency === "LBP" && payType === "PayOut") {
        setPayOutLBP((prev) => prev + amount);
      }
    } else {
      if (
        currency === "USD" &&
        payType === "PayIn" &&
        visaType === "Visa1"
      ) {
        setPayInUSDVISA1((prev) => prev + amount);
      } else if (currency === "LBP" && payType === "PayIn" && visaType === "Visa1") {
        setPayInLBPVISA1((prev) => prev + amount);
      } else if (currency === "USD" && payType === "PayIn" && visaType === "Visa2") {
        setPayInUSDVISA2((prev) => prev + amount);
      } else if (currency === "LBP" && payType === "PayIn" && visaType === "Visa2") {
        setPayInLBPVISA2((prev) => prev + amount);
      } else if (currency === "USD" && payType === "PayIn" && visaType === "Visa3") {
        setPayInUSDVISA3((prev) => prev + amount);
      } else if (currency === "LBP" && payType === "PayIn" && visaType === "Visa3") {
        setPayInLBPVISA3((prev) => prev + amount);
      }
    }
    // Add the selected amount to the list
    setSelectedAmounts((prev) => [
      ...prev,
      { payType, currency, amount, paymentMethod },
    ]);
  };

  const handleTextFieldChange = (event, index) => {
    const { value } = event.target;
    const amount = parseFloat(value) || 0;

    setSelectedAmounts((prev) =>
      prev.map((item, i) => (i === index ? { ...item, amount } : item))
    );

    const { payType, currency, paymentMethod } = selectedAmounts[index];
    console.log(amount);
    console.log(selectedAmounts[index].amount);
    if (paymentMethod === "Cash") {
      if (currency === "USD") {
        if (payType === "PayIn") {
          setPayInUSD(
            (prev) => prev + (amount - selectedAmounts[index].amount)
          );
        } else if (payType === "PayOut") {
          setPayOutUSD(
            (prev) => prev + (amount - selectedAmounts[index].amount)
          );
        }
      } else if (currency === "LBP") {
        if (payType === "PayIn") {
          setPayInLBP(
            (prev) => prev + (amount - selectedAmounts[index].amount)
          );
        } else if (payType === "PayOut") {
          setPayOutLBP(
            (prev) => prev + (amount - selectedAmounts[index].amount)
          );
        }
      }
    } else if (paymentMethod.includes("VISA")) {
      if (currency === "USD" && payType === "PayIn" && visaType === "Visa1") {
        setPayInUSDVISA1(
          (prev) => prev + (amount - selectedAmounts[index].amount)
        );
      } else if (currency === "LBP" && payType === "PayIn" && visaType === "Visa1") {
        setPayInLBPVISA1(
          (prev) => prev + (amount - selectedAmounts[index].amount)
        );
      } else if (currency === "USD" && payType === "PayIn" && visaType === "Visa2") {
        setPayInUSDVISA2(
          (prev) => prev + (amount - selectedAmounts[index].amount)
        );
      } else if (currency === "LBP" && payType === "PayIn" && visaType === "Visa2") {
        setPayInLBPVISA2(
          (prev) => prev + (amount - selectedAmounts[index].amount)
        );
      } else if (currency === "USD" && payType === "PayIn" && visaType === "Visa3") {
        setPayInUSDVISA3(
          (prev) => prev + (amount - selectedAmounts[index].amount)
        );
      } else if (currency === "LBP" && payType === "PayIn" && visaType === "Visa3") {
        setPayInLBPVISA3(
          (prev) => prev + (amount - selectedAmounts[index].amount)
        );
      }
    }
  };

  const handleDecrement = (index) => {
    const { amount, payType, currency, paymentMethod } = selectedAmounts[index];

    setSelectedAmounts((prev) =>
      prev.filter(
        (item, idx) =>
          !(
            idx === index &&
            item.amount === amount &&
            item.payType === payType &&
            item.currency === currency &&
            item.paymentMethod === paymentMethod
          )
      )
    );

    if (paymentMethod === "Cash") {
      if (currency === "USD" && payType === "PayIn") {
        setPayInUSD((prev) => Math.max(prev - amount, 0));
      } else if (currency === "USD" && payType === "PayOut") {
        setPayOutUSD((prev) => Math.max(prev - amount, 0));
      } else if (currency === "LBP" && payType === "PayIn") {
        setPayInLBP((prev) => Math.max(prev - amount, 0));
      } else {
        setPayOutLBP((prev) => Math.max(prev - amount, 0));
      }
    } else {
      if (currency === "USD" && payType === "PayIn" && visaType === "Visa1") {
        setPayInUSDVISA1((prev) => Math.max(prev - amount, 0));
      } else if (currency === "LBP" && payType === "PayIn" && visaType === "Visa1") {
        setPayInLBPVISA1((prev) => Math.max(prev - amount, 0));
      } else if (currency === "USD" && payType === "PayIn" && visaType === "Visa2") {
        setPayInUSDVISA2((prev) => Math.max(prev - amount, 0));
      } else if (currency === "LBP" && payType === "PayIn" && visaType === "Visa2") {
        setPayInLBPVISA2((prev) => Math.max(prev - amount, 0));
      } else if (
        currency === "USD" &&
        payType === "PayIn" &&
        visaType === "Visa3"
      ) {
        setPayInUSDVISA3((prev) => Math.max(prev - amount, 0));
      } else if (currency === "LBP" && payType === "PayIn" && visaType === "Visa3") {
        setPayInLBPVISA3((prev) => Math.max(prev - amount, 0));
      }
    }
  };

  const handleCloseVisa = () => {
    setOpenVisaDialog(false);
  };

  const usdAmounts = [
    infCom.KD === "*"
      ? (
          finalTotal -
          ((payInLBP - payOutLBP) / infCom.Rate +
            (payInUSD - payOutUSD) +
            payInLBPVISA1 / infCom.Rate +
            payInUSDVISA1 +
            payInLBPVISA2 / infCom.Rate +
            payInUSDVISA2 +
            payInLBPVISA3 / infCom.Rate +
            payInUSDVISA3)
        ).toLocaleString()
      : (
          finalTotal / infCom.Rate -
          (payInUSD -
            payOutUSD +
            (payInLBP - payOutLBP) / infCom.Rate +
            (payInLBPVISA1 / infCom.Rate + payInUSDVISA1) +
            (payInLBPVISA2 / infCom.Rate + payInUSDVISA2) +
            (payInLBPVISA3 / infCom.Rate + payInUSDVISA3))
        ).toLocaleString(),
    100,
    50,
    20,
    10,
    5,
    1,
  ];
  const lbpAmounts = [
    infCom.KD === "*"
      ? (
          finalTotal * infCom.Rate -
          ((payInUSD - payOutUSD) * infCom.Rate +
            (payInLBP - payOutLBP) +
            payInLBPVISA1 +
            payInUSDVISA1 * infCom.Rate +
            payInLBPVISA2 +
            payInUSDVISA2 * infCom.Rate +
            payInLBPVISA3 +
            payInUSDVISA3 * infCom.Rate)
        ).toLocaleString()
      : (
          finalTotal -
          ((payInUSD - payOutUSD) * infCom.Rate +
            (payInLBP - payOutLBP) +
            (payInUSDVISA1 * infCom.Rate + payInLBPVISA1) +
            (payInUSDVISA2 * infCom.Rate + payInLBPVISA2) +
            (payInUSDVISA3 * infCom.Rate + payInLBPVISA3))
        ).toLocaleString(),
    100000,
    50000,
    20000,
    10000,
    5000,
  ];

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth={true}
        maxWidth="md"
        sx={{
          "& .MuiDialog-paper": {
            width: "600px", // Set a fixed width
            height: "700px", // Set a fixed height
          },
        }}
      >
        <DialogTitle sx={{ fontSize: "1.5rem" }}>
          Select Payment Method
        </DialogTitle>
        <DialogContent>
          <Grid container direction="column" gap={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                {/* Payment Method: Cash / VISA */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Button
                      variant={
                        paymentMethod === "Cash" ? "contained" : "outlined"
                      }
                      color="secondary"
                      onClick={() => setPaymentMethod("Cash")}
                      fullWidth
                    >
                      Cash
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant={
                        paymentMethod.includes("Visa")
                          ? "contained"
                          : "outlined"
                      }
                      color="secondary"
                      onClick={() => setOpenVisaDialog(true)}
                      fullWidth
                    >
                      VISA Card
                    </Button>
                  </Grid>
                </Grid>

                {/* Pay In / Pay Out */}
                <Grid container spacing={2} style={{ marginTop: "16px" }}>
                  <Grid item xs={6}>
                    <Button
                      variant={payType === "PayIn" ? "contained" : "outlined"}
                      color="secondary"
                      onClick={() => setPayType("PayIn")}
                      fullWidth
                    >
                      Pay In
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant={
                        payType === "PayOut" && paymentMethod === "Cash"
                          ? "contained"
                          : "outlined"
                      }
                      color="secondary"
                      onClick={() => {
                        paymentMethod === "Cash" && setPayType("PayOut");
                      }}
                      fullWidth
                    >
                      Pay Out
                    </Button>
                  </Grid>
                </Grid>

                {/* Currency: USD / LBP */}
                <Grid container spacing={2} style={{ marginTop: "16px" }}>
                  <Grid item xs={6}>
                    <Button
                      variant={currency === "USD" ? "contained" : "outlined"}
                      color="secondary"
                      onClick={() => setCurrency("USD")}
                      fullWidth
                    >
                      USD
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant={currency === "LBP" ? "contained" : "outlined"}
                      color="secondary"
                      onClick={() => setCurrency("LBP")}
                      fullWidth
                    >
                      LBP
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FormLabel component="legend">Paid USD:</FormLabel>
                  <Typography style={{ fontWeight: "bold" }} color="secondary">
                    {(payInUSD ||
                      payInUSDVISA1 ||
                      payInUSDVISA2 ||
                      payInUSDVISA3) &&
                      (
                        payInUSD +
                        payInUSDVISA1 +
                        payInUSDVISA2 +
                        payInUSDVISA3
                      ).toLocaleString() + " $"}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FormLabel component="legend">Paid LBP:</FormLabel>
                  <Typography style={{ fontWeight: "bold" }} color="secondary">
                    {(payInLBP ||
                      payInLBPVISA1 ||
                      payInLBPVISA2 ||
                      payInLBPVISA3) &&
                      (
                        payInLBP +
                        payInLBPVISA1 +
                        payInLBPVISA2 +
                        payInLBPVISA3
                      ).toLocaleString() + " LBP"}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FormLabel component="legend">USD Out :</FormLabel>
                  <Typography style={{ fontWeight: "bold", color: "red" }}>
                    {payOutUSD && payOutUSD.toLocaleString() + " $"}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FormLabel component="legend">LBP Out :</FormLabel>
                  <Typography style={{ fontWeight: "bold", color: "red" }}>
                    {payOutLBP && payOutLBP.toLocaleString() + " LBP"}
                  </Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FormLabel component="legend">Balance USD:</FormLabel>
                  <Typography style={{ fontWeight: "bold", color: "red" }}>
                    {infCom.KD === "*"
                      ? (
                          finalTotal -
                          ((payInLBP - payOutLBP) / infCom.Rate +
                            (payInUSD - payOutUSD) +
                            payInLBPVISA1 / infCom.Rate +
                            payInUSDVISA1 +
                            payInLBPVISA2 / infCom.Rate +
                            payInUSDVISA2 +
                            payInLBPVISA3 / infCom.Rate +
                            payInUSDVISA3)
                        ).toLocaleString() + " $"
                      : (
                          finalTotal / infCom.Rate -
                          (payInUSD -
                            payOutUSD +
                            (payInLBP - payOutLBP) / infCom.Rate +
                            (payInLBPVISA1 / infCom.Rate + payInUSDVISA1) +
                            (payInLBPVISA2 / infCom.Rate + payInUSDVISA2) +
                            (payInLBPVISA3 / infCom.Rate + payInUSDVISA3))
                        ).toLocaleString() + " $"}
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <FormLabel component="legend">Balance LBP:</FormLabel>
                  <Typography style={{ fontWeight: "bold", color: "red" }}>
                    {infCom.KD === "*"
                      ? (
                          finalTotal * infCom.Rate -
                          ((payInUSD - payOutUSD) * infCom.Rate +
                            (payInLBP - payOutLBP) +
                            payInLBPVISA1 +
                            payInUSDVISA1 * infCom.Rate +
                            payInLBPVISA2 +
                            payInUSDVISA2 * infCom.Rate +
                            payInLBPVISA3 +
                            payInUSDVISA3 * infCom.Rate)
                        ).toLocaleString() + " LBP"
                      : (
                          finalTotal -
                          ((payInUSD - payOutUSD) * infCom.Rate +
                            (payInLBP - payOutLBP) +
                            (payInUSDVISA1 * infCom.Rate + payInLBPVISA1) +
                            (payInUSDVISA2 * infCom.Rate + payInLBPVISA2) +
                            (payInUSDVISA3 * infCom.Rate + payInLBPVISA3))
                        ).toLocaleString() + " LBP"}
                  </Typography>
                </div>
              </Grid>
            </Grid>

            <Grid container spacing={2} alignItems="stretch">
              {(currency === "USD" ? usdAmounts : lbpAmounts).map(
                (amount, index) => (
                  <Grid item key={index} xs={2}>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => {
                        const numericAmount =
                          payType === "PayOut" && index == 0
                            ? -1 * Number(amount.toString().replace(/,/g, ""))
                            : Number(amount.toString().replace(/,/g, ""));

                        numericAmount > 0 && handlePresetAmount(numericAmount);
                      }}
                    >
                      {currency === "USD"
                        ? `$${
                            payType === "PayOut"  && index == 0
                              ? amount * -1
                              : amount
                          }`
                        : `${amount.toLocaleString()} LBP`}
                    </Button>
                  </Grid>
                )
              )}
            </Grid>

            <Grid item xs={12} sm={6}>
              <Grid container spacing={2}>
                {selectedAmounts.map(({ amount }, index) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <TextField
                      onDoubleClick={() => handleDecrement(index)}
                      onChange={(event) => handleTextFieldChange(event, index)}
                      label={`${selectedAmounts[index].payType} ${selectedAmounts[index].paymentMethod} (${selectedAmounts[index].currency})`}
                      value={amount}
                      fullWidth
                      margin="dense"
                      InputProps={{
                        readOnly: !(
                          payType === selectedAmounts[index].payType &&
                          paymentMethod ===
                            selectedAmounts[index].paymentMethod &&
                          currency === selectedAmounts[index].currency
                        ),
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="outlined" onClick={ClearFields}>
            Clear
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="secondary">
            Submit Payment
          </Button>
        </DialogActions>
      </Dialog>
      {openVisaDialog && (
        <VisaDialog
          open={openVisaDialog}
          onClose={handleCloseVisa}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          payType={payType}
          setPayType={setPayType}
          companyName={companyName}
          url={url}
          setVisaType={setVisaType}
        ></VisaDialog>
      )}
    </>
  );
};

export default PaymentDialog;
