import React from "react";
import { Button } from "@material-ui/core";
import useStyles from "./styles";
import Clock from "react-live-clock";
import { Assignment, CollectionsBookmark, Description, GroupRounded, LocalMall } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";

export default function PageTitle(props) {
  const classes = useStyles();

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h3" size="sm">
        {props.title}
        {props.icon === 'users' && (<GroupRounded fontSize="large" className={classes.tagIcon} />)}
        {props.icon === 'orders' && (<Assignment fontSize="large" className={classes.tagIcon} />) }
        {props.icon ==='marketing' && (<CollectionsBookmark  fontSize="large" className={classes.tagIcon} />)}
        {props.icon ==='order' && (<Description fontSize="large" className={classes.tagIcon} />)}
        {props.icon ==='product' && (<LocalMall fontSize="large" className={classes.tagIcon} />)}
      </Typography>
        <Button
          size="large"
          style={{color: 'white'}}
        >
          <Clock
            ticking={true}
            date={'1997-12-31T14:15:23+01:00'}
            format={'dddd, MMMM Mo, YYYY, h:mm:ss A'}/>
        </Button>
    </div>
  );
}
