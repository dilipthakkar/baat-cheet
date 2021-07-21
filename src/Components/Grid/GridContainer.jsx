import React from "react";
import { Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const GridContainer = (props) => {
  const classes = useStyles();
  const { children, className, ...rest } = props;
  return (
    <Grid container className={classes.root + " " + className} {...rest}>
      {children}
    </Grid>
  );
};

export default GridContainer;
