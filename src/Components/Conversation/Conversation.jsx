import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";
import ProfiePic from "../ProfilePic/ProilePic";
import { useHistory } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5px",
    borderBottom: "1px solid rgba(165 , 165 , 165, 0.4)",
  },
  firstContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    paddingLeft: "30px",
    justifyContent: "center",
    "& .msg-text": {
      textOverflow: "ellipsis",
    },
  },
  secondContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  msgCount: {
    color: "white",
    backgroundColor: "green",
    borderRadius: "100%",
    padding: "1px 7px",
  },
}));
const Conversation = (props) => {
  const { conversation } = props;
  const classes = useStyles();
  const history = useHistory();
  const countUnseenMsg = (messages) => {
    return messages.filter(
      (message) =>
        message.status === "delivered" &&
        message.sender == conversation.otherPerson._id
    ).length;
  };
  const countMsg = countUnseenMsg(conversation.messages);

  return (
    <Container
      className={classes.root}
      onClick={() => {
        history.push(`/user/chat-screen/${conversation._id}`);
      }}
    >
      <GridContainer>
        <GridItem>
          <ProfiePic url={conversation.otherPerson.profilePic} />
        </GridItem>
        <GridItem
          className={classes.firstContainer}
          xs={9}
          sm={10}
          md={10}
          lg={10}
        >
          <Typography
            variant="h5"
            style={{ color: "#696363" }}
            className={"msg-text"}
          >
            {conversation.otherPerson.name || "unknown user"}
          </Typography>

          <Typography
            variant="h5"
            style={{
              fontWeight: countMsg ? 750 : 400,
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {conversation.messages[conversation.messages.length - 1].body || ""}
          </Typography>
        </GridItem>
        <GridItem
          className={classes.secondContainer}
          style={{
            // justifyContent: "flex-end",
            alignSelf: "flex-end",
            justifySelf: "flex-end",
          }}
          md={1}
        >
          {/* <Typography variant="h5">{"1 minute ago"}</Typography> */}
          {countMsg ? (
            <Typography variant="h5" className={classes.msgCount}>
              {countMsg || ""}
            </Typography>
          ) : null}
        </GridItem>
      </GridContainer>
    </Container>
  );
};

export default Conversation;
