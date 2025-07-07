import { createSlice } from "@reduxjs/toolkit";

export const personasSlice = createSlice({
  name: "personas",
  initialState: {
    personas: [],
  },
  reducers: {
    agregarPersonas: (state, action) => {
      state.personas = action.payload;
    },
  },
});

export const { agregarPersonas } = personasSlice.actions;

export default personasSlice.reducer;
