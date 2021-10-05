import { Container, Grid, Hidden } from "@material-ui/core";
import React, { Component } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";

import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

export default class FilterBox extends Component {
  state = {
    filters: [],
    checkData: [],
    showType: false,
  };

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/types`).then((res) => {
      const type = res.data;
      this.setState({ filters: type });
    });
  }

  onChange = (e) => {
    let newCheck = [...this.state.checkData, e.target.value];
    if (this.state.checkData.includes(e.target.value)) {
      newCheck = newCheck.filter((f) => f !== e.target.value);
    }
    this.setState({ checkData: newCheck });
    console.log(this.state.checkData);
  };

  handleShowType = () => {
    this.setState({ showType: !this.state.showType });
  };

  clearCheck = () => {
    this.setState({ checkData: [] });
  };

  render() {
    return (
      <>
        <Hidden smDown>
          <Container id="filterBox" className="filterBox">
            <div
              className="header f18 b pt-20"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyItems: "center",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>ฟิลเตอร์</div>
              {this.state.checkData.length > 0 && (
                <div>
                  <button
                    className="AddButton"
                    style={{ padding: "3px" }}
                    onClick={() => this.clearCheck()}
                  >
                    ล้างการกรอง
                  </button>
                </div>
              )}
            </div>

            <div>
              <div className="pt-5 pb-5">ประเภท</div>
              <Grid container justifyContent="center">
                {this.state.filters.map((filter) => {
                  return (
                    <Grid item xs={12} key={filter.typeId}>
                      <FormControlLabel
                        className="w100"
                        control={
                          <Checkbox
                            className="mw100 w100"
                            disableRipple={true}
                            checked={this.state.checkData.includes(filter.name)}
                            color="primary"
                            style={{
                              backgroundColor: "transparent",
                            }}
                            icon={
                              <div className="filterFullItem w100">
                                <CircleUnchecked className="f22 pl-5" />
                                <div className="f18 b pl-5"> {filter.name}</div>
                              </div>
                            }
                            checkedIcon={
                              <div
                                className="filterFullItem w100"
                                style={{
                                  transition: "0.25s",

                                  backgroundColor: "#f0f8f9",
                                }}
                              >
                                <CircleCheckedFilled className="f22 pl-5" />
                                <div className="f18 b pl-5"> {filter.name}</div>
                              </div>
                            }
                            onChange={this.onChange}
                            value={filter.name}
                          />
                        }
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </div>
          </Container>
        </Hidden>

        <Hidden mdUp>
          <Container id="filterBox" className="filterBox">
            <label htmlFor="infoFilter">
              <div
                className="headerRes hoverCursor infoBox pt-5 pb-5"
                onClick={this.handleShowType}
              >
                <div className="b">ฟิลเตอร์</div>
                {!this.state.showType ? (
                  <div>
                    <AddIcon className="f20" />{" "}
                  </div>
                ) : (
                  <div>
                    <RemoveIcon className="f20" />
                  </div>
                )}
              </div>
            </label>

            <input type="checkbox" id="infoFilter" hidden />

            <div className="type typeHidden">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyItems: "center",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="pt-10">ประเภท </div>
                <div>
                  {" "}
                  <button
                    className="AddButton"
                    style={{ padding: "2px", marginTop: "10px" }}
                    onClick={() => this.clearCheck()}
                  >
                    ล้างการกรอง
                  </button>
                </div>{" "}
              </div>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <Grid container justifyContent="center">
                  {this.state.filters.map((filter) => {
                    return (
                      <Grid item xs={12} key={filter.typeId}>
                        <FormControlLabel
                          className="w100"
                          control={
                            <Checkbox
                              disableRipple={true}
                              color="primary"
                              className="w100 mw100"
                              checked={this.state.checkData.includes(
                                filter.name
                              )}
                              style={{
                                backgroundColor: "transparent",
                              }}
                              icon={
                                <div className="filterFullItem w100">
                                  <CircleUnchecked className="f20 pl-5" />
                                  <div className="f16 b pl-5">
                                    {" "}
                                    {filter.name}
                                  </div>
                                </div>
                              }
                              checkedIcon={
                                <div
                                  className="filterFullItem w100"
                                  style={{
                                    transition: "0.25s",
                                    backgroundColor: "#f0f8f9",
                                  }}
                                >
                                  <CircleCheckedFilled className="f20 pl-5" />
                                  <div className="f16 b pl-5">
                                    {" "}
                                    {filter.name}
                                  </div>
                                </div>
                              }
                              onChange={this.onChange}
                              value={filter.name}
                            />
                          }
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </div>
            </div>
          </Container>
        </Hidden>
      </>
    );
  }
}
