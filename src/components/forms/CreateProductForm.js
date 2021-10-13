import {
  Container,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { Grid, TextField, Button, Select } from "@material-ui/core";
import React, { Component } from "react";
import PropTypes from "prop-types";
import noImage from "../../images/noImage.jpg";
import Checkbox from "@material-ui/core/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import axios from "axios";

export default class CreateProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        imageName: "",
        name: "",
        description: "",
        price: "",
        type: "",
        color: [],
        user: {
          userId: 1,
          userName: "testuser",
          address: "home bangkok 10150",
          tel: 1234567891,
          fullName: "testfullname",
        },
      },
      types: [],
      color: [],
      imageFile: null,
      imagePreview: noImage,
      errors: {},
    };
  }

  onChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  chooseColor = (e) => {
    let colorList = [...this.state.data.color, e.target.value];
    if (this.state.data.color.findIndex((f) => f === e.target.value) !== -1) {
      colorList = colorList.filter((f) => f !== e.target.value);
    }
    this.setState({
      data: { ...this.state.data, color: colorList },
    });
  };

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/types`).then((res) => {
      const types = res.data;
      this.setState({ types: types });
    });

    axios.get(`${process.env.REACT_APP_API_URL}/colors`).then((res) => {
      const color = res.data;
      this.setState({ color: color });
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.setState({ data: this.props.data });
      this.setState({
        imagePreview: `${process.env.REACT_APP_API_URL}/getImage/${this.props.data.imageName}`,
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    let data = Object.assign({}, this.state.data);

    const invalid = this.validate(this.state.data);
    if (invalid !== "err") {
      var today = new Date().toISOString();
      var intColor = this.state.data.color.map((a) => parseInt(a));
      var colorObj = intColor.map((cl) =>
        this.state.color.find((c) => c.colorId === cl)
      );
      var intType = parseInt(this.state.data.type);
      var typeObj = this.state.types.find((t) => t.typeId === intType);

      data.color = colorObj;
      data.type = typeObj;
      data.saleDate = today;
      var bodyFormData = new FormData();
      var blob = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      bodyFormData.append("imageFile", this.state.imageFile);
      bodyFormData.append("product", blob);

      this.props.submit(bodyFormData);
    }
  };

  validate = (e) => {
    const errors = {};
    if (!e.imageName) {
      errors.imageName = true;
    }
    if (!e.name || e.name.length < 2) {
      errors.name = true;
    }
    if (!e.description || e.description.length < 10) {
      errors.description = true;
    }
    if (!e.price) {
      errors.price = true;
    }
    if (!e.type) {
      errors.type = true;
    }
    if (!e.quantity || e.quantity < 1) {
      errors.quantity = true;
    }

    if (!e.color || e.color.length < 1) {
      errors.color = true;
    }

    this.setState({ errors });
    if (Object.keys(errors).length > 0) {
      return "err";
    }
  };

  onImageChange = (e) => {
    const imgFile = e.target.files[0];
    const imgPreview = URL.createObjectURL(e.target.files[0]);
    const imgName = e.target.files[0].name;

    this.setState({
      data: { ...this.state.data, imageName: imgName },
      imageFile: imgFile,
      imagePreview: imgPreview,
    });
  };

  render() {
    return (
      <div>
        <Container
          maxWidth="md"
          style={{
            marginTop: 2 + "rem",
            backgroundColor: "white",
            borderRadius: 10 + "px",
            boxShadow: "0px 0px 30px rgb(0 0 0 / 8%)",
          }}
        >
          <h2
            style={{
              marginBottom: 10 + "px",
              paddingTop: 25 + "px",
              marginLeft: 20 + "px",
            }}
          >
            {" "}
            ข้อมูลสินค้า
          </h2>
          <form>
            <Grid
              container
              style={{ padding: 25 + "px" }}
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <img
                src={this.state.imagePreview}
                alt="imagePreview"
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: 100 + "%",
                  maxHeight: 350 + "px",
                  borderRadius: 5 + "px",
                }}
              />

              <Grid item xs={12}>
                <Button variant="contained" component="label">
                  Upload File
                  <input
                    type="file"
                    id="imageFile"
                    name="imageFile"
                    onChange={this.onImageChange}
                    accept="image/*"
                    hidden
                  />
                </Button>
                {this.state.errors.imageName && (
                  <div style={{ color: "red" }}>Please insert Image!</div>
                )}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  error={this.state.errors.name}
                  type="text"
                  inputProps={{ minLength: 3, maxLength: 40 }}
                  id="name"
                  name="name"
                  label="Product Name"
                  value={this.state.data.name}
                  onChange={this.onChange}
                  helperText="3 - 40 Character "
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  error={this.state.errors.description}
                  type="textarea"
                  inputProps={{ minLength: 5, maxLength: 200 }}
                  id="description"
                  name="description"
                  label="Description"
                  value={this.state.data.description}
                  onChange={this.onChange}
                  helperText="describe your Product"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  error={this.state.errors.price}
                  type="number"
                  inputProps={{ minLength: 1, maxLength: 10 }}
                  id="price"
                  name="price"
                  label="Price"
                  value={this.state.data.price}
                  onChange={this.onChange}
                  helperText="enter Product Price"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  error={this.state.errors.quantity}
                  type="number"
                  inputProps={{ minLength: 1, maxLength: 10 }}
                  id="quantity"
                  name="quantity"
                  label="Quantity"
                  value={this.state.data.quantity}
                  onChange={this.onChange}
                  helperText="enter Product Quantity"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl style={{ minWidth: 100 }}>
                  <InputLabel htmlFor="type">type</InputLabel>
                  <Select
                    required
                    error={this.state.errors.type}
                    name="type"
                    value={this.state.data.type}
                    onChange={this.onChange}
                    defaultValue="0"
                  >
                    {this.state.types.map((typeRow) => {
                      return (
                        <MenuItem value={typeRow.typeId} key={typeRow.typeId}>
                          {typeRow.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <div className="type">
                  <div>colors</div>
                  <FormGroup row className="checkBoxContent">
                    {this.state.color.map((color) => {
                      return (
                        <FormControlLabel
                          key={color.colorId}
                          control={
                            <Checkbox
                              color="primary"
                              icon={<CircleUnchecked />}
                              checkedIcon={<CircleCheckedFilled />}
                              onChange={this.chooseColor}
                              checked={
                                this.state.data.color.indexOf(
                                  `${color.colorId}`
                                ) !== -1
                              }
                              value={`${color.colorId}`}
                            />
                          }
                          label={color.colorName}
                        ></FormControlLabel>
                      );
                    })}
                  </FormGroup>
                  {this.state.errors.color && (
                    <div style={{ color: "red" }}>Please select color!</div>
                  )}
                </div>
              </Grid>

              <Grid item xs={12} align="center">
                <Button
                  fullWidth
                  style={{
                    marginTop: 15 + "px",
                    alignItems: "center",
                    backgroundColor: "#1895f5",
                    color: "white",
                  }}
                  onClick={this.onSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </div>
    );
  }
}

CreateProductForm.propTypes = {
  submit: PropTypes.func.isRequired,
  data: PropTypes.shape({
    productId: PropTypes.number,
    imageName: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    color: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
  }),
};

CreateProductForm.defaultProps = {
  imageName: "",
  name: "",
  description: "",
  price: "",
  type: "",
  color: [],
  user: {
    userId: 1,
    userName: "testuser",
    address: "home bangkok 10150",
    tel: 1234567891,
    fullName: "testfullname",
  },
};
