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
import { setIn } from 'formik';


function App() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [companyName, setCompanyName] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [branch, setBranch] = useState("");
  const [invType, setInvType] = useState("");

  useEffect(() => {
    // const handleResize = () => {
    //   setIsMobile(window.innerWidth <= 768);
    //   if (window.innerWidth > 768) {
    //     setIsCollapsed(true);
    //   } else {
    //     setIsCollapsed(true);
    //   }
    // };

    // window.addEventListener("resize", handleResize);

    const initializeAuthentication = async () => {
      try {
        const storedCompanyName = localStorage.getItem("company_name");
        const storedBranch = localStorage.getItem("user_branch");
        const storedInvType = localStorage.getItem("user_invType");

        if (storedCompanyName) {
          setCompanyName(storedCompanyName);
          setIsAuthenticated(true);
          setBranch(storedBranch);
          setInvType(storedInvType);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error initializing authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    // window.addEventListener("resize", handleResize);

    initializeAuthentication();

    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, []);

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
