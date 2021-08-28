import {configureStore} from "@reduxjs/toolkit";
import progressbarReducer from '../reducers/ProgressbarSlice'
import userReducer from '../reducers/UserSlice'

const Store = configureStore({
  reducer: {
    progressbarState: progressbarReducer ,
    user: userReducer
  }
})

export default Store