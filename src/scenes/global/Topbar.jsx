import { Box, IconButton, useTheme, Button, ListItem, ListItemText } from "@mui/material";
import { useContext, useState, useEffect } from "react";
import { ColorModeContext, tokens } from "../../theme"
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Sidebar from "./Sidebar";
import { useRefresh } from "../RefreshContex";
import { useNavigate, useLocation } from "react-router-dom";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import { width } from "@mui/system";
import { useLanguage } from "../LanguageContext";
import translations from "../translations";
const Topbar = ({
  isCollapsed,
  isMobile,
  setIsCollapsed,
  setIsMobile,
  currentRoute,
  isNav,
  setIsConfOpenDialog,
  setPageRed,
  companyName,
  selectedTop,
  setSelectedTop,
  isOpenDel,
  setIsOpenDel,
  setFilterValue,
  url,
  v,activeField,
                          setActiveField,
                          showKeyboard,
                          setShowKeyboard, setInputValue, tickKey, setTickKey, inputValue, filterValue
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [secOrTab, setSecOrTable] = useState(`/${v}/Sections`);
  const location = useLocation();
  const { language } = useLanguage();
  const t = translations[language];
 
  // const handleResize = () => {
  //   setIsMobile(window.innerWidth <= 768);
  //   if (window.innerWidth > 768) {
  //     setIsCollapsed(false);
  //   } else {
  //     setIsCollapsed(true);
  //   }
  // };
  const { triggerRefresh } = useRefresh();

  const handleRefreshClick = () => {
    triggerRefresh();
  };

  const handleMenuToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const navigate = useNavigate();
  const handleClick = () => {
    if (isNav) {
      navigate(`/${v}/PoS`);
      setSelectedTop("Takeaway");
    } else {
      setIsConfOpenDialog(true);
      setPageRed(`/${v}/PoS`);
    }
  };

  // const handleChart = () => {
  //   if (isNav) {
  //     navigate(`/Chart`);
  //     setSelectedTop("Delivery");
  //   } else {
  //     setIsConfOpenDialog(true);
  //     setPageRed(`/Chart`);
  //   }
  // }
  const handleChart = () => {
    setIsOpenDel(true);
  };

  const handleSections = () => {
    if (isNav) {
      navigate(secOrTab);
      setSelectedTop("Tables");
    } else {
      setIsConfOpenDialog(true);
      setPageRed(secOrTab);
    }
  };

  useEffect(() => {
    const getLen = async () => {
      try {
        const response = await fetch(`${url}/pos/allsections/${companyName}`);
        if (response.ok) {
          const data = await response.json();
          if (data && data.section_list && data.section_list.length > 1) {
            setSecOrTable(`/${v}/Sections`);
          } else {
            const getsec = await fetch(
              `${url}/pos/getOneSection/${companyName}`
            );
            if (getsec.ok) {
              const sec = await getsec.json();
              const sectionNo = sec.sectionNo;
              setSecOrTable(`/${v}/Tables/${sectionNo}`);
            }
          }
        } else {
          console.error("Failed to fetch sections:", response.status);
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };
    getLen();
  }, []);


  return (
    <>
      {(currentRoute == `/${v}/PoS` ||
        currentRoute == `/${v}/Sections` ||
        location.pathname.includes("/Tables")) && (
        <Box
          sx={{
            width: currentRoute === `/${v}/PoS` ? "60%" : "100%",
            //height: "8%",
            height: "50px",
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          {/* <Box display="flex">
        {isMobile && isCollapsed && (
          <IconButton onClick={handleMenuToggle}>
            <MenuOutlinedIcon />
          </IconButton>
        )}
        <Box>
          {isMobile && !isCollapsed && (
            <Sidebar
              isCollapsed={isCollapsed}
              isMobile={isMobile}
              setIsCollapsed={setIsCollapsed}
              setIsMobile={setIsMobile}
            />
          )}
        </Box> */}
          <Box
            sx={{
              display: "flex",
              p: "2",
              width: "80%",
              margin: "2px",
              height: "100%",
            }}
          >
            {currentRoute === `/${v}/PoS` && (
              <Box
                sx={{
                  width: "30%",
                  display: "flex",
                  backgroundColor: colors.primary[500],
                  borderRadius: "3px",
                }}
              >
                <InputBase
                  sx={{ ml: 2, flex: 1 }}
                  placeholder="Search"
                  onChange={(e) => setFilterValue(e.target.value)}
                  onDoubleClick={() => {
                    setInputValue("");
                    setShowKeyboard(true);
                  }}
                  onFocus={() => {
                    setActiveField("Search PoS");
                  }}
                  value={filterValue}
                />
                <IconButton type="button" sx={{ p: 1 }}>
                  <SearchIcon />
                </IconButton>
              </Box>
            )}
            <Box sx={{ display: "flex", width: "70%", height: "100%" }}>
              {(currentRoute === `/${v}/PoS` ||
                currentRoute === `/${v}/Chart` ||
                currentRoute === `/${v}/Sections` ||
                location.pathname.includes("/Tables")) && (
                <Button
                  onClick={handleClick}
                  sx={{
                    width: "30%",
                    display: "flex",
                    fontSize: "1rem",
                    fontWeight: "400",
                    backgroundColor:
                      selectedTop === "Takeaway"
                        ? colors.greenAccent[600]
                        : colors.grey[700],
                    color:
                      selectedTop === "Takeaway"
                        ? colors.primary[500]
                        : "black",
                    "&:hover": {
                      background: colors.greenAccent[500],
                      color: colors.primary[500],
                    },
                  }}
                >
                  {t["TakeAway"]}
                </Button>
              )}
              {/* Delivery button */}
              {!location.search.includes("selectedTableId") &&
                currentRoute === `/${v}/PoS` && (
                  <Button
                    onClick={handleChart}
                    sx={{
                      width: "30%",
                      display: "flex",
                      fontSize: "1rem",
                      fontWeight: "400",
                      background:
                        selectedTop === "Delivery"
                          ? colors.greenAccent[600]
                          : colors.grey[700],
                      color:
                        selectedTop === "Delivery"
                          ? colors.primary[500]
                          : "black",
                    }}
                  >
                    {t["Delivery"]}
                  </Button>
                )}
              {(currentRoute === `/${v}/PoS` ||
                currentRoute === `/${v}/Chart` ||
                currentRoute === `/${v}/Sections` ||
                location.pathname.includes("/Tables")) && (
                <Button
                  onClick={handleSections}
                  sx={{
                    width: "30%",
                    display: "flex",
                    fontSize: "1rem",
                    fontWeight: "400",
                    background:
                      selectedTop === "Tables"
                        ? colors.greenAccent[600]
                        : colors.grey[700],
                    color:
                      selectedTop === "Tables" ? colors.primary[500] : "black",
                    "&:hover": {
                      background: colors.greenAccent[500],
                      color: colors.primary[500],
                    },
                  }}
                >
                  {t["Tables"]}
                </Button>
              )}
            </Box>
          </Box>
          <Box sx={{ width: "20%", marginRight: "auto" }}>
            {/* <IconButton sx={{ width: "33%" }} onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton sx={{ width: "33%" }}>
          <NotificationsOutlinedIcon />
        </IconButton> */}
            {currentRoute === `/${v}/PoS` && (
              <IconButton onClick={handleRefreshClick}>
                <RestoreOutlinedIcon />
              </IconButton>
            )}
          </Box>

          {/* </Box> */}
        </Box>
      )}
    </>
  );
};

export default Topbar;
