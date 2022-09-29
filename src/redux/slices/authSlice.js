import { createSlice,  createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios"
export const fetchLogin = createAsyncThunk("admin/fetchLogin", async (params)=> {
    try {
        const {data} = await axios.post("/admin/login", params)
        return data
    } catch(err) {
        return Promise.reject(err.response)
    }
    
})
export const fetchAuthMe = createAsyncThunk("admin/fetchAuthMe", async ()=> {
    try {
        const {data} = await axios.get("/admin/auth/me")
        return data
    } catch(err) {
        return Promise.reject(err.response)
    }
    
})
const initialState = {
    data: null,
    status: "loading"
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state)=> {
            state.data = null
        }
    },
    extraReducers: {
        [fetchLogin.pending]: state=> {
            state.data = null
            state.status = "loading"
        },
        [fetchLogin.fulfilled]: (state, action)=> {
            state.data = action.payload
            state.status = "loaded"
        },
        [fetchLogin.rejected]: state=> {
            state.data = null
            state.status = "error"
        },
        [fetchAuthMe.pending]: state=> {
            state.data = null
            state.status = "loading"
        },
        [fetchAuthMe.fulfilled]: (state, action)=> {
            state.data = action.payload
            state.status = "loaded"
        },
        [fetchAuthMe.rejected]: state=> {
            state.data = null
            state.status = "error"
        }
    }})
export const {logout} = authSlice.actions
export const selectAuth = state => {return Boolean(state.auth.data)}
export const authReducer = authSlice.reducer
