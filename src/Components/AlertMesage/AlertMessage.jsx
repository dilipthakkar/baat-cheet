/**
 * @info
 * * using common Feature for showing alert
 *
 */

import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { emptyError, emptyMessage } from "../../Features/Common/CommonSlice";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const MessageAlert = ({ isOpen, text, type = "success" }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(isOpen);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  React.useEffect(() => {
    setOpen(isOpen);
    const interval = setTimeout(() => {
      if (isOpen) {
        if (type === "success") {
          dispatch(emptyMessage());
        } else {
          dispatch(emptyError());
        }
      }
    }, 6000);
    return () => {
      clearInterval(interval);
    };
  }, [isOpen, type]);

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={type}>
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default React.memo(MessageAlert);
