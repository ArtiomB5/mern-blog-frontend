import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "../../axios"

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
    const { data } = await axios.post("/auth/login", params)
    return data
})

export const fetchAuthMe = createAsyncThunk("auth/fetchAuth", async (params) => {
    const { data } = await axios.get("/auth/me")
    return data
})

const initialState = {
    data: null,
    status: 'loading',
    isAuth: false,
    me: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
            state.me = null
            state.isAuth = false
            state.status = 'loading'
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.me = action.payload;
            state.isAuth = true;
        },
        [fetchAuthMe.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
            state.isAuth = false;
        },
    }
})

export const authReducer = authSlice.reducer
export const { logout } = authSlice.actions