import {
  Container,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
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
  state = {
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
        password: "Testpassword1",
        address: "home bangkok 10150",
        tel: 1234567891,
        fullName: "testfullname",
        role: "ROLE_USER",
      },
    },
    types: [],
    color: [],
    imageFile: null,
    imagePreview: noImage,
    errors: {},
  };
  onChange = (e) =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  chooseColor = (e) => {
    let colorList = [...this.state.data.color, e.target.value];
    if (
      this.state.data.color.findIndex((f) => f.id === e.target.value) !== -1
    ) {
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

  onSubmit = () => {
    let data = Object.assign({}, this.state.data);
    console.log(data);
    const invalid = this.validate(this.state.data);
    console.log(this.state.errors);
    if (invalid !== "err") {
      var today = new Date().toISOString();
      console.log(today)
      var intColor = this.state.data.color.map((a) => parseInt(a));
      var colorObj = intColor.map((cl) =>
        this.state.color.find((c) => c.colorId === cl)
      );

      var typeObj = this.state.types.find(
        (t) => t.typeId === this.state.data.type
      );

      data.color = colorObj;
      data.type = typeObj;
      data.saleDate = today;
      console.log(data);

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
          <Typography
            variant="h4"
            style={{
              marginBottom: 10 + "px",
              paddingTop: 25 + "px",
              marginLeft: 20 + "px",
            }}
          >
            {" "}
            Product Info
          </Typography>
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
                    hidden
                  />
                </Button>
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
                  onChange={this.onChange}
                  helperText="enter Product Price"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  error={this.state.errors.price}
                  type="number"
                  inputProps={{ minLength: 1, maxLength: 10 }}
                  id="quantity"
                  name="quantity"
                  label="Quantity"
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
                              value={color.colorId}
                            />
                          }
                          label={color.colorName}
                        ></FormControlLabel>
                      );
                    })}
                  </FormGroup>
                </div>
              </Grid>

              <Grid item xs={12} align="center">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 30 + "px" }}
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
};
