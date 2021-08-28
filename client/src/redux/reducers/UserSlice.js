const {createSlice} = require("@reduxjs/toolkit");

const initialState = {
    id: 51,
    nationalCode: 152126578,
    role: "student",
    name: "Hossein",
    family: "Zafari",
    email: "hosseinzafari2000@gmail.com",
    number: 9035490523,
    isLogin: true
}


const userSlice = createSlice({
  name: 'User' ,
  initialState: initialState ,
  reducers: {
    setUser: (state, payload) => {
      state = payload.payload
    }  ,
    logout: (state ) => {
      state = initialState
    } ,
  },
})


export const { setUser , logout } = userSlice.actions
export const userSelector = state => state.user
export default userSlice.reducer