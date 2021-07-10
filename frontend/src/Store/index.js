import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./reducers/authReducer";
import dashboard from "./reducers/dashboardReducer";
import downloading from "./reducers/downloadingReducer"


export default configureStore({
    reducer: {
        auth: authReducer,
        dashboard,
        downloading
    }
})

