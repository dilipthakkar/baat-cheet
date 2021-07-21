import SignUp from "./Pages/SignUp/SignUp";
import LogIn from "./Pages/LogIn/LogIn";
import Home from "./Pages/Home/Home";
import ChatScreen from "./Pages/ChatScreen/ChatScreen";
import NewConversation from "./Pages/newConversation/NewConversation";
const routes = [
  {
    path: "signup",
    layout: "auth",
    component: SignUp,
  },
  {
    path: "login",
    layout: "auth",
    component: LogIn,
  },
  {
    path: "home",
    layout: "user",
    component: Home,
  },
  {
    path: "chat-screen/:conversationId",
    layout: "user",
    component: ChatScreen,
  },
  {
    path: "new-conversation",
    layout: "user",
    component: NewConversation,
  },
];

export default routes;
