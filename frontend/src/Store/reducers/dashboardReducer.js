import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: {
        todayOnDownload: 0,
        TotalInDownload: 0,
        TotalInUpload: 0,
        TotalInPublish: 0,
        allMovies: 0
    },
    botWorkingData: [],
    errors: {
        downloaderError: [],
        uploaderError: [],
        publisherError: []
    }
}



const reducers = {
    storeData: (state, action) => {
        state = action.payload
        return state
    }
}

const dataSlice = createSlice({
    name: "dataSlice",
    initialState,
    reducers
})

export const { storeData } = dataSlice.actions
export default dataSlice.reducer