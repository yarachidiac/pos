import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
// import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlinedIcon";
// import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlinedIcon";
// import PersonOutlinedIcon from "@mui/icons-material/PersonOutlinedIcon";
// import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlinedIcon";
// import HelpOutlinedIcon from "@mui/icons-material/HelpOutlinedIcon";
// import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlinedIcon";
// import PieChartOutlinedOutlinedIcon from "@mui/icons-material/PieChartOutlinedOutlinedIcon";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Box width="200px">
        <Typography>{title}</Typography>
      </Box>
      <Link to={to} />
    </MenuItem>
  );
};

const SubItem = ({ title, icon, children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <SubMenu
      title={
        <Box >
          <Typography>{title}</Typography>
        </Box>
      }
      icon={icon}
      style={{
        color: colors.grey[100],
      }}
    >
      {children}
    </SubMenu>
  );
};
const Sidebar = ({ isCollapsed, isMobile, setIsCollapsed, setIsMobile }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  //const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  console.log("isMobile from sidebar:", isMobile);
  console.log("isCollapsed from sidebar:", isCollapsed);

  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // const handleResize = () => {
  //   setIsMobile(window.innerWidth <= 768);
  //   if (window.innerWidth > 768) {
  //     setIsCollapsed(false);
  //   } else {
  //             setIsCollapsed(true);

  //   }
  // };

  // const handleMenuToggle = () => {
  //   setIsCollapsed(!isCollapsed);
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);
  return (
    <Box
      sx={{
        position: isMobile && !isCollapsed ? "fixed" : "relative",
        zIndex: 1000, // Adjust the z-index to make sure it appears above other content
        //width: isCollapsed ? "auto" : "240px", // Adjust the width as needed
        height: isMobile && !isCollapsed ? "100%" : "auto", // Fixed height for mobile view
        overflowY: isMobile && !isCollapsed ? "auto" : "visible", // Make it scrollable on mobile

        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-menu-item": {
          padding: "5px 5px 10px 10px !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .react-slidedown.pro-inner-list-item": {
          backgroundColor: "transparent !important",
          // Add other styles as needed
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
        //position: (isMobile && !isCollapsed) ? "fixed" : "relative",
        //zIndex: 1000, // Adjust the z-index to make sure it appears above other content
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="circle">
          <MenuItem
          // onClick={handleMenuToggle}
          // icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          // style={{
          //   margin: "10px 0 20px 0",
          // }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                {isMobile && (
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                )}
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box>
              <Item
                icon={<HomeOutlinedIcon />}
                title="Dahboard"
                to="/"
                selected={selected}
                setSelected={setSelected}
              />
              <SubItem title="Inventory Management" icon={<MenuOutlinedIcon />}>
                <Item
                  title="Items"
                  to="/team"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Purshase"
                  to="/team"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Sales Invoice"
                  to="/team"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Sales Return"
                  to="/team"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Purshase Return"
                  to="/team"
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubItem>
              <SubItem title="Accounting" icon={<MenuOutlinedIcon />}>
                <Item
                  title="Chart of Account"
                  to="/team"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Journal Varchar"
                  to="/team"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Statement of Account"
                  to="/team"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Trial Balance"
                  to="/team"
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubItem>
              <SubItem title="Payment & Receivable" icon={<MenuOutlinedIcon />}>
                <Item
                  title="Payment Voucher"
                  to="/team"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Receipt Voucher"
                  to="/team"
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubItem>
              <SubItem title="Reports" icon={<MenuOutlinedIcon />}>
                <Item
                  title="Stocks Report"
                  to="/team"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Accounting Reports"
                  to="/team"
                  selected={selected}
                  setSelected={setSelected}
                />
              </SubItem>
              <SubItem title="Company Settings" icon={<MenuOutlinedIcon />}>
                <Item
                  title="Company Management"
                  to="/Company Management"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Station Settings"
                  to="/Company Management"
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="User Settings"
                  to="/team"
                  selected={selected}
                  setSelected={setSelected}
                />

                <SubItem
                  title="General Information"
                  icon={<MenuOutlinedIcon />}
                >
                  <Item
                    title="Department Management"
                    to="/Department Management"
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Currency"
                    to="/Currency"
                    selected={selected}
                    setSelected={setSelected}
                  />
                </SubItem>
              </SubItem>
            </Box>
          )}
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;