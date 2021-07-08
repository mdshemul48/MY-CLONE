import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./reducers/authReducer";
import dashboard from "./reducers/dashboardReducer";


export default configureStore({
    reducer: {
        auth: authReducer,
        dashboard
    }
})

