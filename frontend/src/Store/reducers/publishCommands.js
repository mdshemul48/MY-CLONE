import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    commands: [],
    errors: [],
    setLoading: false
}

const reducers = {
    setCommands: (state, action) => {
        state.commands = action.payload
        return state
    },
    setCommand: (state, action) => {
        state.commands.unshift(action.payload)
        return state
    },
    removeCommand: (state, action) => {
        state.commands = state.commands.filter(command => command.id !== action.payload.id)
        return state
    },
    setErrors: (state, action) => {
        state.errors.push(action.payload)
        return state
    },
    setLoading: (state) => {
        state.loading = true
        return state
    },
    closeLoading: (state) => {
        state.loading = false
        return state
    }
}

const publishReducer = createSlice({
    name: "publishCommands",
    initialState,
    reducers
})

export const { setCommands, setCommand, setErrors, setLoading, closeLoading } = publishReducer.actions

export default publishReducer.reducer