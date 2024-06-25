import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider, Box } from "@mui/material";
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
import Keyboard from "./scenes/form/Keyboard.jsx";
import { useRef } from "react";

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
  const [accno, setAccNo] = useState("");
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
  const [companyDetails, setCompanyDetails] = useState({});
  const [companyDetailsCopy, setCompanyDetailsCopy] = useState({
    ...companyDetails,
  });
  const [error, setError] = useState("");
  const [currencyDetails, setCurrencyDetails] = useState([]);
  const [currencyDetailsCopy, setCurrencyDetailsCopy] = useState([
    ...currencyDetails,
  ]);
  const [userDetails, setUserDetails] = useState({});
  const [userDetailsCopy, setUserDetailsCopy] = useState({ ...userDetails });
  const [valMessage, setValMessage] = useState("");
  const [itemDetails, setItemDetails] = useState({});
  const [itemDetailsCopy, setItemDetailsCopy] = useState({ ...itemDetails });
  const [groupDetails, setGroupDetails] = useState({});
  const [groupDetailsCopy, setGroupDetailsCopy] = useState({
    ...groupDetails,
  });
  const [userName, setUserName] = useState("");
  const [sectionName, setSectionName] = useState("");
  const [sectionNo, setSectionNo] = useState("");
  const [tableNo, setTableNo] = useState("");
  const [tableWaiter, setTableWaiter] = useState("");
  const [active, setActive] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("all");
  const [clientDetails, setClientDetails] = useState({});
  const [clientDetailsCopy, setClientDetailsCopy] = useState({
    ...clientDetails,
  });
  const [totalInv, setTotalInv] = useState("");
  const [compTime, setCompTime] = useState("");
  const [searchClient, setSearchClient] = useState("");
  //const url = "https://pssapi.net:444";
  const url = "http://192.168.16.100:8000";
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
          const storedAccNo = localStorage.getItem("acc_no");
          const storedCompTime = localStorage.getItem("comp_time");
          console.log("ana bl Appp", storedCompanyName);
          setCompanyName(storedCompanyName);
          setBranch(storedBranch);
          setInvType(storedInvType);
          setUsername(storedUsername);
          setUserControl(storedUserControl);
          setCompCity(storedCompCity);
          setCompPhone(storedCompPhone);
          setCompStreet(storedCompStreet);
          setAccNo(storedAccNo);
          setCompTime(storedCompTime);
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
          username: selectedOption,
          formattedDate: formattedDate,
          dateTime: dateTime,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setResponseCash(data.message);
        setOpenCash(false);
        setDialogCash(true);
        setTotalInv("");
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
      const currentDate = new Date();
      const formattedTime = format(currentDate, "HH:mm:ss");
      const formattedDate = format(currentDate, "dd/MM/yyyy");
      const dateTime = `${formattedDate} ${formattedTime}`;
      const response = await fetch(`${url}/pos/resetOrderId/${companyName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: 1,
          dateTime: dateTime,
          date: formattedDate,
        }),
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleKeyPress = (input) => {
    if (location.pathname === `/${v}/CompanyManagement`) {
      if (
        activeField === "Phone" ||
        activeField === "Rate" ||
        activeField === "VAT"
      ) {
        if (!isNaN(input)) {
          setCompanyDetailsCopy((prev) => ({
            ...prev,
            [activeField]: input,
          }));
          setError("");
        } else {
          setError(`${activeField} must be a number.`);
        }
      } else {
        setCompanyDetailsCopy((prev) => ({
          ...prev,
          [activeField]: input,
        }));
      }
    } else if (location.pathname === `/${v}/Currency`) {
      const [field, index] = activeField.split("-");
      setCurrencyDetailsCopy((prevDetails) =>
        prevDetails.map((detail, i) =>
          i === parseInt(index) ? { ...detail, [field]: input } : detail
        )
      );
    } else if (location.pathname === `/${v}/team`) {
      if (activeField === "email") {
        if (!validateEmail(input)) {
          setValMessage("Invalid email format");
        } else {
          setValMessage("");
        }
      } else if (activeField === "Add User") {
        setUserName(input);
      }
      setUserDetailsCopy((prevClientDetailsCopy) => ({
        ...prevClientDetailsCopy,
        [activeField]: input,
      }));
    } else if (location.pathname === `/${v}/ManagePoS`) {
      if (
        activeField === "Tax" ||
        activeField === "UPrice" ||
        activeField === "Disc" ||
        activeField === "Srv"
      ) {
        // Validate if the value is a number
        if (isNaN(input)) {
          setValMessage(`${activeField} must be a number`);
          return;
        }
      } else if (
        activeField === "KT1" ||
        activeField === "KT2" ||
        activeField === "KT3" ||
        activeField === "KT4"
      ) {
        // Validate if the value has more than 2 characters
        if (input.length > 2) {
          setValMessage(`${activeField} must be at most 2 characters long`);
          return;
        }
      }

      setValMessage(""); // Clear validation message if no error

      // Update the appropriate text field with the validated input
      setItemDetailsCopy((prevClientDetailsCopy) => ({
        ...prevClientDetailsCopy,
        [activeField]: input,
      }));
    } else if (location.pathname === `/${v}/Groups`) {
      setGroupDetailsCopy((prevClientDetailsCopy) => ({
        ...prevClientDetailsCopy,
        [activeField]: input,
      }));
    }
    if (
      activeField === "Add Item Number" ||
      activeField === "Add Group Number"
    ) {
      if (!isNaN(input)) {
        setValMessage("");
        setUserName(input);
      } else {
        setValMessage("Number only allowed");
      }
    } else if (activeField === "Add Client") {
      setUserName(input);
    } else if (activeField === "Section No") {
      setSectionNo(input);
    } else if (activeField === "Section Name") {
      setSectionName(input);
    } else if (activeField === "Table No") {
      setTableNo(input);
    } else if (activeField === "Table Waiter") {
      setTableWaiter(input);
    } else if (activeField === "Description") {
      setDescription(input);
    } else if (activeField === "Search a client") {
      setSearchClient(input);
    } else if (
      activeField === "AccDisc" ||
      activeField === "VAT" ||
      activeField === "AccPrice" ||
      activeField === "Floor"
    ) {
      if (isNaN(input)) {
        setValMessage(`${activeField} should be number`);
        return;
      } else {
        setValMessage("");
      }
    } else if (activeField === "Tel") {
      if (!/^\d+$/.test(input)) {
        setValMessage("Telephone number should contain only digits");
        return;
      } else {
        setValMessage("");
      }
    } else if (activeField === "Email") {
      if (!input) {
        setValMessage("");
      } else if (!validateEmail(input)) {
        setValMessage("Invalid email format");
        return;
      } else {
        setValMessage("");
      }
    }
    // Update the appropriate text field with the validated input
    setClientDetailsCopy((prevClientDetailsCopy) => ({
      ...prevClientDetailsCopy,
      [activeField]: input,
    }));
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
              setAccNo={setAccNo}
              url={url}
              v={v}
              activeField={activeField}
              setActiveField={setActiveField}
              showKeyboard={showKeyboard}
              setShowKeyboard={setShowKeyboard}
              setCompTime={setCompTime}
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
                          activeField={activeField}
                          setActiveField={setActiveField}
                          showKeyboard={showKeyboard}
                          setShowKeyboard={setShowKeyboard}
                          userDetails={userDetails}
                          setUserDetails={setUserDetails}
                          userDetailsCopy={userDetailsCopy}
                          setUserDetailsCopy={setUserDetailsCopy}
                          valMessage={valMessage}
                          setValMessage={setValMessage}
                          userName={userName}
                          setUserName={setUserName}
                        />
                      }
                    />
                  )}
                  {userControl === "Y" && (
                    <Route
                      path={`/${v}/CompanyManagement`}
                      element={
                        <Company
                          companyName={companyName}
                          url={url}
                          activeField={activeField}
                          setActiveField={setActiveField}
                          showKeyboard={showKeyboard}
                          setShowKeyboard={setShowKeyboard}
                          companyDetails={companyDetails}
                          setCompanyDetails={setCompanyDetails}
                          companyDetailsCopy={companyDetailsCopy}
                          setCompanyDetailsCopy={setCompanyDetailsCopy}
                          error={error}
                          setError={setError}
                        />
                      }
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
                        accno={accno}
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
                        compTime={compTime}
                        searchClient={searchClient}
                        setSearchClient={setSearchClient}
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
                          itemDetails={itemDetails}
                          setItemDetails={setItemDetails}
                          itemDetailsCopy={itemDetailsCopy}
                          setItemDetailsCopy={setItemDetailsCopy}
                          valMessage={valMessage}
                          setValMessage={setValMessage}
                          userName={userName}
                          setUserName={setUserName}
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
                        setShowKeyboard={setShowKeyboard}
                        setActiveField={setActiveField}
                        sectionNo={sectionNo}
                        setSectionNo={setSectionNo}
                        sectionName={sectionName}
                        setSectionName={setSectionName}
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
                        tableNo={tableNo}
                        setTableNo={setTableNo}
                        active={active}
                        setActive={setActive}
                        description={description}
                        setDescription={setDescription}
                        tableWaiter={tableWaiter}
                        setTableWaiter={setTableWaiter}
                        setShowKeyboard={setShowKeyboard}
                        setActiveField={setActiveField}
                        accno={accno}
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
                          groupDetails={groupDetails}
                          setGroupDetails={setGroupDetails}
                          groupDetailsCopy={groupDetailsCopy}
                          setGroupDetailsCopy={setGroupDetailsCopy}
                          userName={userName}
                          setUserName={setUserName}
                          valMessage={valMessage}
                          setValMessage={setValMessage}
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
                          activeField={activeField}
                          setActiveField={setActiveField}
                          showKeyboard={showKeyboard}
                          setShowKeyboard={setShowKeyboard}
                          currencyDetails={currencyDetails}
                          setCurrencyDetails={setCurrencyDetails}
                          currencyDetailsCopy={currencyDetailsCopy}
                          setCurrencyDetailsCopy={setCurrencyDetailsCopy}
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
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  totalInv={totalInv}
                  setTotalInv={setTotalInv}
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
                {showKeyboard && (
                  <Box
                    sx={{
                      width: "80%",
                      top: "50%", // Adjust as needed to position the keyboard vertically
                      left: "50%", // Adjust as needed to position the keyboard horizontally
                      transform: "translate(-50%, -50%)", // Center the keyboard
                      zIndex: 9999,
                      position: "absolute",
                    }}
                  >
                    <Keyboard
                      onKeyPress={handleKeyPress}
                      setShowKeyboard={setShowKeyboard}
                      showKeyboard={showKeyboard}
                      activeField={activeField}
                    />
                  </Box>
                )}
              </main>
            </>
          )}
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
