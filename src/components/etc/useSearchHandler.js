import axios from "axios";
import { useEffect, useState } from "react";

function useSearchHandler(searchVal, type, page, pageSize, sort) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [sortB, setSortB] = useState("");

  useEffect(() => {
    setProducts([]);
  }, [searchVal, type]);

  useEffect(() => {
    setLoading(true);
    let api = `${process.env.REACT_APP_API_URL}/products/search?`;
    if (searchVal !== "") {
      let query = "";
      if (searchVal !== "all") {
        query = searchVal;
      }
      api = api + `&searchText=${query}`;
    }
    if (type !== "") {
      let query = "";
      if (type !== "all") {
        query = type;
        api = api + `&type=${query}`;
      } else if (searchVal === "") {
        api = api + `searchText=`;
      }
    }

    if (sort === "" && sortB !== "") {
      setProducts([]);
      setSortB("");
    }

    if (sort !== "" && sort !== sortB) {
      setProducts([]);
      setSortB(sort);
      api += `&sortBy=${sort}`;
    }

    if (sortB === sort) {
      api += `&sortBy=${sortB}`;
    }

    let cancel;

    axios({
      method: "GET",
      url: api,
      params: { pageNo: page, pageSize: pageSize },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setProducts((prevProd) => {
          return [...new Set([...prevProd, ...res.data])];
        });
        setHasMore(res.data.length >= pageSize);
        setTimeout(() => {
          setLoading(false);
        }, 700);
      })
      .catch((e) => {
        setLoading(false);
        if (axios.isCancel(e)) {
          return;
        }
      });

    return () => cancel();
  }, [searchVal, type, page, pageSize, sort, sortB]);

  return { loading, products, hasMore };
}

export default useSearchHandler;
