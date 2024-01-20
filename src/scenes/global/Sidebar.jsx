import React from "react";
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
import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import StoreIcon from "@mui/icons-material/Store";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import PointOfSaleOutlinedIcon from "@mui/icons-material/PointOfSaleOutlined";

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

const SubItem = ({
  title,
  icon,
  children,
  isCollapsed,
  handleSubItemClick,
  selected,
  setSelected,
}) => {
  const handleItemClick = () => {
    // Call the handler to open the sidebar and handle the SubItem click
    handleSubItemClick(title);
  };
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <SubMenu
      onClick={handleItemClick}
      title={
        <Box>
          <Typography>{title}</Typography>
        </Box>
      }
      icon={icon}
      style={{
        color: colors.grey[100],
      }}
      isOpen={false}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          selected: child.props.title === selected,
          setSelected: setSelected, // Pass setSelected to the Item components
          onClick: () => handleSubItemClick(child.props.title),
        })
      )}
      <style>
        {`
          .pro-arrow-wrapper {
            ${isCollapsed ? "display: none;" : ""}
          }
        `}
      </style>
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
  
  const handleSubItemClick = (menuItem) => {
    if (isCollapsed) {
      setIsCollapsed(false); // Open the sidebar
    }

    // Handle the SubItem click as needed
    setSelected(menuItem);
  };
  

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
          background: `${colors.primary[500]} !important`,
        },
        "& .pro-menu-item": {
          padding: "5px 5px 10px 10px !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .react-slidedown.pro-inner-list-item": {
          color: `${colors.greenAccent[500]} !important`,
          display: isCollapsed ? "none" : "",
          // Add other styles as needed
        },

        "& .pro-inner-item:hover": {
          color: `${colors.greenAccent[500]} !important`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.greenAccent[500]} !important`,
        },
        "& .pro-sub-menu .pro-inner-item.active": {
          color: `${colors.greenAccent[500]} !important`,
        },

        //position: (isMobile && !isCollapsed) ? "fixed" : "relative",
        //zIndex: 1000, // Adjust the z-index to make sure it appears above other content
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="circle">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed && (
                <MenuOutlinedIcon style={{ color: colors.grey[100] }} />
              )
            }
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: "15px",
              }}
            >
              {!isCollapsed && (
                <>
                  <Box>
                    <Typography variant="h3" color={colors.grey[100]}>
                      ADMIN
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      "& .react-slidedown.pro-inner-list-item": {},
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        setIsCollapsed(!isCollapsed);
                      }}
                    >
                      <MenuOutlinedIcon />
                    </IconButton>
                  </Box>
                </>
              )}
            </Box>
          </MenuItem>

          <Box>
            <Item
              icon={<HomeOutlinedIcon />}
              title="Dahboard"
              to="/"
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              icon={<PointOfSaleOutlinedIcon />}
              title="POS"
              to="/PoS"
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              icon={<PointOfSaleOutlinedIcon />}
              title="Manage POS"
              to="/ManagePoS"
              selected={selected}
              setSelected={setSelected}
            />
            <SubItem
              title="Inventory Management"
              icon={<Inventory2OutlinedIcon />}
              isCollapsed={isCollapsed}
              handleSubItemClick={handleSubItemClick}
              selected={selected} // Pass selected to SubItem
              setSelected={setSelected}
            >
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
            <SubItem
              title="Accounting"
              icon={<AccountBalanceOutlinedIcon />}
              isCollapsed={isCollapsed}
              handleSubItemClick={handleSubItemClick}
              selected={selected} // Pass selected to SubItem
              setSelected={setSelected}
            >
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
            <SubItem
              title="Payment & Receivable"
              icon={<PaidOutlinedIcon />}
              isCollapsed={isCollapsed}
              handleSubItemClick={handleSubItemClick}
              selected={selected} // Pass selected to SubItem
              setSelected={setSelected}
            >
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
            <SubItem
              title="Reports"
              icon={<SummarizeOutlinedIcon />}
              isCollapsed={isCollapsed}
              handleSubItemClick={handleSubItemClick}
              selected={selected} // Pass selected to SubItem
              setSelected={setSelected}
            >
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
            <SubItem
              title="Company Settings"
              icon={<StoreIcon />}
              isCollapsed={isCollapsed}
              handleSubItemClick={handleSubItemClick}
              selected={selected} // Pass selected to SubItem
              setSelected={setSelected}
            >
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
                isCollapsed={isCollapsed}
                handleSubItemClick={handleSubItemClick}
                selected={selected} // Pass selected to SubItem
                setSelected={setSelected}
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
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;