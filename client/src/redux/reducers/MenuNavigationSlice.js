const {createSlice} = require("@reduxjs/toolkit");
const initialState = {
  currentActiveIndex: 1
}

const menuNavigationSlice = createSlice({
  initialState: initialState
})