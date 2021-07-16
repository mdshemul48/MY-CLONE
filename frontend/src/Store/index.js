import { configureStore } from "@reduxjs/toolkit"

import authReducer from "./reducers/authReducer";
import dashboard from "./reducers/dashboardReducer";
import downloading from "./reducers/downloadingReducer"
import botStatusReducer from "./reducers/botStateReducer"

// download history page
import downloadHistoryReducer from "./reducers/downloadHistoryReducer"

export default configureStore({
    reducer: {
        auth: authReducer,
        dashboard,
        downloading,
        botStatusReducer,
        downloadHistoryReducer
    }
})

