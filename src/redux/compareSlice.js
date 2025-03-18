import { createSlice } from "@reduxjs/toolkit";

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    comparedProducts: [],
    isModalOpen: false, // Track modal state
  },
  reducers: {
    addToCompare: (state, action) => {
      if (
        state.comparedProducts.length < 4 &&
        !state.comparedProducts.some((p) => p.id === action.payload.id)
      ) {
        state.comparedProducts.push(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      state.comparedProducts = state.comparedProducts.filter(
        (product) => product.id !== action.payload
      );
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const { addToCompare, removeFromCompare, toggleModal } =
  compareSlice.actions;
export default compareSlice.reducer;
