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
import { useCompany } from "../../context/CompanyContext";

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

const Form = ({ setIsAuthenticated }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //const { updateCompanyName, clearCompanyName } = useCompany();

  const handleFormSubmit = async (values) => {
    try {
      // Clear the company name from local storage
      //clearCompanyName();
      const response = await fetch("http://192.168.16.100:8000/login", {
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
       localStorage.setItem("company_name", values.company_name);

        setIsAuthenticated(true);

        //updateCompanyName(values.company_name);
      } else {
        // Handle authentication error
        console.error("Authentication failed");
      }
    } catch (error) {
      console.error("Error during authentication", error);
    }
  };
  return (
    <Grid container justifyContent="center" alignItems="center" height="100vh">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            textAlign: "center",
            background: colors.grey[600],
          }}
        >
          <Typography variant="h5" mb={3}>
            Login
          </Typography>
          <Formik
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
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
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
    </Grid>
  );
};

export default Form;

