import { configureStore } from "@reduxjs/toolkit";
import { personasSlice } from "./reducers/personas-slice";

export default configureStore({
  reducer: {
    personas: personasSlice.reducer,
  },
});
