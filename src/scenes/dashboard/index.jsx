import { Button, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/Journal");
  };

  return (
    <Box sx={{ width: "90%", height: "90%" }}>
      <Button
        sx={{
          width: "50%",
          height: "50%",
          fontSize: "1.8rem",
          fontWeight: "bold",
          background: `${colors.blueAccent[800]}`,
        }}
        onClick={handleNavigate}
      >
        Invoices History
      </Button>
    </Box>
  );
};

export default Dashboard;
