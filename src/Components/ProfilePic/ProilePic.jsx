import React from "react";
import DefaultUserImg from "../../assets/img/default-user.png";
import { makeStyles, Modal } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "50px",
    height: "50px",

    padding: 5,
    backgroundColor: "transparent",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: "100%",
  },
  modalImg: {
    width: "200px",
    height: "200px",

    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  },
  "@media(max-width:600px)": {
    root: {
      width: "40px",
      height: "40px",
    },
  },
}));
const ProilePic = ({ url }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const onHandleClose = () => {
    setOpen(false);
  };
  const onHandleOpen = () => {
    setOpen(true);
  };
  return (
    <div className={classes.root}>
      <img
        src={url ? url : DefaultUserImg}
        alt={DefaultUserImg}
        className={classes.img}
        onClick={onHandleOpen}
      />
      <Modal
        open={open}
        onClose={onHandleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <img
          src={url ? url : DefaultUserImg}
          alt={DefaultUserImg}
          className={classes.modalImg}
          onClick={onHandleOpen}
        />
      </Modal>
    </div>
  );
};

export default ProilePic;
