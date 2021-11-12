import { Container, Grid, Hidden } from "@material-ui/core";
import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import { useEffect } from "react";
import { clickedFilter, clearFilter } from "../../actions/uiStyle";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import "../../css/filterBox.css";

const FilterBox = ({ uiStyle, clickedFilter, clearFilter }) => {
  const [types, setTypes] = useState([]);
  const [showType, setShowType] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/types`).then((res) => {
      setTypes(res.data);
    });
  }, []);

  const onChange = (e) => {
    let val = e.target.value;
    clickedFilter(val);
  };

  const handleShowType = () => {
    setShowType(!showType);
  };

  const clearCheck = () => {
    clearFilter();
  };
  return (
    <>
      <Hidden smDown>
        <Container id="filterBox" className="filterBox">
          <div
            className="header f18 b pt-20"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>ฟิลเตอร์</div>
            {uiStyle.filterType && uiStyle.filterType.length > 0 && (
              <div>
                <button
                  className="AddButton"
                  style={{
                    padding: "0px",
                    display: "flex",
                    borderRadius: "50%",
                  }}
                  onClick={() => clearCheck()}
                >
                  <CloseIcon style={{ fontSize: "16px" }} />
                </button>
              </div>
            )}
          </div>

          <div>
            <div className="pt-5 pb-5">ประเภท</div>
            <Grid container justifyContent="center">
              {types.map((filter) => {
                return (
                  <Grid item xs={12} key={filter.typeId}>
                    <FormControlLabel
                      className="w100"
                      control={
                        <Checkbox
                          className="mw100 w100"
                          disableRipple={true}
                          checked={uiStyle.filterType === filter.name}
                          color="primary"
                          style={{
                            backgroundColor: "transparent",
                          }}
                          icon={
                            <div className="filterFullItem w100">
                              <CircleUnchecked className="f22 pl-5" />
                              <div className="f16 b pl-10"> {filter.name}</div>
                            </div>
                          }
                          checkedIcon={
                            <div
                              className="filterFullItem w100"
                              style={{
                                backgroundColor: "#f0f8f9",
                              }}
                            >
                              <CircleCheckedFilled className="f22 pl-5" />
                              <div className="f16 b pl-10"> {filter.name}</div>
                            </div>
                          }
                          onChange={onChange}
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
              onClick={handleShowType}
            >
              <div className="b ">ฟิลเตอร์</div>
              {!showType ? (
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
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div className="pt-10">ประเภท </div>
              <div>
                {" "}
                <button
                  className="AddButton"
                  style={{
                    padding: "0px",
                    display: "flex",
                    borderRadius: "50%",
                    marginTop: "12px",
                  }}
                  onClick={() => clearCheck()}
                >
                  <CloseIcon style={{ fontSize: "16px" }} />
                </button>
              </div>{" "}
            </div>

            <Grid container justifyContent="center">
              {types.map((filter) => {
                return (
                  <Grid item xs={12} key={filter.typeId}>
                    <FormControlLabel
                      className="w100"
                      control={
                        <Checkbox
                          disableRipple={true}
                          color="primary"
                          className="w100 mw100"
                          checked={uiStyle.filterType === filter.name}
                          style={{
                            backgroundColor: "transparent",
                          }}
                          icon={
                            <div className="filterFullItem w100">
                              <CircleUnchecked className="f20 pl-5" />
                              <div className="f16 b pl-5"> {filter.name}</div>
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
                              <div className="f16 b pl-5"> {filter.name}</div>
                            </div>
                          }
                          onChange={onChange}
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
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    uiStyle: state.uiStyle,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clickedFilter: (e) => dispatch(clickedFilter(e)),
    clearFilter: () => dispatch(clearFilter()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FilterBox);
