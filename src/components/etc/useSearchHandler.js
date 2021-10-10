import axios from "axios";
import { useEffect, useState } from "react";

function useSearchHandler(searchVal, type, page, pageSize, typeArr) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [typeFilter, setTypeFilter] = useState(null);
  useEffect(() => {
    setProducts([]);
    setTypeFilter(type);
  }, [searchVal, type]);

  useEffect(() => {
    setLoading(true);
    let api = `${process.env.REACT_APP_API_URL}/products/search?`;
    if (type !== "") {
      api = api + `&type=${type}`;
    }
    let cancel;
    axios({
      method: "GET",
      url: api,
      params: { searchText: searchVal, pageNo: page, pageSize: pageSize },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    }).then((res) => {
      setProducts((prevProd) => {
        return [...prevProd, ...res.data];
      });
      setHasMore(res.data.length > 0);
      setLoading(false);
    });

    return () => cancel();
  }, [searchVal, type, page, pageSize, typeArr, typeFilter]);

  return { loading, products, hasMore };
}

export default useSearchHandler;
