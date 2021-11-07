import {
  Container,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { Grid, TextField, Button, Select } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import noImage from "../../images/noImage.jpg";
import Checkbox from "@material-ui/core/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import axios from "axios";

const CreateProductForm = (props) => {
  const [data, setData] = useState({
    imageName: "",
    name: "",
    description: "",
    price: "",
    type: "",
    color: [],
    quantity: 0,
    user: {},
  });
  const [types, setTypes] = useState([]);
  const [color, setColor] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(noImage);
  const [errors, setErrors] = useState({});

  const onChange = (e) =>
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });

  const chooseColor = (e) => {
    let colorList = [...data.color, e.target.value];
    if (data.color.findIndex((f) => f === e.target.value) !== -1) {
      colorList = colorList.filter((f) => f !== e.target.value);
    }
    setData({ ...data, color: colorList });
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/types`).then((res) => {
      setTypes(res.data);
    });

    axios.get(`${process.env.REACT_APP_API_URL}/colors`).then((res) => {
      setColor(res.data);
    });
  }, []);

  useEffect(() => {
    setData((d) => {
      return { ...d, user: props.user };
    });
  }, [props.user]);

  useEffect(() => {
    if (props.clearForm === true) {
      setData({
        imageName: "",
        name: "",
        description: "",
        price: "",
        type: "",
        quantity: 0,
        color: [],
        user: props.user,
      });
      setImageFile(null);
      setImagePreview(noImage);
      props.alreadyClear();
    }
  }, [props]);

  useEffect(() => {
    if (props.productToEdit) {
      setData(props.productToEdit);
      setImagePreview(
        `${process.env.REACT_APP_API_URL}/getImage/${props.productToEdit.imageName}`
      );
    }
  }, [props.productToEdit]);

  const onSubmit = (e) => {
    e.preventDefault();
    let productData = Object.assign({}, data);

    const invalid = validate(productData);
    if (invalid !== "err") {
      var today = new Date().toISOString();
      var intColor = productData.color.map((a) => parseInt(a));

      var colorObj = intColor.map((cl) => color.find((c) => c.colorId === cl));

      var intType = parseInt(productData.type);
      var typeObj = types.find((t) => t.typeId === intType);

      productData.color = colorObj;
      productData.type = typeObj;
      productData.saleDate = today;
      var bodyFormData = new FormData();
      var blob = new Blob([JSON.stringify(productData)], {
        type: "application/json",
      });
      bodyFormData.append("imageFile", imageFile);
      bodyFormData.append("product", blob);
      props.submit(bodyFormData);
    }
  };

  const validate = (e) => {
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

    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return "err";
    }
  };

  const onImageChange = (e) => {
    const imgFile = e.target.files[0];
    const imgPreview = URL.createObjectURL(e.target.files[0]);
    const imgName = e.target.files[0].name;
    if (
      imgName.slice(imgName.length - 3) === "jpg" ||
      imgName.slice(imgName.length - 3) === "png" ||
      imgName.slice(imgName.length - 4) === "jpeg"
    ) {
      setData({ ...data, imageName: imgName });
      setImageFile(imgFile);
      setImagePreview(imgPreview);

      setErrors({ ...errors, imageFormat: false });
    } else {
      setErrors({ ...errors, imageFormat: true });
      setImageFile(null);
      setImagePreview(noImage);
    }
  };

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

        <Grid
          container
          style={{ padding: 25 + "px" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <img
            src={imagePreview}
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
                onChange={onImageChange}
                accept="image/*"
                hidden
              />
            </Button>
            {errors.imageName && (
              <div style={{ color: "red" }} className="b">กรุณาใส่ภาพของสินค้า!</div>
            )}
            {errors.imageFormat && (
              <div style={{ color: "red" }} className="b">
                กรุณาใส่ไฟล์ประเภท .jpg .jpeg .png 
              </div>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              error={errors.name}
              type="text"
              inputProps={{ minLength: 3, maxLength: 40 }}
              id="name"
              name="name"
              label="product name"
              value={data.name}
              onChange={onChange}
              helperText="ชื่อสินค้าตั้งแต่ 3 - 40 ตัวอักษร"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              multiline
              error={errors.description}
              type="textarea"
              inputProps={{ minLength: 5, maxLength: 200 }}
              id="description"
              name="description"
              label="description"
              value={data.description}
              onChange={onChange}
              helperText="รายละเอียดของสินค้า ตั้งแต่ 5 - 200 ตัวอักษร"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              error={errors.price}
              type="number"
              inputProps={{ minLength: 1, maxLength: 10 }}
              id="price"
              name="price"
              label="price"
              value={data.price}
              onChange={onChange}
              helperText="ราคาของสินค้า"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              error={errors.quantity}
              type="number"
              inputProps={{ minLength: 1, maxLength: 10 }}
              id="quantity"
              name="quantity"
              label="quantity"
              value={data.quantity}
              onChange={onChange}
              helperText="จำนวนของสินค้าที่มี"
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl style={{ minWidth: 100 }}>
              <InputLabel htmlFor="type">type</InputLabel>
              <Select
                required
                error={errors.type}
                name="type"
                value={data.type}
                onChange={onChange}
                defaultValue="0"
              >
                {types.map((typeRow) => {
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
                {color.map((cl) => {
                  return (
                    <FormControlLabel
                      key={cl.colorId}
                      control={
                        <Checkbox
                          color="primary"
                          icon={<CircleUnchecked />}
                          checkedIcon={<CircleCheckedFilled />}
                          onChange={chooseColor}
                          checked={data.color.indexOf(`${cl.colorId}`) !== -1}
                          value={`${cl.colorId}`}
                        />
                      }
                      label={cl.colorName}
                    ></FormControlLabel>
                  );
                })}
              </FormGroup>
              {errors.color && (
                <div style={{ color: "red" }} className="b">กรุณาเลือกสีของสินค้า!</div>
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
              onClick={onSubmit}
            >
              ลงขาย
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

CreateProductForm.propTypes = {
  submit: PropTypes.func.isRequired,
  data: PropTypes.shape({
    productId: PropTypes.number,
    imageName: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.string,
    type: PropTypes.string,
    tel: PropTypes.string,
    color: PropTypes.array,
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
  quantity: 0,
  user: {
    userId: 0,
    userName: "",
    address: "",
    tel: "",
    fullName: "",
  },
};

export default CreateProductForm;
