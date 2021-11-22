import axios from "axios";

const SetDefaultHeader = (token = null) => {
  axios.defaults.headers.common = {
    "Cache-Control": "max-age=3600",
  };

  if (token) {
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.authorization;
  }
};

export default SetDefaultHeader;
