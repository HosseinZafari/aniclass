const {createSlice} = require("@reduxjs/toolkit");

const initialState = {
    id: -1,
    nationalCode: -1,
    role: null,
    firstName: null,
    lastName: null,
    email: null,
    isLogin: false,
    token: null
}


const userSlice = createSlice({
  name: 'User' ,
  initialState ,
  reducers: {
    setUser: (state, action) => {
      state = action.payload
      return state
    }  ,
    logout: (state ) => state = initialState
    ,
  },
})


export const { setUser , logout } = userSlice.actions
export const userSelector = state => state.user
export default userSlice.reducer
