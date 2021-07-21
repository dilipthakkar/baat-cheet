const styles = (theme) => ({
  cardContainer: {
    boxShadow: "0 0 10px 0.1px grey",
    padding: "30px",
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      padding: "50px 4px 4px 4px",
      marginTop: "30px",
    },
  },
  errorText: {
    color: "red",
  },
  headerText: {
    position: "absolute",
    top: "-20px",
    color: "white",
    fontWeight: 500,
    padding: "5px",
    backgroundColor: "green",
    borderRadius: "7px",
  },
  saveButton: {
    backgroundColor: "Green",
    color: "white",
    marginRight: "10px",
    "&:hover": {
      color: "black",
    },
  },
});
export default styles;
