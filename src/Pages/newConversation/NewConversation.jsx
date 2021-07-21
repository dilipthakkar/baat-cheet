import React from "react";
import {
  Container,
  makeStyles,
  Typography,
  CircularProgress,
  Button,
  FormLabel,
  TextField,
} from "@material-ui/core";
import GridItem from "../../Components/Grid/GridItem";
import GridContainer from "../../Components/Grid/GridContainer";
import styles from "../../assets/jss/containers";
import { Formik, Field, Form } from "formik";
import SendIcon from "@material-ui/icons/Send";
import {
  sendMessageNew,
  getAllConversation,
} from "../../Features/conversations/actions";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useHistory } from "react-router-dom";

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

  ...styles(theme),
}));
const NewConversation = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const initValue = {
    msg: "",
    phoneNo: "",
  };

  return (
    <Container className={classes.root}>
      <GridContainer justifyContent="center" alignItems="center">
        <GridItem xs={12} sm={9} md={6} className={classes.cardContainer}>
          <Typography variant="h4" className={classes.headerText}>
            New Conversation
          </Typography>
          {false ? (
            <div>
              <CircularProgress />
            </div>
          ) : (
            <Formik
              initialValues={initValue}
              enableReinitlization
              onSubmit={(values, action) => {
                dispatch(
                  sendMessageNew({
                    rcvNumber: values.phoneNo,
                    genId: nanoid(),
                    msgBody: values.msg,
                  })
                ).then((data) => {
                  if (!data.error) {
                    dispatch(getAllConversation());
                    history.push("/user/home");
                  }
                });
              }}
            >
              {({ values, errors, setFieldValue }) => (
                <Form>
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
                    </GridItem>
                  </GridContainer>

                  <GridContainer className={classes.container}>
                    <GridItem xs={10} sm={2} align={"left"}>
                      <FormLabel>Message</FormLabel>
                    </GridItem>
                    <GridItem xs={10} sm={9} align={"left"}>
                      <Field fullWidth name="msg">
                        {({ field, form }) => (
                          <TextField
                            variant="outlined"
                            fullWidth
                            {...field}
                            type="text"
                          />
                        )}
                      </Field>
                    </GridItem>
                  </GridContainer>

                  <GridContainer className={classes.container}>
                    <GridItem xs={12} align="right">
                      {values.msg && values.phoneNo && (
                        <Button className={classes.saveButton} type={"submit"}>
                          <SendIcon />
                        </Button>
                      )}
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

export default NewConversation;
