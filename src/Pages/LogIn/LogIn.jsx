import React from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";
import GridContainer from "../../Components/Grid/GridContainer";
import GridItem from "../../Components/Grid/GridItem";
import {
  TextField,
  FormLabel,
  makeStyles,
  Container,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import styles from "../../assets/jss/containers";
import * as yup from "yup";
import { loginUser } from "../../Features/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import { loadingSelector, isLoginSelector } from "../../Features/auth/selector";
import { useHistory, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { setLoading } from "../../Features/auth/authSlice";
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "auto",
    marginBottom: "auto",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: "10px",
  },
  imageContainer: {
    alignItems: "flex-start",
  },
  link: {
    textDecoration: "none",
  },

  ...styles(theme),
}));

const LogIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(loadingSelector);
  const isLogin = useSelector(isLoginSelector);
  const initValue = {
    password: "",
    phoneNo: "",
  };
  const validationSchema = yup.object().shape({
    password: yup.string().required("password is required"),
    phoneNo: yup
      .string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .required("phone Number is required"),
  });

  const handleSignup = async (values) => {
    dispatch(setLoading(true));
    dispatch(loginUser(values));
  };

  React.useEffect(() => {
    if (isLogin) {
      history.push("/user");
    }
  }, [isLogin, history]);

  return (
    <motion.div
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      exit={{ scaleY: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container className={classes.root}>
        <GridContainer justifyContent="center" alignItems="center">
          <GridItem xs={12} sm={9} md={6} className={classes.cardContainer}>
            <Typography variant="h4" className={classes.headerText}>
              Sign Up
            </Typography>
            {isLoading ? (
              <div>
                <CircularProgress />
              </div>
            ) : (
              <Formik
                initialValues={initValue}
                validationSchema={validationSchema}
                enableReinitlization
                onSubmit={(values, action) => {
                  handleSignup(values);
                }}
              >
                {({ values, errors, setFieldValue }) => (
                  <Form>
                    <GridContainer className={classes.container}>
                      <GridItem xs={10} sm={2} align={"left"}>
                        <FormLabel>Password</FormLabel>
                      </GridItem>
                      <GridItem xs={10} sm={9} align={"left"}>
                        <Field fullWidth name="password">
                          {({ field, form }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              {...field}
                              type="password"
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name={"password"}
                          component={"div"}
                          className={classes.errorText}
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer className={classes.container}>
                      <GridItem xs={10} sm={2} align={"left"}>
                        <FormLabel>Phone Number</FormLabel>
                      </GridItem>
                      <GridItem xs={10} sm={9} align={"left"}>
                        <Field fullWidth name="phoneNo">
                          {({ field, form }) => (
                            <TextField
                              variant="outlined"
                              fullWidth
                              {...field}
                            />
                          )}
                        </Field>
                        <ErrorMessage
                          name={"phoneNo"}
                          component={"div"}
                          className={classes.errorText}
                        />
                      </GridItem>
                    </GridContainer>

                    <GridContainer className={classes.container}>
                      <GridItem xs={12} align="right">
                        <Button className={classes.saveButton} type={"submit"}>
                          LogIn
                        </Button>
                      </GridItem>
                    </GridContainer>

                    <GridContainer className={classes.container}>
                      <GridItem xs={12} align="center">
                        <Typography variant={"h5"}>
                          <Link to="/auth/signup" className={classes.link}>
                            Create New Account?
                          </Link>
                        </Typography>
                      </GridItem>
                    </GridContainer>
                  </Form>
                )}
              </Formik>
            )}
          </GridItem>
        </GridContainer>
      </Container>
    </motion.div>
  );
};

export default LogIn;
