import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../router";
import { userSelector } from "../Features/auth/selector";
import { useHistory } from "react-router-dom";
import socketio from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import {
  addMsg,
  myMsgSeen,
  updateConversation,
} from "../Features/conversations/conversationSlice";
import { getAllConversation, seenMsg } from "../Features/conversations/actions";
import { motion } from "framer-motion";
import AlertMessage from "../Components/AlertMesage/AlertMessage";
import { messageSelector, errorSelector } from "../Features/Common/selector";

const animationVariant = {
  hidden: {
    x: "+100vw",
    transition: { ease: "easeInOut" },
  },
  visible: {
    x: 0,
    transition: { duration: 0.7, type: "spring", stiffness: 80 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const User = () => {
  const user = useSelector(userSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const otherUserNumber = useSelector(
    (state) => state.conversation?.conversation?.otherPerson?.phoneNo
  );
  const message = useSelector(messageSelector);
  const error = useSelector(errorSelector);
  React.useEffect(() => {
    if (!user) {
      history.push("/auth");
    } else {
      const socket = socketio.connect("", { query: { user: user.phoneNo } });
      socket.on("new-message-rcv", (data) => {
        dispatch(addMsg({ ...data.message, userId: user._id }));
        if (otherUserNumber) {
          dispatch(seenMsg({ phoneNo: otherUserNumber }));
        }
        dispatch(updateConversation({ msg: data.message }));
      });
      socket.on("your-msg-seen", (data) => {
        dispatch(myMsgSeen({ id: user._id }));
      });
      socket.on("new-conversation-rcv", (data) => {
        dispatch(getAllConversation());
      });

      return () => {
        socket.close();
      };
    }
  }, [user, history, dispatch, otherUserNumber]);

  const getRoutes = () => {
    const _routes = routes.map(
      (route) =>
        route.layout === "user" && (
          <Route
            path={`/${route.layout}/${route.path}`}
            component={route.component}
            key={`/${route.layout}/${route.path}`}
          />
        )
    );
    return _routes;
  };

  return (
    <motion.div
      variants={animationVariant}
      initial={"hidden"}
      animate={"visible"}
      exit="exit"
    >
      <AlertMessage isOpen={message ? true : false} text={message} />
      <AlertMessage isOpen={error ? true : false} text={error} type="error" />
      <Switch>
        {getRoutes()}
        <Redirect
          from="/user"
          to="/user/home
          "
        />
      </Switch>
    </motion.div>
  );
};

export default User;
