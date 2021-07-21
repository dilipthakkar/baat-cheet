import React from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";
import GridContainer from "../../Components/Grid/GridContainer";
import GridItem from "../../Components/Grid/GridItem";
import ImageUpload from "../../Components/ImageUpload/ImageUpload";
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
import { uploadFile } from "../../utils/UploadFile";
import { signUpUser } from "../../Features/auth/actions";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import {
  loadingSelector,
  isSignupSelector,
} from "../../Features/auth/selector";
import { setLoading } from "../../Features/auth/authSlice";
import { useHistory, Link } from "react-router-dom";
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

const SignUp = () => {
  const [profilePic, setProfilePic] = React.useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(loadingSelector);
  const isSignup = useSelector(isSignupSelector);
  const isLogin = useSelector(isSignupSelector);
  const initValue = {
    name: "",
    email: "",
    password: "",
    profilePic: "",
    phoneNo: "",
  };
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("name is required")
      .typeError("name can contain only characters")
      .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed"),
    email: yup.string().email("email is not valid").required("email is empty"),
    password: yup
      .string()
      .min(5, "min lenght 5")
      .required("password is required"),
    phoneNo: yup
      .string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Phone number is not valid"
      )
      .required("phone Number is required")
      .min(10, "should be 10 character long")
      .max(10, "should be 10 character long"),
  });

  const handleSignup = async (values) => {
    dispatch(setLoading(true));
    if (!profilePic) {
      dispatch(signUpUser(values));
    } else {
      const url = await uploadFile(profilePic, "userImage");
      const user = _.assign({ ...values, profilePic: url });
      await dispatch(signUpUser(user));
    }
  };

  React.useEffect(() => {
    if (isSignup || isLogin) {
      history.push("/auth/login");
    }
  }, [isSignup, history, isLogin]);

  return (
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
                      <FormLabel>Name</FormLabel>
                    </GridItem>
                    <GridItem xs={10} sm={9} align={"left"}>
                      <Field fullWidth name="name">
                        {({ field, form }) => (
                          <TextField variant="outlined" fullWidth {...field} />
                        )}
                      </Field>
                      <ErrorMessage
                        name={"name"}
                        component={"div"}
                        className={classes.errorText}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer className={classes.container}>
                    <GridItem xs={10} sm={2} align={"left"}>
                      <FormLabel>Email</FormLabel>
                    </GridItem>
                    <GridItem xs={10} sm={9} align={"left"}>
                      <Field fullWidth name="email">
                        {({ field, form }) => (
                          <TextField variant="outlined" fullWidth {...field} />
                        )}
                      </Field>
                      <ErrorMessage
                        name={"email"}
                        component={"div"}
                        className={classes.errorText}
                      />
                    </GridItem>
                  </GridContainer>
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
                          <TextField variant="outlined" fullWidth {...field} />
                        )}
                      </Field>
                      <ErrorMessage
                        name={"phoneNo"}
                        component={"div"}
                        className={classes.errorText}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer
                    className={classes.container + " " + classes.imageContainer}
                  >
                    <GridItem xs={10} sm={2} align={"left"}>
                      <FormLabel>Profile Image</FormLabel>
                    </GridItem>
                    <GridItem xs={10} sm={9}>
                      <ImageUpload
                        onChange={setProfilePic}
                        style={{ width: "200px" }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer className={classes.container}>
                    <GridItem xs={12} align="right">
                      <Button className={classes.saveButton} type={"submit"}>
                        Sign Up
                      </Button>
                    </GridItem>
                  </GridContainer>
                  <GridContainer className={classes.container}>
                    <GridItem xs={12} align="center">
                      <Typography variant={"h5"}>
                        <Link to="/auth/login" className={classes.link}>
                          Already have an Account?
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
  );
};

export default SignUp;
