import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import PlaceHolderImage from "../../assets/img/image_placeholder.jpg";
import GridContainer from "../Grid/GridContainer";
import GridItem from "../Grid/GridItem";

// styles
const useStyles = makeStyles((theme) => ({
  root: {
    width: "250px",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  input: {
    display: "none",
  },
  buttonContainer: {
    marginTop: "10px",
  },
  button: {
    width: "100%",
    backgroundColor: "green",
    color: "white",
    fontSize: "20px",
    "&:hover": {
      color: "black",
    },
  },
}));

const ImageUpload = (props) => {
  const { onChange, buttonColor, defaultImage, ...rest } = props;
  const [image, setImage] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState("");
  const fileinput = React.useRef(null);
  const classes = useStyles();

  // select file
  const onHandleChange = (e) => {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
      setImageUrl(event.target.result);
    };
    if (file) {
      // load data url of image
      reader.readAsDataURL(file);
      setImage(e.target.files[0]);
      if (onChange) {
        onChange(e.target.files[0]);
      }
    }
  };

  const onInputChange = () => {
    fileinput.current.click();
  };

  const onRemove = () => {
    setImage(null);
    if (onChange) {
      onChange(null);
    }
    setImageUrl("");
  };

  return (
    <div className={classes.root} {...rest}>
      <img
        src={imageUrl || defaultImage || PlaceHolderImage}
        alt=""
        className={classes.image}
      />
      <input
        type="file"
        multiple={false}
        onChange={onHandleChange}
        ref={fileinput}
        className={classes.input}
      />
      <GridContainer className={classes.buttonContainer} spacing={2}>
        {image ? (
          <>
            <GridItem xs={6}>
              <Button
                onClick={onInputChange}
                className={classes.button}
                variant="outlined"
                style={{ backgroundColor: buttonColor }}
              >
                Change
              </Button>
            </GridItem>
            <GridItem xs={6}>
              <Button
                onClick={onRemove}
                className={classes.button}
                variant="outlined"
                style={{ backgroundColor: buttonColor }}
              >
                Remove
              </Button>
            </GridItem>
          </>
        ) : (
          <GridItem xs={12}>
            <Button
              onClick={onInputChange}
              className={classes.button}
              variant="outlined"
              style={{ backgroundColor: buttonColor }}
            >
              Add
            </Button>
          </GridItem>
        )}
      </GridContainer>
    </div>
  );
};

export default ImageUpload;
