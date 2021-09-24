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
  };

  handleShowType = () => {
    this.setState({ showType: !this.state.showType });
  };

  render() {
    return (
      <>
        <Hidden smDown>
          <Container id="filterBox" className="filterBox">
            <div
              className="header"
              style={{
                fontSize: "18px",
                paddingTop: 20 + "px",
                fontWeight: 600,
              }}
            >
              ฟิลเตอร์
            </div>

            <div className="type">
              <div style={{ paddingTop: 10 + "px", paddingBottom: 10 + "px" }}>
                ประเภท
              </div>
              <Grid container>
                {this.state.filters.map((filter) => {
                  return (
                    <Grid item xs={12}>
                      <FormControlLabel
                        key={filter.typeId}
                        control={
                          <Checkbox
                            color="primary"
                            icon={
                              <CircleUnchecked style={{ fontSize: "22px" }} />
                            }
                            checkedIcon={
                              <CircleCheckedFilled
                                style={{ fontSize: "22px" }}
                              />
                            }
                            onChange={this.onChange}
                            value={filter.name}
                          />
                        }
                        label={filter.name}
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
                className="headerRes hoverCursor infoBox" style={{paddingTop:'5px',paddingBottom:'5px'}}
                onClick={this.handleShowType}
              >
                <div style={{ fontWeight: 600 }}>ฟิลเตอร์</div>
                {!this.state.showType ? (
                  <div>
                    <AddIcon style={{ fontSize: 20 + "px" }} />{" "}
                  </div>
                ) : (
                  <div>
                    <RemoveIcon style={{ fontSize: 20 + "px" }} />
                  </div>
                )}
              </div>
            </label>

            <input type="checkbox" id="infoFilter" hidden />

            <div className="type typeHidden">
              <div style={{ paddingTop: 10 + "px" }}>ประเภท</div>
              <Grid>
                {this.state.filters.map((filter) => {
                  return (
                    <FormControlLabel
                      key={filter.typeId}
                      control={
                        <Checkbox
                          color="primary"
                          icon={<CircleUnchecked />}
                          checkedIcon={<CircleCheckedFilled />}
                          onChange={this.onChange}
                          value={filter.name}
                        />
                      }
                      label={filter.name}
                    />
                  );
                })}
              </Grid>
            </div>
          </Container>
        </Hidden>
      </>
    );
  }
}
