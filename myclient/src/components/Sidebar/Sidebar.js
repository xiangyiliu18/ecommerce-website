import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
  People,
  Assignment,
  LocalMall,
  BusinessCenter,Help,
} from "@material-ui/icons";
import { faCartPlus, faChartBar, faAd } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";
import useStyles from "./styles";
import SidebarLink from "./SidebarLink/SidebarLink";
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import StorageUtils from "../Storage/StorageUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const structure = [
  { id: 0, role: 'all', label: "Dashboard", link: "/home/dashboard", icon: <HomeIcon /> },
  { id: 1, role: 'admin', label: "Users", link: "/home/users", icon: <People/>},
  { id: 2, role: 'product', label: "Products", link: "/home/products", icon:  <LocalMall />,
    children: [
      { id: 3, role: 'product', label: "All Products", link: "/home/products/all", icon:  <LocalMall />},
      { id: 4, role: 'product', label: "Add Product", link: "/home/products/add",  icon: <FontAwesomeIcon icon ={faCartPlus} size="lg" />},
      // { id: 5, role: 'product',label: "Categories", link: "/home/products/categories",  icon: <LocalOffer />}
    ],
  },
  { id: 5, role: 'order', label: "Orders", link: "/home/orders",icon: <Assignment />},
  { id: 6, role: 'marketing', label: "Marketing", link: "/home/marketing", icon: <BusinessCenter />,
    children: [
      { id: 7, role: 'marketing',label: "Daily Promotion", link: "/home/marketing/daily",  icon: <FontAwesomeIcon icon ={faAd} size="lg" />},
      { id: 8,role: 'marketing',label: "Analytics", link: "/home/marketing/analytics",icon:  <FontAwesomeIcon icon ={faChartBar} size="lg" />},
    ],
  },
     // { id: 9,role: 'all',label: "Help", link: "/home/help",icon: <Help />
];

function Sidebar({ location }) {
  const classes = useStyles();
  const theme = useTheme();
  const userRoles= StorageUtils.getToken().roles; // ["admin"], ["product", ["order"], ["marketing"]
  const  newStructure = structure.filter(link => {
    return (link.role === 'all' || userRoles.includes('admin') || userRoles.includes(link.role))
 });
  const { isSidebarOpened } = useLayoutState();
  const layoutDispatch = useLayoutDispatch();
  const [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });
  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {newStructure.map(link => (
          <SidebarLink
              key={link.id}
              role={link.role}
              location={location}
              isSidebarOpened={isSidebarOpened}
              {...link}
            />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
