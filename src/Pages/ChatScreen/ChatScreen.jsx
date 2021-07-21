import React from "react";
import {
  Container,
  makeStyles,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Grid,
  LinearProgress,
} from "@material-ui/core";
import GridContainer from "../../Components/Grid/GridContainer";
import GridItem from "../../Components/Grid/GridItem";
import ProfiePic from "../../Components/ProfilePic/ProilePic";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import {
  getConversationById,
  sendMessage,
  seenMsg,
} from "../../Features/conversations/actions";
import {
  nowConersationSelector,
  loadingSelector,
} from "../../Features/conversations/selector";
import {
  updateConversationSeen,
  emptyConversation,
} from "../../Features/conversations/conversationSlice";
import { userSelector } from "../../Features/auth/selector";
import Message from "../../Components/Message/Message";
import BackImage1 from "../../assets/img/chat-back.jpg";
import SendIcon from "@material-ui/icons/Send";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";
import _ from "lodash";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${BackImage1})`,
    padding: 0,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    padding: "5px 10px",
    backgroundColor: "#128c7e",
    "@media(max-width:600px)": {
      padding: "5px 7px",
    },
  },
  otherName: {
    marginLeft: "40px",
    fontSize: "2rem",
    "@media(max-width:600px)": {
      marginLeft: "15px",
    },
  },
  input: {
    backgroundColor: "white",
    borderRadius: "30px",
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        border: "2px solid #128c7e",
      },
    },
  },
  sendIcon: {
    color: "#128c7e",
  },
  footer: {
    width: "96%",
    margin: "0 auto 20px auto",
  },
  messageContainer: {
    overflowX: "hidden",
    overflowY: "scroll",
    flex: 1,
    "&::-webkit-scrollbar": {
      width: "0.5em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(171, 183, 183, 0.4)",
    },
    alignContent: "flex-start",
  },
  backArrow: {
    color: "white",
    marginRight: "5px",
  },
}));

const ChatScreen = ({ match }) => {
  const classes = useStyles();
  const conversation = useSelector(nowConersationSelector);
  const user = useSelector(userSelector);
  const dispatch = useDispatch();
  const [msgBody, setMsgBody] = React.useState("");
  const isLoading = useSelector(loadingSelector);
  const [isSeen, setIsSeen] = React.useState(false);
  const msgContainerRef = React.useRef(null);
  const history = useHistory();
  React.useEffect(() => {
    dispatch(getConversationById(match.params.conversationId));
    return () => {
      dispatch(emptyConversation());
    };
  }, []);

  React.useEffect(() => {
    if (msgContainerRef.current) {
      scrollToBottom();
    }

    if (conversation?.otherPerson && !isSeen) {
      setIsSeen(true);
      dispatch(seenMsg({ phoneNo: conversation?.otherPerson?.phoneNo }));
    }
    if (conversation?.otherPerson) {
      dispatch(
        updateConversationSeen({
          id: conversation.otherPerson._id,
          userId: user._id,
        })
      );
    }
  });

  const scrollToBottom = () => {
    msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
  };

  const onInputChange = (e) => {
    setMsgBody(e.target.value);
  };
  const onHandleSend = async () => {
    const msgContent = msgBody;
    setMsgBody("");
    if (msgContent) {
      await dispatch(
        sendMessage({
          rcvNumber: conversation.otherPerson.phoneNo,
          msgBody: msgContent,
          genId: nanoid(),
        })
      );
    }

    scrollToBottom();
  };

  return (
    <Container className={classes.root}>
      {isLoading || _.isEmpty(conversation) ? (
        <LinearProgress />
      ) : (
        <>
          <GridContainer alignItems="center" className={classes.header}>
            <ArrowBackIcon
              className={classes.backArrow}
              onClick={() => {
                history.goBack();
              }}
            />
            <GridItem>
              <ProfiePic url={conversation?.otherPerson?.profilePic} />
            </GridItem>
            <GridItem>
              <Typography
                className={classes.otherName}
                variant="h5"
                color="secondary"
              >
                {conversation?.otherPerson?.name || "unknown user"}
              </Typography>
            </GridItem>
          </GridContainer>

          <Grid
            container
            className={classes.messageContainer}
            ref={msgContainerRef}
          >
            {conversation &&
              conversation.messages?.map((msg) => (
                <GridItem
                  key={msg._id + (msg.timestamp?.toString() || "")}
                  xs={12}
                  md={12}
                >
                  <Message msg={msg} userId={user?._id} />
                </GridItem>
              ))}
          </Grid>
          <GridContainer className={classes.footer}>
            <GridItem xs>
              <TextField
                placeholder="Write A Message"
                id="standard-start-adornment"
                variant="outlined"
                fullWidth
                onChange={onInputChange}
                value={msgBody}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    onHandleSend();
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button onClick={onHandleSend}>
                        <SendIcon className={classes.sendIcon}></SendIcon>
                      </Button>
                    </InputAdornment>
                  ),
                  className: classes.input,
                  onChange: onInputChange,
                  autoComplete: "off",
                }}
              />
            </GridItem>
          </GridContainer>
        </>
      )}
    </Container>
  );
};

export default ChatScreen;
