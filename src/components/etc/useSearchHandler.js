import axios from "axios";
import { useEffect, useState } from "react";

function useSearchHandler(searchVal, type, page, pageSize) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setProducts([]);
  }, [searchVal]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let api = `${process.env.REACT_APP_API_URL}/products/search?`;

      if (type.length > 0 && type !== "*") {
        api = api + `&type=${type}`;
      }
      axios({
        method: "GET",
        url: api,
        params: { searchText: searchVal, pageNo: page, pageSize: pageSize },
      }).then((res) => {
        if (searchVal.length > 1 || type === "*") {
          let arr = [
            ...[...products, ...res.data]
              .reduce((map, obj) => map.set(obj.productId, obj), new Map())
              .values(),
          ];

          setProducts(arr);
          setHasMore(res.data.length > 0);
        } else {
          setProducts([]);
        }
        setLoading(false);
      });
    }, 700);
  }, [searchVal, type, page, pageSize]);

  return { loading, products, hasMore };
}

export default useSearchHandler;
