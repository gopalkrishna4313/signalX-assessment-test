export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";
export const ADD_PRODUCT = "ADD_PRODUCT";

export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(fetchProductsRequest());
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      const limitedData = data.slice(0, 10);
      dispatch(fetchProductsSuccess(limitedData));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message));
    }
  };
};

export const createProduct = (newProduct) => {
  return async (dispatch) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      dispatch(addProduct(data));
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
};
