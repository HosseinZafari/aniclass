import {configureStore} from "@reduxjs/toolkit";
import progressbarReducer from '../reducers/ProgressbarSlice'

const Store = configureStore({
  reducer: {
    progressbarState: progressbarReducer
  }
})

export default Store