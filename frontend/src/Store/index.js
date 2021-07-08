import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./auth/authReducer";



export default configureStore({
    auth: authReducer,
})