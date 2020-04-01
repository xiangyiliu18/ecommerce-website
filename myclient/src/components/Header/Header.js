import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
} from "@material-ui/core";
import {
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon, AccountCircle
} from "@material-ui/icons";
import classNames from "classnames";
import useStyles from "./styles"
import { Typography } from "../Wrappers/Wrappers";
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";
import { connect } from "react-redux";
import { logout } from "../../actions/logout.action";
import StorageUtils from "../Storage/StorageUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { noticeOptions } from "../GlobalParams";
import { useSnackbar } from "notistack";
import Tooltip from "@material-ui/core/Tooltip";

function Header(props) {
  const classes = useStyles();
  const layoutState = useLayoutState();
  const layoutDispatch = useLayoutDispatch();
  const currentUser = StorageUtils.getToken();
  const {enqueueSnackbar} = useSnackbar();

  const handleLogout = () => {
    props.logout((res)=> {
      if(res.success) {
        noticeOptions.variant = "success";
        enqueueSnackbar(res.message, noticeOptions);
        StorageUtils.logout();
        props.history.replace('/login');
      }
      else{
        noticeOptions.variant = "error";
        enqueueSnackbar(res.message, noticeOptions)
      }
    }, (err)=> {
      noticeOptions.variant = "error";
      enqueueSnackbar(err.message, noticeOptions)
    });
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButton,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
        <Typography variant="h4" weight='medium' className={classes.logotype}>
         E-WORLD Management System
        </Typography>
        <div className={classes.grow} />
        <Typography variant="h6" className={classes.welcomeText}>
          Welcome,{currentUser.username}
        </Typography>
        <Tooltip title={currentUser.username}>
          <AccountCircle fontSize="large" />
         </Tooltip>
        <IconButton title="Log Out" onClick={handleLogout} className={classes.logoutBtn}>
          <FontAwesomeIcon icon={faPowerOff} size="sm"/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
export default connect(null,{logout})(Header);
