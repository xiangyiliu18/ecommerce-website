
import React from "react";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import classnames from "classnames";
import useStyles from "./styles";

const ServerError = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Typography
        variant="h2"
      >
        500 Internal Server Error
      </Typography>
      <Typography variant="h6" className={classes.textRow}>
        Please Try Again Later Or feel free to contact EWorld BackEnd Management Department
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        size="large"
        className={classes.backButton}
      >
        Back to Home
      </Button>
    </Grid>
  )
};

export default ServerError;
