import { Container, Grid, Hidden, InputBase } from "@material-ui/core";
import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";
import SearchIcon from "@material-ui/icons/Search";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import axios from "axios";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import { useEffect } from "react";

const FilterBox = () => {
  const [types, setTypes] = useState([]);
  const [checkedData, setCheckedData] = useState([]);
  const [showType, setShowType] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/types`).then((res) => {
      setTypes(res.data);
    });
  }, []);

  const onChange = (e) => {
    let newCheck = [...checkedData, e.target.value];
    if (checkedData.includes(e.target.value)) {
      newCheck = newCheck.filter((f) => f !== e.target.value);
    }
    setCheckedData(newCheck);
    console.log(checkedData);
  };

  const handleShowType = () => {
    setShowType(!showType);
  };

  const clearCheck = () => {
    setCheckedData([]);
  };

  const onSearch = (e) => {
    setSearchVal(e.target.value);
    console.log(searchVal);
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
              justifyItems: "center",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>ฟิลเตอร์</div>
            {checkedData.length > 0 && (
              <div>
                <button
                  className="AddButton"
                  style={{ padding: "3px" }}
                  onClick={() => clearCheck()}
                >
                  ล้างการกรอง
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
                          checked={checkedData.includes(filter.name)}
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
              <div className="b">ฟิลเตอร์และค้นหา</div>
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

          <Hidden mdUp>
            <div className="searchResField">
              <SearchIcon
                style={{ color: "gray", marginLeft: 10 + "px" }}
              ></SearchIcon>
              <InputBase
                style={{
                  marginLeft: 10 + "px",
                  paddingRight: 10 + "px",
                }}
                placeholder="Search…"
                variant="outlined"
                type="text"
                id="searchText"
                name="searchText"
                value={searchVal}
                onChange={onSearch}
              />
            </div>
          </Hidden>

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
                  onClick={() => clearCheck()}
                >
                  ล้างการกรอง
                </button>
              </div>{" "}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
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
                            checked={checkedData.includes(filter.name)}
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
          </div>
        </Container>
      </Hidden>
    </>
  );
};

export default FilterBox;
