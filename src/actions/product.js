import * as type from "../actiontype";

export const editProduct = (product) => ({
  type: type.EDIT_PRODUCT,
  payload: {
    product,
  },
});
