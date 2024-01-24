import { Box, IconButton, useTheme } from "@mui/material";
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

const Topbar = ({ isCollapsed, isMobile, setIsCollapsed, setIsMobile }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
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

  return (
    <Box sx={{width:"70%"}}>
      <Box display="flex" >
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
        <Box display="flex" justifyContent="space-between" p={2}>
          <Box
            display="flex"
            backgroundColor={colors.primary[500]}
            borderRadius="3px"
          >
            <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
            <IconButton type="button" sx={{ p: 1 }}>
              <SearchIcon />
            </IconButton>
          </Box>
          <Box display="flex">
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
