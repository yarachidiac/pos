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


function App() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [companyName, setCompanyName] = useState(""); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsCollapsed(false);
      } else {
        setIsCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);

    const initializeAuthentication = async () => {
      try {
        const storedCompanyName = localStorage.getItem("company_name");

        if (storedCompanyName) {
          setCompanyName(storedCompanyName);
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

    window.addEventListener("resize", handleResize);

    initializeAuthentication();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
              {!isMobile && <Sidebar />}
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
                  {/* <Route path="/general-accounting" element={<GenralAcc />} />
                  <Route path="/stock-inventory" element={<StockInv />} /> */}

                  {/* <Route path="/items" element={<Items />} />
              <Route path="/purshase" element={<Purshase />} />
              <Route path="/salesinvoice" element={<SalesInvoice />} />
              <Route path="/salesreturn" element={<SalesReturn />} />
              <Route path="/purshasereturn" element={<PurshaseReturn />} />
              <Route path="/ChartAccount" element={<ChartAccount />} />
              <Route path="/JournalVoucher" element={<JournalVoucher />} />
              <Route
                path="/StatementOfAccount"
                element={<StatementOfAccount />}
              />
              <Route path="/TrialBalance" element={<TrialBalance />} />
              <Route path="/PaymentVoucher" element={<PaymentVoucher />} />
              <Route path="/ReceiptVoucher" element={<ReceiptVoucher />} />
              <Route path="/StockReports" element={<StockReports />} />
              <Route
                path="/AccountingReports"
                element={<AccountingReports />}
              />
              <Route path="/UserSettings" element={<UserSettings />} />
              <Route path="/GeneralInformation" element={<GeneralInformation />} /> */}
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
