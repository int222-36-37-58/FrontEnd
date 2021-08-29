export default function products(state = {},action = {}){

    switch (action.type) {
        case "GET_USER_PRODUCT":
          return action.products;
        default:
          return state;
      }


}