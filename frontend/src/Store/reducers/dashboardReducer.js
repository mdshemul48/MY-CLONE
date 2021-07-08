import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: {
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
    },
    error: [],
    loading: false

}



const reducers = {
    storeData: (state, action) => {
        state.data = action.payload
        return state
    },
    setError: (state, action) => {
        state.error = [action.payload.error, ...state.error]
        return state
    }
    ,
    setLoading: (state) => {
        state.loading = true;
        return state
    },
    closeLoading: (state) => {
        state.loading = false;
        return state
    }
}

const dataSlice = createSlice({
    name: "dataSlice",
    initialState,
    reducers
})

export const { storeData, setLoading, closeLoading, setError } = dataSlice.actions
export default dataSlice.reducer