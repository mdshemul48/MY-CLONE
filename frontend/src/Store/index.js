import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./auth/authReducer";



export default configureStore({
    reducer: {
        auth: authReducer,
    }
})

