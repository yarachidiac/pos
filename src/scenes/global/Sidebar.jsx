import React from "react";
import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link, redirect } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import PostAddOutlinedIcon from "@mui/icons-material/PostAddOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  setOpen,
  userControl,
  isNav,
  setIsConfOpenDialog,
  setIsAuthenticated,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const handleManagePoS = () => {
    // console.log("ggggggggggggggggg", isNav)
    // if (isNav) {
    //   if (userControl === "N") {
    //     setOpen(true);
    //   } else {
    //     navigate("/ManagePoS");
    //   }
    // } else {
    //   setIsConfOpenDialog(true);
    // }
    if (userControl === "N") {
      setOpen(true);
    } else {
      if (isNav) {
        navigate("pointofsale/ManagePoS");
      } else {
        setIsConfOpenDialog(true);
      }
    }
  };

  const handleManageGroups = () => {
    if (userControl === "N") {
      setOpen(true);
    } else {
      if (isNav) {
        navigate("/Groups");
      } else {
        setIsConfOpenDialog(true);
      }
    }
  };

  const handleComp = () => {
    if (userControl === "N") {
      setOpen(true);
    } else {
      if (isNav) {
        navigate("/CompanyManagement");
      } else {
        setIsConfOpenDialog(true);
      }
    }
  };

  const handleUser = () => {
    if (userControl === "N") {
      setOpen(true);
    } else {
      if (isNav) {
        navigate("/team");
      } else {
        setIsConfOpenDialog(true);
      }
    }
  };
  const handleStation = () => {
    if (userControl === "N") {
      setOpen(true);
    } else {
      if (isNav) {
        navigate("/Station");
      } else {
        setIsConfOpenDialog(true);
      }
    }
  };
  const handleKitchen = () => {
    if (userControl === "N") {
      setOpen(true);
    } else {
      if (isNav) {
        navigate("/Kitchen");
      } else {
        setIsConfOpenDialog(true);
      }
    }
  };

  const handleCurrency = () => {
    if (userControl === "N") {
      setOpen(true);
    } else {
      if (isNav) {
        navigate("/Currency");
      } else {
        setIsConfOpenDialog(true);
      }
    }
  };

  const handleDashboard = () => {
    if (isNav) {
      navigate("/pointofsale");
    } else {
      setIsConfOpenDialog(true);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    setIsAuthenticated(false);
  };

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => {
        if (title === "Manage POS") {
          handleManagePoS();
        } else if (title === "POS") {
          if (isNav) {
            navigate("/PoS");
          } else {
            setIsConfOpenDialog(true);
          }
        } else if (title === "Manage Groups") {
          handleManageGroups();
        } else if (title === "Company Management") {
          handleComp();
        } else if (title === "User Settings") {
          handleUser();
        } else if (title === "Station Settings") {
          handleStation();
        } else if (title === "Kitchen") {
          handleKitchen();
        } else if (title === "Dashboard") {
          handleDashboard();
        } else if (title === "Currency") {
          handleCurrency();
        } else if (title === "Logout") {
          handleLogout();
        }
      }}
      icon={icon}
    >
      <Box width="200px">
        <Typography>{title}</Typography>
      </Box>
      {/* <Link to={to} /> */}
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
  isNav, setIsConfOpenDialog,
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
      // isopen={false}
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

const Sidebar = ({
  isCollapsed,
  isMobile,
  setIsCollapsed,
  setIsMobile,
  userControl,
  setOpen,
  companyName,
  isNav,
  setIsConfOpenDialog,
  setIsAuthenticated,
}) => {
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
        //width: isCollapsed ? "5%" : "15%",
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
                      {companyName}
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
              title="Dashboard"
              selected={selected}
              setSelected={setSelected}
              isNav={isNav}
            />
            <Item
              icon={<PointOfSaleOutlinedIcon />}
              title="POS"
              selected={selected}
              setSelected={setSelected}
              isNav={isNav}
              setIsConfOpenDialog={setIsConfOpenDialog}
            />
            <Item
              icon={<PostAddOutlinedIcon />}
              title="Manage POS"
              selected={selected}
              setSelected={setSelected}
              setOpen={setOpen}
              userControl={userControl}
              isNav={isNav}
              setIsConfOpenDialog={setIsConfOpenDialog}
            />
            <Item
              icon={<AssessmentOutlinedIcon />}
              title="Manage Groups"
              selected={selected}
              setSelected={setSelected}
              setOpen={setOpen}
              userControl={userControl}
              isNav={isNav}
              setIsConfOpenDialog={setIsConfOpenDialog}
            />
            {/* <SubItem
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
            </SubItem> */}
            {/* <SubItem
              title="Accounting"
              icon={<AccountBalanceOutlinedIcon />}
              isCollapsed={isCollapsed}
              handleSubItemClick={handleSubItemClick}
              selected={selected} // Pass selected to SubItem
              setSelected={setSelected}
            >
              <Item
                title="Chart of Account"
                to="/Chart"
                selected={selected}
                setSelected={setSelected}
              />
              <Item
                title="Journal Varchar"
                to="/journal"
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
            </SubItem> */}
            {/* <SubItem
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
            </SubItem> */}
            {/* <SubItem
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
            </SubItem> */}
            <SubItem
              title="Company Settings"
              icon={<StoreIcon />}
              isCollapsed={isCollapsed}
              handleSubItemClick={handleSubItemClick}
              selected={selected} // Pass selected to SubItem
              setSelected={setSelected}
              setOpen={setOpen}
              userControl={userControl}
              isNav={isNav}
              setIsConfOpenDialog={setIsConfOpenDialog}
            >
              <Item
                title="Company Management"
                to="/CompanyManagement"
                selected={selected}
                setSelected={setSelected}
                setOpen={setOpen}
                userControl={userControl}
                isNav={isNav}
                setIsConfOpenDialog={setIsConfOpenDialog}
              />
              <Item
                title="Station Settings"
                to="/Station"
                selected={selected}
                setSelected={setSelected}
                setOpen={setOpen}
                userControl={userControl}
                isNav={isNav}
                setIsConfOpenDialog={setIsConfOpenDialog}
              />
              <Item
                title="User Settings"
                to="/team"
                selected={selected}
                setSelected={setSelected}
                setOpen={setOpen}
                userControl={userControl}
                isNav={isNav}
                setIsConfOpenDialog={setIsConfOpenDialog}
              />
              <Item
                title="Kitchen"
                to="/Kitchen"
                selected={selected}
                setSelected={setSelected}
                setOpen={setOpen}
                userControl={userControl}
                isNav={isNav}
                setIsConfOpenDialog={setIsConfOpenDialog}
              />
              {/* <SubItem
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
                /> */}
              <Item
                title="Currency"
                to="/Currency"
                selected={selected}
                setSelected={setSelected}
                userControl={userControl}
                isNav={isNav}
                setIsConfOpenDialog={setIsConfOpenDialog}
              />
              {/* </SubItem> */}
            </SubItem>
            <Item
              icon={<LogoutOutlinedIcon />}
              title="Logout"
              setIsAuthenticated={setIsAuthenticated}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;