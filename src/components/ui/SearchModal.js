import {
  CircularProgress,
  Container,
  Grid,
  Hidden,
  InputBase,
} from "@material-ui/core";
import React, { useCallback, useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { useState } from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useEffect } from "react";

import ProductCard from "./ProductCard";
import useSearchHandler from "../etc/useSearchHandler";
import axios from "axios";

const SearchModal = (props) => {
  const [searchVal, setSearchVal] = useState("");
  const [type, setType] = useState("");
  const [types, setTypes] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(8);
  const { products, hasMore, loading } = useSearchHandler(
    searchVal,
    type,
    page,
    pageSize
  );
  const observer = useRef();
  const lastElementRef = useCallback(
    (el) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((e) => {
        if (e[0].isIntersecting && hasMore) {
          setPage((p) => p + 1);
        }
      });
      if (el) observer.current.observe(el);
    },
    [loading, hasMore]
  );

  const onSearch = (e) => {
    setSearchVal(e.target.value);
    setPage(0);
  };

  useEffect(() => {
    setSearchVal(props.query);
    setPage(0);

    axios.get(`${process.env.REACT_APP_API_URL}/types`).then((res) => {
      setTypes(res.data);
    });
  }, [props]);

  const chooseType = (e) => {
    setType(e.target.value);
    setPage(0);
  };

  const closeModal = () => {
    setType("");
    props.close();
  };

  return (
    <>
      {props.open && (
        <div
          className="colorModal"
          style={{
            paddingTop: "75px",
            transition: "0.3s",
          }}
        >
          <>
            <Container
              maxWidth="lg"
              style={{
                backgroundColor: "white",
                padding: "50px",
                display: "flex",
                flexDirection: "column",
                borderStyle: "solid",
                borderRadius: "15px",
                borderColor: "transparent",
                marginTop: "30px",
              }}
            >
              <div
                style={{
                  textAlign: "right",
                  color: "#333435",
                  outline: "none",
                  position: "relative",
                  marginTop: "-20px",
                }}
              >
                <CloseIcon
                  className="hoverCursor "
                  style={{ fontSize: "24px" }}
                  onClick={closeModal}
                />
              </div>
              <Hidden mdUp>
                <div
                  className="searchResField"
                  style={{ borderColor: "#1895f5" }}
                >
                  <SearchIcon
                    style={{ color: "#1895f5", marginLeft: 10 + "px" }}
                  ></SearchIcon>
                  <InputBase
                    style={{
                      width: "85%",
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
                  {searchVal.length > 0 && (
                    <CloseIcon
                      className="hoverCursor"
                      style={{
                        color: "#1895f5",
                        marginLeft: 10 + "px",
                        marginRight: "20px",
                      }}
                      onClick={() => setSearchVal("")}
                    />
                  )}
                </div>{" "}
              </Hidden>

              {products.length > 0 ? (
                <div className="f24">ผลลัพธ์การค้นหา</div>
              ) : (
                <div className="f24"> ไม่มีผลลัพธ์ของการค้นหานี้</div>
              )}
              <div className="radioGroup pt-20 pb-20">
                <span className="f18  pr-20">กรองการค้นหา</span>
                {types.map((tp) => {
                  return (
                    <span key={tp.typeId}>
                      <input
                        type="radio"
                        id={tp.name}
                        name="type"
                        defaultValue={tp.name}
                        onChange={chooseType}
                      />
                      <label htmlFor={tp.name}>{tp.name}</label>
                    </span>
                  );
                })}
              </div>

              <Grid container direction="row" spacing={2}>
                {products.map((product, i) => {
                  if (products.length === i + 1) {
                    return (
                      <Grid
                        item
                        xs={12}
                        sm={3}
                        md={5}
                        lg={3}
                        ref={lastElementRef}
                        key={i}
                      >
                        <ProductCard
                          product={product}
                          listStyle={1}
                          closeSearchModal={closeModal}
                        ></ProductCard>{" "}
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid item xs={12} sm={3} md={5} lg={3} key={i}>
                        <ProductCard
                          product={product}
                          listStyle={1}
                          closeSearchModal={closeModal}
                        ></ProductCard>
                      </Grid>
                    );
                  }
                })}

                {loading && (
                  <Grid item xs={12}>
                    <div style={{ textAlign: "center", paddingTop: "20px" }}>
                      <CircularProgress
                        style={{ color: "#1895f5" }}
                        disableShrink
                      />
                    </div>
                  </Grid>
                )}
              </Grid>
            </Container>
          </>
        </div>
      )}
    </>
  );
};

export default SearchModal;
