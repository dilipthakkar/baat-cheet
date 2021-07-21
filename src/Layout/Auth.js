import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import routes from "../router";
import { messageSelector, errorSelector } from "../Features/Common/selector";
import { useSelector } from "react-redux";
import AlertMessage from "../Components/AlertMesage/AlertMessage";
import { userSelector } from "../Features/auth/selector";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
const animationVariant = {
  hidden: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
  visible: {
    x: 0,
    transition: { duration: 1, type: "spring", stiffness: 120 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const Auth = () => {
  const message = useSelector(messageSelector);
  const error = useSelector(errorSelector);
  const history = useHistory();
  const user = useSelector(userSelector);
  React.useEffect(() => {
    if (user) {
      history.push("/user/home");
    }
  }, [user, history]);

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
        {routes.map(
          (route) =>
            route.layout === "auth" && (
              <Route
                path={`/${route.layout}/${route.path}`}
                component={route.component}
                key={`/${route.layout}/${route.path}`}
              />
            )
        )}

        <Redirect from="/auth" to="/auth/signup" />
      </Switch>
    </motion.div>
  );
};

export default Auth;
