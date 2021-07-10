import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    allDownloads: [],
    errors: [],
    downloadLength: 0,
}


const reducers = {
    showDownloads: (state, action) => {
        const allDownloads = action.payload;
        state.allDownloads = allDownloads;
        state.downloadLength = allDownloads.length;
        return state
    },
    setError: (state, action) => {
        state.errors.unshift(action.payload)
        return state
    }
}

const downloadingReducer = createSlice({
    name: "downloading",
    initialState,
    reducers
})

export const { showDownloads, setError } = downloadingReducer.actions

export default downloadingReducer.reducer