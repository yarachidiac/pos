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
import Kitchen from "./scenes/Kitchen";
import Currency from "./scenes/Currency";
import CashConfirm from "./scenes/CashOnHands/CashConf";
import EndOfDay from "./scenes/EndOfDay/EndOfDay.jsx";
import ResponseDialog from "./scenes/ResponseDialog.jsx";

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
  const [compPhone, setCompPhone] = useState("");
  const [compCity, setCompCity] = useState("");
  const [compStreet, setCompStreet] = useState("");
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
  const [openCash, setOpenCash] = useState(false);
  const [openEOD, setOpenEOD] = useState(false);
  const [dialogCash, setDialogCash] = useState(false);
  const [responseCash, setResponseCash] = useState("");
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeField, setActiveField] = useState("");
  //const url = "https://pssapi.net:444";
  const url = "http://192.168.16.112:8000";
  const v = "pointofsale";

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
          const storedCompPhone = localStorage.getItem("comp_phone");
          const storedCompStreet = localStorage.getItem("comp_street");
          const storedCompCity = localStorage.getItem("comp_city");
          console.log("ana bl Appp", storedCompanyName);
          setCompanyName(storedCompanyName);
          setBranch(storedBranch);
          setInvType(storedInvType);
          setUsername(storedUsername);
          setUserControl(storedUserControl);
          setCompCity(storedCompCity);
          setCompPhone(storedCompPhone);
          setCompStreet(storedCompStreet);
          console.log("men l app", compCity);
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

  const handleConfirm = async () => {
    try {
      const currentDate = new Date();
      const formattedTime = format(currentDate, "HH:mm:ss");
      const formattedDate = format(currentDate, "dd/MM/yyyy");
      const dateTime = `${formattedDate} ${formattedTime}`;
      const apiUrl = `${url}/pos/userShiftClose/${companyName}`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          formattedDate: formattedDate,
          dateTime: dateTime,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setResponseCash(data.message);
        setOpenCash(false);
        setDialogCash(true);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleCloseCash = () => {
    setOpenCash(false);
  };

  const handleCloseEOD = () => {
    setOpenEOD(false);
  };

  const handleConfirmEOD = async () => {
    try {
      const response = await fetch(`${url}/pos/resetOrderId/${companyName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id: 1 }),
      });
      if (response.ok) {
        const data = await response.json();
        setResponseCash(data.message);
        setOpenEOD(false);
        setDialogCash(true);
      } else {
        // Handle authentication error
        console.error("End of day failed");
      }
    } catch (error) {
      console.error("Error during end of day", error);
    }
  };

  const closeCash = () => {
    setDialogCash(false);
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
              setCompPhone={setCompPhone}
              setCompCity={setCompCity}
              setCompStreet={setCompStreet}
              url={url}
              v={v}
              activeField={activeField}
              setActiveField={setActiveField}
              showKeyboard={showKeyboard}
              setShowKeyboard={setShowKeyboard}
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
                  url={url}
                  setIsAuthenticated={setIsAuthenticated}
                  v={v}
                  setOpenCash={setOpenCash}
                  setOpenEOD={setOpenEOD}
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
                  v={v}
                />
                <Routes>
                  <Route path={`/${v}/`} element={<Dashboard v={v} />} />
                  {userControl === "Y" && (
                    <Route
                      path={`/${v}/team`}
                      element={
                        <Team
                          companyName={companyName}
                          setBranch={setBranch}
                          setInvType={setInvType}
                          //setCompanyName={setCompanyName}
                          addTitle={addTitle}
                          setAddTitle={setAddTitle}
                          url={url}
                        />
                      }
                    />
                  )}
                  {userControl === "Y" && (
                    <Route
                      path={`/${v}/CompanyManagement`}
                      element={<Company companyName={companyName} url={url} />}
                    />
                  )}
                  <Route
                    path={`/${v}/PoS`}
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
                        url={url}
                        v={v}
                        compPhone={compPhone}
                        compStreet={compStreet}
                        compCity={compCity}
                        activeField={activeField}
                        setActiveField={setActiveField}
                        showKeyboard={showKeyboard}
                        setShowKeyboard={setShowKeyboard}
                      />
                    }
                  />
                  {userControl === "Y" && (
                    <Route
                      path={`/${v}/ManagePoS`}
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
                          url={url}
                          activeField={activeField}
                          setActiveField={setActiveField}
                          showKeyboard={showKeyboard}
                          setShowKeyboard={setShowKeyboard}
                        />
                      }
                    />
                  )}
                  {userControl === "Y" && (
                    <Route
                      path={`/${v}/Chart`}
                      element={
                        <ChartAcc
                          companyName={companyName}
                          addTitle={addTitle}
                          setAddTitle={setAddTitle}
                          selectedRow={selectedRow}
                          setSelectedRow={setSelectedRow}
                          url={url}
                          // activeField={activeField}
                          // setActiveField={setActiveField}
                          // showKeyboard={showKeyboard}
                          // setShowKeyboard={setShowKeyboard}
                        />
                      }
                    />
                  )}
                  <Route
                    path={`/${v}/Sections`}
                    element={
                      <Section
                        companyName={companyName}
                        branch={branch}
                        invType={invType}
                        addTitle={addTitle}
                        setAddTitle={setAddTitle}
                        addTtile={addTitle}
                        message={message}
                        url={url}
                        v={v}
                        userControl={userControl}
                      />
                    }
                  />
                  <Route
                    path={`/${v}/Tables/:sectionNo`}
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
                        url={url}
                        v={v}
                        userControl={userControl}
                      />
                    }
                  />
                  <Route
                    path={`/${v}/journal`}
                    element={<Journal companyName={companyName} url={url} />}
                  />
                  <Route
                    path={`/${v}/Daily`}
                    element={<DailySales companyName={companyName} url={url} />}
                  />
                  <Route
                    path={`/${v}/Station`}
                    element={<Station companyName={companyName} url={url} />}
                  />
                  <Route
                    path={`/${v}/Kitchen`}
                    element={
                      <Kitchen
                        companyName={companyName}
                        addTitle={addTitle}
                        setAddTitle={setAddTitle}
                        url={url}
                      />
                    }
                  />
                  {userControl === "Y" && (
                    <Route
                      path={`/${v}/Groups`}
                      element={
                        <Groups
                          companyName={companyName}
                          addTitle={addTitle}
                          setAddTitle={setAddTitle}
                          setOldItemNo={setOldItemNo}
                          setNewItemNo={setNewItemNo}
                          oldItemNo={oldItemNo}
                          url={url}
                          activeField={activeField}
                          setActiveField={setActiveField}
                          showKeyboard={showKeyboard}
                          setShowKeyboard={setShowKeyboard}
                        />
                      }
                    />
                  )}
                  {userControl === "Y" && (
                    <Route
                      path={`/${v}/Currency`}
                      element={
                        <Currency
                          companyName={companyName}
                          branch={branch}
                          invType={invType}
                          addTitle={addTitle}
                          setAddTitle={setAddTitle}
                          setOldItemNo={setOldItemNo}
                          setNewItemNo={setNewItemNo}
                          oldItemNo={oldItemNo}
                          url={url}
                        />
                      }
                    />
                  )}
                </Routes>
                <CashConfirm
                  open={openCash}
                  onCancel={handleCloseCash}
                  onConfirm={handleConfirm}
                  url={url}
                  username={username}
                  companyName={companyName}
                  //rows={rows}
                  // columns={columns}
                />
                <EndOfDay
                  open={openEOD}
                  onCancel={handleCloseEOD}
                  onConfirm={handleConfirmEOD}
                  url={url}
                  username={username}
                  companyName={companyName}
                  //rows={rows}
                  // columns={columns}
                />
                <ResponseDialog
                  message={responseCash}
                  isOpen={dialogCash}
                  onClose={closeCash}
                />
              </main>
            </>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
