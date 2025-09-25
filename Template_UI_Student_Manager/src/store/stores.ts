import { configureStore } from "@reduxjs/toolkit";
import student_slice from "./slice/studentSlice"
const store = configureStore({  
    reducer:{
        students : student_slice
    }
})
export default store
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;