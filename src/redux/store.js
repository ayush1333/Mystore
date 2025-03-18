import { configureStore } from "@reduxjs/toolkit";
import compareReducer from "./compareSlice";

const store = configureStore({
  reducer: {
    compare: compareReducer,
  },
});

export default store;
