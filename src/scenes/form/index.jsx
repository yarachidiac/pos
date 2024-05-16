import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { tokens } from "../../theme";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Keyboard from "./Keyboard";
import KeyboardOutlinedIcon from "@mui/icons-material/KeyboardOutlined";
import KeyboardIcon from "@mui/icons-material/Keyboard"; // Import the Keyboard icon
import IconButton from "@mui/material/IconButton";

const initialValues = {
  username: "",
  password: "",
  company_name: "",
};

const userSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
  company_name: yup.string().required("required"),
});

// ... (your existing code)

const Form = ({
  setIsAuthenticated,
  setCompanyName,
  setInvType,
  setBranch,
  setUsername,
  userControl,
  setUserControl,
  url,
  v,
  setCompCity,
  setCompStreet,
  setCompPhone
}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [logMess, setLogMess] = useState("");
  const [activeField, setActiveField] = useState("");
  const navigate = useNavigate();
  const [showKeyboard, setShowKeyboard] = useState(false);

  const formikRef = useRef(null);

  const handleKeyPress = (input) => {
    const formik = formikRef.current;
    if (formik && activeField) {
      formik.setFieldValue(activeField, formik.values[activeField] + input);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      // Clear the company name from local storage
      //clearCompanyName();
      const response = await fetch(`${url}/pos/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
          company_name: values.company_name,
        }),
      });
      console.log("here the valuessss:", values);

      console.log("here the valuessss:", JSON.stringify(values));

      if (response.ok) {
        const responseUser = await response.json();
        if (responseUser.message === "Invalid Credentials") {
          setLogMess(responseUser.message);
          
        } else {
          console.log("kkkkkkkkkkkkkkk", responseUser.comp);
          console.log("heyyyyyyyyyy", responseUser.user);
          localStorage.setItem("company_name", values.company_name);
          await setCompanyName(localStorage.getItem("company_name"));

          localStorage.setItem("user_branch", responseUser.user["Branch"]);
          await setBranch(localStorage.getItem("user_branch"));

          localStorage.setItem("user_invType", responseUser.user["SAType"]);
          await setInvType(localStorage.getItem("user_invType"));

          localStorage.setItem("comp_phone", responseUser.comp["Phone"]);
          await setCompPhone(localStorage.getItem("comp_phone"));
          
          localStorage.setItem("comp_city", responseUser.comp["City"]);
          await setCompCity(localStorage.getItem("comp_city"));

          localStorage.setItem("comp_street", responseUser.comp["Street"]);
          await setCompStreet(localStorage.getItem("comp_street"));

          sessionStorage.setItem("isAuthenticated", "true");
          await setIsAuthenticated(sessionStorage.getItem("isAuthenticated"));
          //updateCompanyName(values.company_name);
          localStorage.setItem("username", responseUser.user["username"]);
          await setUsername(localStorage.getItem("username"));
          localStorage.setItem(
            "user_control",
            responseUser.user["user_control"]
          );
          const s = setUserControl(localStorage.getItem("user_control"));
          console.log("pppppppppppppppppppp", s);
          setLogMess(responseUser.message);
          navigate(`/${v}/PoS`);
        }
        setTimeout(() => {
          setLogMess("");
        }, 3000);
      } else {
        // Handle authentication error
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication", error);
    }
  };


  console.log("lllllllllllllllllllllllllllllll", logMess)
  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            textAlign: "center",
            background: colors.primary[500],
          }}
        >
          <Typography variant="h5" mb={3}>
            Login
          </Typography>
          <Typography
            color="error"
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "1rem", // Add margin bottom for spacing
              height: "10px",
            }}
          >
            {logMess}
          </Typography>
          <Formik
            innerRef={formikRef}
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={userSchema}
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                      name="username"
                      error={!!touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
                      sx={{ height: "64px" }}
                      onFocus={() => {
                        console.log("Active field set to: username");
                        setActiveField("username");
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="password"
                      label="Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      sx={{ height: "64px" }}
                      onFocus={() => {
                        console.log("Active field set to: password");
                        setActiveField("password");
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Company"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.company_name}
                      name="company_name"
                      error={!!touched.company_name && !!errors.company_name}
                      helperText={touched.company_name && errors.company_name}
                      sx={{ height: "64px" }}
                      onFocus={() => {
                        console.log("Active field set to: company");
                        setActiveField("company_name");
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ backgroundColor: colors.greenAccent[500] }}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </Paper>
      </Grid>
      {showKeyboard && (
        <Box
          sx={{
            position: "absolute",
            top: "50%", // Adjust as needed to position the keyboard vertically
            left: "50%", // Adjust as needed to position the keyboard horizontally
            transform: "translate(-50%, -50%)", // Center the keyboard
            zIndex: 9999,
          }}
        >
          <Keyboard onKeyPress={handleKeyPress} />
        </Box>
      )}
      <IconButton
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "100px",
          height: "100px",
          borderRadius: 0,
          backgroundColor: "#fff", // Background color for the button
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Box shadow for a raised effect
        }}
        onClick={() => setShowKeyboard(!showKeyboard)}
      >
        <KeyboardOutlinedIcon sx={{ fontSize: 100, color: "#333" }} />{" "}
        {/* Adjust icon size and color */}
      </IconButton>
    </Grid>
  );
};

export default Form;

