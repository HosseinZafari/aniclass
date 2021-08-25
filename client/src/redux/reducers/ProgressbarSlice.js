const {createSlice} = require("@reduxjs/toolkit");

const initialStore = false

const progressbarSlice = createSlice({
  name: 'Progressbar',
  initialState: initialStore ,
  reducers: {
    enableProgressbar: state => state = true,
    disableProgressbar: state => state = false
  }
})


export const { enableProgressbar , disableProgressbar } = progressbarSlice.actions
export const selectProgressbarState = state => state.progressbarState
export default progressbarSlice.reducer
