import { configureStore } from "@reduxjs/toolkit"

// auth reducer
import authReducer from "./reducers/authReducer";
// dashboard
import dashboard from "./reducers/dashboardReducer";
import downloading from "./reducers/downloadingReducer"
import botStatusReducer from "./reducers/botStateReducer"

// download history page
import downloadHistoryReducer from "./reducers/downloadHistoryReducer"

// publish command
import publishCommands from "./reducers/publishCommands"

export default configureStore({
    reducer: {
        auth: authReducer,
        dashboard,
        downloading,
        botStatusReducer,
        downloadHistoryReducer,
        publishCommands
    }
})

