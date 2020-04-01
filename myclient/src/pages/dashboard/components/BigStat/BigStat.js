import React from "react";
import useStyles from "./styles";
import Widget from "../../../../components/Widget/Widget";
import Typography from "@material-ui/core/Typography";

export default function BigStat(props) {
  const {title, icon, total } = props;
  const classes = useStyles();
    return (
      <Widget
        header={
          <div className={classes.title}>
            {icon}
            <Typography variant="h4" color="textPrimary">Today</Typography>
          </div>
        }
      >
        <Typography variant="h5" color="secondary">{title}</Typography>
        <div className={classes.totalValueContainer}>
          <div className={classes.totalValue}>
            <Typography size="xl" color="textPrimary">
              {total}
            </Typography>
          </div>
          <div>
        </div>
        </div>
      </Widget>
    )
}
