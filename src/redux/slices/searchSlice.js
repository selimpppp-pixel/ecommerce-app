import { createSlice } from "@reduxjs/toolkit";

// ده state مبدئي
const initialState = {
  query: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // ده اللي هيغير قيمة السيرش
    setSearch: (state, action) => {
      state.query = action.payload;
    },
  },
});

// export عشان نستخدمه
export const { setSearch } = searchSlice.actions;

// ده بنستخدمه في store
export default searchSlice.reducer;