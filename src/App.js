import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import Topbar from './scenes/global/Topbar';
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
import Company from './scenes/company';
import PoS from './scenes/PoS';
import ManagePoS from './scenes/ManagePos';
import { useNavigate, useLocation } from "react-router-dom";
import Delivery from './scenes/PoS/Delivery';
import ChartAcc from './scenes/ChartAcc';

function App() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [companyName, setCompanyName] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [branch, setBranch] = useState("");
  const [invType, setInvType] = useState("");
  const [addTitle, setAddTitle] = useState("Add User");
  const navigate = useNavigate();
  const location = useLocation();

 useEffect(() => {
   const initializeAuthentication = async () => {
     try {
       const storedAuthStatus = sessionStorage.getItem("isAuthenticated");

       if (storedAuthStatus === "true") {
         const storedCompanyName = localStorage.getItem("company_name");
         const storedBranch = localStorage.getItem("user_branch");
         const storedInvType = localStorage.getItem("user_invType");

         setCompanyName(storedCompanyName);
         setBranch(storedBranch);
         setInvType(storedInvType);
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
    return <div></div>;
  }

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
              // companyName={companyName}
              // setCompanyName={setCompanyName}
            />
          ) : (
            <>
              {!isMobile && (
                <Sidebar
                  isCollapsed={isCollapsed}
                  isMobile={isMobile}
                  setIsCollapsed={setIsCollapsed}
                  setIsMobile={setIsMobile}
                />
              )}
              <main className="content">
                <Topbar
                  isCollapsed={isCollapsed}
                  isMobile={isMobile}
                  setIsCollapsed={setIsCollapsed}
                  setIsMobile={setIsMobile}
                  currentRoute={location.pathname}
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
                    path="/Company Management"
                    element={
                      <Company
                        companyName={companyName}
                        setCompanyName={setCompanyName}
                      />
                    }
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
                        //setCompanyName={setCompanyName}
                      />
                    }
                  />
                  <Route
                    path="/Delivery"
                    element={
                      <Delivery
                        companyName={companyName}
                        branch={branch}
                        invType={invType}
                        addTitle={addTitle}
                        setAddTitle={setAddTitle}
                        //setCompanyName={setCompanyName}
                      />
                    }
                  />
                  <Route
                    path="/Chart"
                    element={
                      <ChartAcc
                        companyName={companyName}
                        branch={branch}
                        invType={invType}
                        addTitle={addTitle}
                        setAddTitle={setAddTitle}
                        //setCompanyName={setCompanyName}
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
