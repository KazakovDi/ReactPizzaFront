import { createSlice,  createAsyncThunk, unwrapResult } from "@reduxjs/toolkit";
import { addError } from "./filterSlice";
import axios from "../../axios"
export const fetchPizzas = createAsyncThunk("pizzas/fetchPizzas", async (params, thunkAPI)=> {
            try {
                const {data} = await axios.get(`/?category=${params.categoryId}&sortProps=${params.sortProperty}&title=${params.title}
                &page=${params.currentPage}&limit=8`)
                return data
            } catch(error) {
                thunkAPI.dispatch(addError(error.response.data))
                return Promise.reject(error.response)
            }
})
export const fetchNewPizza = createAsyncThunk("pizzas/fetchNewPizza", async (params, thunkAPI)=> {
    try {
        const {data} = await axios.post("/admin/create-pizza", params)
        return data
    } catch(error) {
        thunkAPI.dispatch(addError(error.response.data))
        return Promise.reject(error.response)
    }
})
export const fetchEditPizza = createAsyncThunk("pizzas/fetchEditPizza", async (params, thunkAPI) => {
    try {
        const {data} = await axios.patch(`/admin/edit/${params.id}`, params)
        return data
    } catch(error) {
        thunkAPI.dispatch(addError(error.response.data))
        return Promise.reject(error.response)
    }
})
export const fetchRemovePizza = createAsyncThunk("posts/fetchRemovePizza", async id=> {
    axios.delete(`/admin/remove/${id}`)
})
const initialState = {
    items: [],
    status: 'loading'
}
const pizzaSlice = createSlice({
    name: "pizzas",
    reducers: {},
    initialState,
    extraReducers: {
        [fetchPizzas.pending]: state=> {
            state.items = []
            state.status = "loading"
        },
        [fetchPizzas.fulfilled]: (state, action)=> {
            state.items = action.payload
            state.status = "loaded"
        },
        [fetchPizzas.rejected]: (state, action)=> {
            state.items = action
            state.status = "error"
        },
        [fetchRemovePizza.pending]: (state,action)=> {
            state.items.results = state.items.results.filter(item=> item._id !== action.meta.arg) 
        }
        }
    })

export const pizzasReducer = pizzaSlice.reducer
