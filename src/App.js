import "./App.css";
import React from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Auth from "./Layout/Auth";
import User from "./Layout/User";
import { AnimatePresence } from "framer-motion";
import { createTheme, ThemeProvider } from "@material-ui/core";
const theme = createTheme({
  typography: {
    fontFamily: ["Josefin Sans", "sans-serif"].join(","),
    h5: {
      "@media(max-width:600px)": {
        fontSize: "20px",
      },
    },
  },
  palette: {
    secondary: {
      dark: "#1b1b",
      main: "#FFF",
    },
  },
});

function App() {
  const location = useLocation();
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <AnimatePresence>
          <Switch location={location} key={location.key}>
            <Route path="/auth" component={Auth} />
            <Route path="/user" component={User} />

            <Redirect from="/" to="/user/home" />
          </Switch>
        </AnimatePresence>
      </ThemeProvider>
    </div>
  );
}

export default App;
