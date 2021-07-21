import { Container, CircularProgress } from "@material-ui/core";
import React from "react";
import CustomAppBar from "../../Components/AppBar/AppBar";
import {
  allConversationSelector,
  loadingSelector,
} from "../../Features/conversations/selector";
import { getAllConversation } from "../../Features/conversations/actions";
import { useSelector, useDispatch } from "react-redux";
import Conversation from "../../Components/Conversation/Conversation";
import _ from "lodash";

const Home = () => {
  const dispatch = useDispatch();
  const allConversations = useSelector(allConversationSelector);
  const isLoading = useSelector(loadingSelector);

  React.useEffect(() => {
    if (_.isEmpty(allConversations) || _.isUndefined(allConversationSelector)) {
      dispatch(getAllConversation());
    }
  }, []);

  return (
    <Container
      id="drawer-container"
      style={{ position: "relative", padding: 0, minHeight: "100vh" }}
    >
      <CustomAppBar />
      {isLoading ? (
        <CircularProgress
          style={{
            position: "absolute",
            top: `50%`,
            left: `50%`,
            transform: `translate(-50%, -50%)`,
          }}
        />
      ) : (
        allConversations &&
        allConversations.map((conversation) => (
          <Conversation conversation={conversation} key={conversation._id} />
        ))
      )}
    </Container>
  );
};

export default Home;
