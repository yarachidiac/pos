import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "./scenes/global/Topbar";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Sidebar from "./scenes/global/Sidebar";
import Form from "./scenes/form";
import Team from "./scenes/team";
// import Items from "./scenes/Items";
// import Purshase from "./scenes/Purshase";
// import SalesInvoice from "./scenes/SalesInvoice";
// import SalesReturn from "./scenes/SalesReturn";
// import PurshaseReturn from "./scenes/PurshaseReturn";
// import ChartAccount from "./scenes/ChartAccount";
// import JournalVoucher from "./scenes/JournalVoucher";
// import StatementOfAccount from "./scenes/StatementOfAccount";
// import TrialBalance from "./scenes/TrialBalance";
// import PaymentVoucher from "./scenes/PaymentVoucher";
// import ReceiptVoucher from "./scenes/ReceiptVoucher";
// import StockReports from "./scenes/StockReports";
// import UserSettings from "./scenes/UserSettings";
// import GeneralInformation from "./scenes/GeneralInformation";
import { useState, useEffect } from "react";
import Company from "./scenes/company";
import PoS from "./scenes/PoS";
import ManagePoS from "./scenes/ManagePos";
import { useNavigate, useLocation } from "react-router-dom";
import ChartAcc from "./scenes/ChartAcc";
import Section from "./scenes/Section";
import Tables from "./scenes/Section/Tables";
import CircularProgress from "@mui/material/CircularProgress";
import KitchenDialog from "./scenes/PoS/KitchenDialog";
import { format } from "date-fns";
import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Journal from "./scenes/Journal";
import Groups from "./scenes/Groups";
import DailySales from "./scenes/dashboard/DailySales";
import Station from "./scenes/Station";
function App() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(true);
  const [branch, setBranch] = useState("");
  const [invType, setInvType] = useState("");
  const [username, setUsername] = useState("");
  const [userControl, setUserControl] = useState("");
  const [addTitle, setAddTitle] = useState("Add User");
  const [selectedRow, setSelectedRow] = useState(() => {
    const storedSelectedRow = localStorage.getItem("selectedRow");
    return storedSelectedRow !== "undefined"
      ? JSON.parse(storedSelectedRow)
      : {};
  });
  const [oldItemNo, setOldItemNo] = useState("");
  const [newItemNo, setNewItemNo] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [isConfOpenDialog, setIsConfOpenDialog] = useState(false);
  const [isNav, setIsNav] = useState(true);
  const [pageRed, setPageRed] = useState("");
  const [selectedTop, setSelectedTop] = useState("Takeaway");
  const [isOpenDel, setIsOpenDel] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  console.log("filter mn l app", filterValue);
  useEffect(() => {
    const initializeAuthentication = async () => {
      try {
        const storedAuthStatus = sessionStorage.getItem("isAuthenticated");

        if (storedAuthStatus === "true") {
          const storedCompanyName = localStorage.getItem("company_name");
          const storedBranch = localStorage.getItem("user_branch");
          const storedInvType = localStorage.getItem("user_invType");
          const storedUsername = localStorage.getItem("username");
          const storedUserControl = localStorage.getItem("user_control");
          console.log("ana bl Appp", storedCompanyName);
          setCompanyName(storedCompanyName);
          setBranch(storedBranch);
          setInvType(storedInvType);
          setUsername(storedUsername);
          setUserControl(storedUserControl);
          console.log("men l app", userControl);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error initializing authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuthentication();
  }, [setCompanyName, setBranch, setInvType]);

  if (loading) {
    return <CircularProgress color="success" />;
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isAuthenticated ? (
            <Form
              setIsAuthenticated={setIsAuthenticated}
              setCompanyName={setCompanyName}
              setInvType={setInvType}
              setBranch={setBranch}
              setUsername={setUsername}
              userControl={userControl}
              setUserControl={setUserControl}
            />
          ) : (
            <>
              <div>
                <Snackbar
                  open={open}
                  autoHideDuration={2000}
                  onClose={handleClose}
                  message="You have no access to this page."
                />
              </div>
              {!isMobile && (
                <Sidebar
                  isCollapsed={isCollapsed}
                  isMobile={isMobile}
                  setIsCollapsed={setIsCollapsed}
                  setIsMobile={setIsMobile}
                  userControl={userControl}
                  setOpen={setOpen}
                  companyName={companyName}
                  isNav={isNav}
                  setIsConfOpenDialog={setIsConfOpenDialog}
                />
              )}
              <main className="content">
                <Topbar
                  isCollapsed={isCollapsed}
                  isMobile={isMobile}
                  setIsCollapsed={setIsCollapsed}
                  setIsMobile={setIsMobile}
                  currentRoute={location.pathname}
                  isNav={isNav}
                  setIsConfOpenDialog={setIsConfOpenDialog}
                  setPageRed={setPageRed}
                  companyName={companyName}
                  selectedTop={selectedTop}
                  setSelectedTop={setSelectedTop}
                  isOpenDel={isOpenDel}
                  setIsOpenDel={setIsOpenDel}
                  setFilterValue={setFilterValue}
                />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route
                    path="/team"
                    element={
                      <Team
                        companyName={companyName}
                        setBranch={setBranch}
                        setInvType={setInvType}
                        //setCompanyName={setCompanyName}
                        addTitle={addTitle}
                        setAddTitle={setAddTitle}
                      />
                    }
                  />
                  <Route
                    path="/CompanyManagement"
                    element={<Company companyName={companyName} />}
                  />
                  <Route
                    path="/PoS"
                    element={
                      <PoS
                        companyName={companyName}
                        branch={branch}
                        invType={invType}
                        isCollapsed={isCollapsed}
                        //setCompanyName={setCompanyName}
                        selectedRow={selectedRow}
                        setSelectedRow={setSelectedRow}
                        oldItemNo={oldItemNo}
                        newItemNo={newItemNo}
                        username={username}
                        isConfOpenDialog={isConfOpenDialog}
                        setIsConfOpenDialog={setIsConfOpenDialog}
                        isNav={isNav}
                        setIsNav={setIsNav}
                        pageRed={pageRed}
                        setSelectedTop={setSelectedTop}
                        isOpenDel={isOpenDel}
                        setIsOpenDel={setIsOpenDel}
                        addTitle={addTitle}
                        setAddTitle={setAddTitle}
                        message={message}
                        setMessage={setMessage}
                        filterValue={filterValue}
                      />
                    }
                  />
                  <Route
                    path="/ManagePoS"
                    element={
                      <ManagePoS
                        companyName={companyName}
                        branch={branch}
                        invType={invType}
                        addTitle={addTitle}
                        setAddTitle={setAddTitle}
                        setOldItemNo={setOldItemNo}
                        setNewItemNo={setNewItemNo}
                        oldItemNo={oldItemNo}
                      />
                    }
                  />
                  <Route
                    path="/Chart"
                    element={
                      <ChartAcc
                        companyName={companyName}
                        addTitle={addTitle}
                        setAddTitle={setAddTitle}
                        selectedRow={selectedRow}
                        setSelectedRow={setSelectedRow}
                      />
                    }
                  />
                  <Route
                    path="/Sections"
                    element={
                      <Section
                        companyName={companyName}
                        branch={branch}
                        invType={invType}
                        addTitle={addTitle}
                        setAddTitle={setAddTitle}
                        addTtile={addTitle}
                        message={message}
                      />
                    }
                  />
                  <Route
                    path="/Tables/:sectionNo"
                    element={
                      <Tables
                        companyName={companyName}
                        branch={branch}
                        invType={invType}
                        addTitle={addTitle}
                        setAddTitle={setAddTitle}
                        addTtile={addTitle}
                        username={username}
                        message={message}
                        setMessage={setMessage}
                      />
                    }
                  />
                  <Route
                    path="/journal"
                    element={<Journal companyName={companyName} />}
                  />
                  <Route
                    path="/Daily"
                    element={<DailySales companyName={companyName} />}
                  />
                  <Route
                    path="/Station"
                    element={<Station companyName={companyName} />}
                  />
                  <Route
                    path="/Groups"
                    element={
                      <Groups
                        companyName={companyName}
                        addTitle={addTitle}
                        setAddTitle={setAddTitle}
                        setOldItemNo={setOldItemNo}
                        setNewItemNo={setNewItemNo}
                        oldItemNo={oldItemNo}
                      />
                    }
                  />
                </Routes>
              </main>
            </>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
