import React from "react";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import { makeStyles, Typography, Box } from "@material-ui/core";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import DoneIcon from "@material-ui/icons/Done";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { motion } from "framer-motion";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5px",
    maxWidth: "70%",
    width: "fit-content",
    margin: "5px",
    flexDirection: "column",
    alignItems: "flex-end",
    borderRadius: "5px",
  },
  msgBody: {
    wordBreak: "break-all",
    textAlign: "left",
  },
  timeContainer: {
    display: "flex",
    position: "relative",
    paddingLeft: "30px",
  },
}));

const Message = (props) => {
  const { msg, userId } = props;
  const classes = useStyles();

  const animationVariant = {
    hidden: {
      x: userId == msg.sender ? "20vw" : "-20vw",
      transition: { ease: "easeInOut" },
    },
    visible: {
      x: 0,
      transition: { duration: 7, type: "spring", stiffness: 120 },
    },
    exit: {
      x: "-100vw",
      transition: { ease: "easeInOut" },
    },
  };
  return (
    <motion.div
      variants={animationVariant}
      initial={"hidden"}
      animate={"visible"}
      exit="exit"
    >
      <GridContainer
        className={classes.root}
        style={{
          marginLeft: userId == msg.sender ? "auto" : "14px",
          backgroundColor: msg.sender === userId ? "#dcf8c6" : "white",
        }}
      >
        <GridItem style={{ alignSelf: "flex-start" }}>
          <Typography variant="h5" className={classes.msgBody}>
            {msg.body || ""}
          </Typography>
        </GridItem>

        <GridItem className={classes.timeContainer}>
          {/* <Typography>{"9:29"}</Typography> */}
          {userId == msg.sender && (
            <>
              {msg.status === "delivered" && <DoneIcon />}
              {msg.status === "seen" && (
                <DoneAllIcon style={{ color: "#34B7F1" }} />
              )}
              {msg.status === "pending" && <ScheduleIcon />}
            </>
          )}
        </GridItem>
      </GridContainer>
    </motion.div>
  );
};

export default React.memo(Message);
