import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import React, { Component } from "react";
import PropTypes from "prop-types";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import noImage from "../../images/noImage.jpg";
import ResponseDialog from "../ui/ResponseDialog";
export default class ProductContent extends Component {
  state = {
    product: {},
    user: {
      userId: 1,
      userName: "testuser",
      password: "Testpassword1",
      address: "home bangkok 10150",
      tel: 1234567891,
      fullName: "testfullname",
      role: "ROLE_USER",
    },
    imageProduct: noImage,
    quantityAdd: 1,
    isShowInfo: false,
    isShowComments: false,
    selectedColor: 0,
    noColor: false,
  };

  componentDidMount() {
    let id = window.location.pathname.slice(9, window.location.pathname.length);
    axios
      .get(`${process.env.REACT_APP_API_URL}/products/${id}`)
      .then((res) => {
        const prods = res.data;
        this.setState({ product: prods });
        this.setState({
          imageProduct: `${process.env.REACT_APP_API_URL}/getImage/${prods.imageName}`,
        });
      })
      .catch(() => {
        this.props.notFound();
      });
  }

  chooseColor = (e) => {
    this.setState({ selectedColor: e.target.value });
  };

  minusQuantity = () => {
    console.log(this.state.product.color);
    if (this.state.quantityAdd > 1) {
      let quantity = this.state.quantityAdd - 1;
      this.setState({ quantityAdd: quantity });
    }
  };

  plusQuantity = () => {
    if (this.state.quantityAdd < this.state.product.quantity) {
      let quantity = this.state.quantityAdd + 1;
      this.setState({ quantityAdd: quantity });
    }
  };

  clickedInfo = () => {
    let infoClick = !this.state.isShowInfo;
    this.setState({ isShowInfo: infoClick });
  };

  clickedComments = () => {
    let commentClick = !this.state.isShowComments;
    this.setState({ isShowComments: commentClick });
  };

  addToCart = () => {
    if (this.state.selectedColor === 0) {
      this.setState({ noColor: true });
      return;
    } else {
      this.setState({ noColor: false });
      var productToCart = Object.assign({}, this.state.product);
      var intColor = parseInt(this.state.selectedColor);
      var colorObj = this.state.product.color.find(
        (c) => c.colorId === intColor
      );

      var orderDetails = {
        quantity: this.state.quantityAdd,
        totalPrice: productToCart.price * this.state.quantityAdd,
        color: colorObj,
        product: productToCart,
      };

      this.props.addItem(orderDetails);
      this.setState({ quantityAdd: 1 });
    }
  };

  deleteThisProduct = () => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/products/${this.state.product.productId}`
      )
      .then((res) => {
        this.props.goShop();
      })
      .catch((err) => {
        this.setState({
          dialogHeader: "Error",
          dialogContent: err.response.data.message,
          showDialog: true,
        });
      });
  };

  editThisProduct = () => {
    alert("doesn't handle edit function");
  };

  handleCloseBox = () => {
    this.setState({ dialogContent: "", showDialog: false });
  };

  render() {
    const color = this.state.product.color;

    return (
      <Container
        maxWidth="lg"
        style={{
          padding: 40 + "px",
          marginTop: 2 + "rem",
          backgroundColor: "white",
          borderRadius: 10 + "px",
          boxShadow: "0px 0px 20px rgb(0 0 0 / 8%)",
        }}
      >
        <ResponseDialog
          showDialog={this.state.showDialog}
          handleCloseBox={this.handleCloseBox}
          dialogContent={this.dialogContent}
          dialogHeader={this.dialogHeader}
        />

        <Grid container alignItems="center" justifyContent="center" spacing={0}>
          <Grid item xs={12} sm={8} md={6} style={{ textAlign: "center" }}>
            {this.state.product && (
              <img
                src={`${this.state.imageProduct}`}
                alt="imgProduct"
                style={{
                  marginTop: "10px",
                  height: "auto",
                  width: "85%",
                  maxHeight: "375px",
                  maxWidth: "390px",
                }}
              />
            )}
          </Grid>

          <Grid item xs={12} sm={7} md={6}>
            <h3 style={{ fontSize: 23 + "px" }}>{this.state.product.name}</h3>
            <h5 style={{ marginTop: -5 + "px" }}>
              sale date : {this.state.product.saleDate}{" "}
            </h5>

            <h3 style={{ fontSize: 23 + "px" }}>
              ฿{this.state.product.price}{" "}
            </h3>

            {this.state.product.color && (
              <div className="radioGroup">
                <h4 style={{ marginBottom: 10 + "px" }}>color</h4>
                {color.map((col) => {
                  return (
                    <span key={col.colorId}>
                      <input
                        type="radio"
                        id={col.colorName}
                        name="color"
                        value={`${col.colorId}`}
                        onChange={this.chooseColor}
                      />
                      <label htmlFor={col.colorName}>{col.colorName}</label>
                    </span>
                  );
                })}
                {this.state.noColor && (
                  <h5 style={{ color: "red", marginTop: 5 + "px" }}>
                    please select color!
                  </h5>
                )}
              </div>
            )}

            <div className="plusMinus" style={{ color: "#545454" }}>
              <h4>quantity</h4>
              <div className="plusMinusQuantity">
                <div className="minusButton" onClick={this.minusQuantity}>
                  -
                </div>
                <div className="currentQuantity">{this.state.quantityAdd}</div>
                <div className="plusButton" onClick={this.plusQuantity}>
                  +
                </div>
              </div>
            </div>

            {this.state.product.user &&
            this.state.product.user.userId === this.state.user.userId ? (
              <>
                <button
                  className="InfoButton"
                  style={{
                    padding: 10 + "px",
                    width: 45 + "%",
                  }}
                  onClick={this.editThisProduct}
                >
                  Edit
                </button>
                <button
                  className="delFromCart"
                  style={{
                    padding: 10 + "px",
                    width: 45 + "%",
                    marginLeft: 10 + "px",
                  }}
                  onClick={this.deleteThisProduct}
                >
                  DELETE
                </button>
              </>
            ) : (
              <button
                className="AddButton"
                style={{ padding: 10 + "px", width: 45 + "%" }}
                onClick={this.addToCart}
              >
                Add - ฿{this.state.product.price * this.state.quantityAdd}{" "}
              </button>
            )}
          </Grid>
        </Grid>

        <Container className="productInformation">
          <Grid container>
            <Grid item xs={12}>
              <label htmlFor="infoProduct">
                <div
                  className="infoBox"
                  style={{ fontSize: 15 + "px" }}
                  onClick={this.clickedInfo}
                >
                  <h2 className="infoText">Information</h2>
                  {!this.state.isShowInfo ? (
                    <h5 className="plusIcon">
                      <AddIcon />{" "}
                    </h5>
                  ) : (
                    <h5 className="plusIcon">
                      <RemoveIcon />
                    </h5>
                  )}
                </div>
              </label>
              <input type="checkbox" id="infoProduct" hidden />

              <div className="infoShow">
                <h3
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: 20 + "px",
                  }}
                >
                  {this.state.product.name}
                </h3>
                {this.state.product.type && (
                  <span>
                    <span
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: 16 + "px",
                      }}
                    >
                      Type : {this.state.product.type.name}{" "}
                    </span>
                    <span
                      style={{
                        color: "black",
                        fontWeight: "bold",
                        fontSize: 16 + "px",
                      }}
                    >
                      | Sales by : {this.state.product.user.userName}{" "}
                    </span>
                  </span>
                )}

                <h3>{this.state.product.description}</h3>
              </div>
            </Grid>
            <Grid item xs={12}>
              <label htmlFor="commentsProduct">
                <div
                  className="infoBox"
                  style={{ fontSize: 15 + "px" }}
                  onClick={this.clickedComments}
                >
                  <h2 className="infoText">comments</h2>
                  {!this.state.isShowComments ? (
                    <h5 className="plusIcon">
                      <AddIcon />{" "}
                    </h5>
                  ) : (
                    <h5 className="plusIcon">
                      <RemoveIcon />
                    </h5>
                  )}
                </div>
              </label>
              <input type="checkbox" id="commentsProduct" hidden />

              <div className="commentShow">
                <div className="commentBox">
                  <h3>testuser </h3>
                  <h3>testuser </h3>
                  {/* <h3>{this.state.product.comment[0].userName}</h3>
            <h3>{this.state.product.comment[0].content}</h3> */}
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Container>
    );
  }
}

ProductContent.propTypes = {
  addItem: PropTypes.func.isRequired,
  notFound: PropTypes.func.isRequired,
};
