import useStyles from "../../../components/Widget/styles";
import { Paper, Typography } from "@material-ui/core";
import React from "react";
import classnames from "classnames";
import { ArrowForward, Whatshot } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

export default function SimpleWidget({
                          children,
                          title,
                          noBodyPadding,
                          bodyClass,
                          disableWidgetMenu,
                          header,
                          ...props
                        }) {
const classes = useStyles();
  return (
    <div className={classes.widgetWrapper}>
      <Paper className={classes.paper} classes={{ root: classes.widgetRoot }}>
        <div className={classes.widgetHeader}>
          {header ? (
            header
          ) : (
            <React.Fragment>
              <Typography variant="h5" color="textPrimary">
              <Whatshot color="error"/> {title}
              </Typography>
              <NavLink to="/home/products/all">
                <Button color="primary" variant="contained"> See All products <ArrowForward/> </Button>
              </NavLink>
            </React.Fragment>
          )}
        </div>
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass]: bodyClass,
          })}
        >
          {children}
        </div>
      </Paper>
    </div>
  );
}
