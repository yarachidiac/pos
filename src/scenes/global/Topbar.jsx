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
  sectionNo,
  setSectionNo,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [secOrTab, setSecOrTable] = useState(`/Sections`);
  const location = useLocation();
  console.log("isMobile from topbarr:", isMobile);
  console.log("isCollapsed from topbarr:", isCollapsed);

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
    console.log("isMobile from topbarr:", isMobile);
    console.log("isCollapsed from topbarr:", isCollapsed);
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
      navigate(`/PoS`);
      setSelectedTop("Takeaway");
    } else {
      setIsConfOpenDialog(true);
      setPageRed(`/PoS`);
    }
  }

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
  }

  console.log("selecteddd topp", selectedTop);
  useEffect(() => {
    const getLen = async () => {
      try {
        const response = await fetch(
          `http://192.168.16.113:8000/allsections/${companyName}`
        );
        if (response.ok) {
          const data = await response.json();
          if (data && data.section_list && data.section_list.length > 1) {
            setSecOrTable(`/Sections`);
          } else {
            const getsec = await fetch(`http://192.168.16.113:8000/getOneSection/${companyName}`);
            if (getsec.ok) {
              const sec = await getsec.json();
              const sectionNo = sec.sectionNo;
              setSecOrTable(`/Tables/${sectionNo}`);
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
    <Box sx={{ width: "70%" }}>
      <Box display="flex">
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
        </Box>
        <Box sx={{ display: "flex", p: "2", width: "100%", margin: "2px" }}>
          {currentRoute === "/PoS" && (
            <Box
              sx={{
                width: "30%",
                display: "flex",
                backgroundColor: colors.primary[500],
                borderRadius: "3px",
              }}
            >
              <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
              <IconButton type="button" sx={{ p: 1 }}>
                <SearchIcon />
              </IconButton>
            </Box>
          )}
          <Box sx={{ display: "flex", width: "70%" }}>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlinedIcon />
              ) : (
                <LightModeOutlinedIcon />
              )}
            </IconButton>
            <IconButton>
              <NotificationsOutlinedIcon />
            </IconButton>
            {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
              </IconButton> */}
            {(currentRoute === "/PoS" ||
              currentRoute === "/Chart" ||
              currentRoute === "/Sections" ||
              location.pathname.includes("/Tables")) && (
              <Button
                onClick={handleClick}
                sx={{
                  width: "20%",
                  display: "flex",
                  fontSize: "1rem",
                  fontWeight: "400",
                  backgroundColor:
                    selectedTop === "Takeaway"
                      ? colors.greenAccent[600]
                      : colors.grey[700],
                  color:
                    selectedTop === "Takeaway" ? colors.primary[500] : "black",
                }}
              >
                Take Away
              </Button>
            )}
            {/* Delivery button */}
            {!location.search.includes("selectedTableId") &&
              currentRoute === "/PoS" && (
                <Button
                  onClick={handleChart}
                  sx={{
                    width: "20%",
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
                  Delivery
                </Button>
              )}
            {(currentRoute === "/PoS" ||
              currentRoute === "/Chart" ||
              currentRoute === "/Sections" ||
              location.pathname.includes("/Tables")) && (
              <Button
                onClick={handleSections}
                sx={{
                  width: "20%",
                  display: "flex",
                  fontSize: "1rem",
                  fontWeight: "400",
                  background:
                    selectedTop === "Tables"
                      ? colors.greenAccent[600]
                      : colors.grey[700],
                  color:
                    selectedTop === "Tables" ? colors.primary[500] : "black",
                }}
              >
                Tables
              </Button>
            )}
            {currentRoute === "/PoS" && (
              <IconButton onClick={handleRefreshClick}>
                <RestoreOutlinedIcon />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
