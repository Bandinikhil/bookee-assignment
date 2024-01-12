import shiftsSlice from "./shiftsSlice";

import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    shiftslist: shiftsSlice
  }
});

export default store;
