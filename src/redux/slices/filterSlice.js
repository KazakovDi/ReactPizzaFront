import { createSlice,  createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios"

const initialState = {
    categoryId: 0,
    title: "",
    error: {},
    currentPage: 1,
    sort: {
        name: "популярности",
        sortProperty: 'rating'
    }
}
const filterSlice = createSlice({
    name: "filter",
    error: "",
    initialState,
    reducers: {
        setCategory : (state, action) => {
            state.categoryId = action.payload
        },
        changeSortType : (state,action) => {
            state.sort = action.payload
        },
        titleSearch: (state, action) => {
            state.title =  action.payload
        },
        setPageNumber: (state, action) => {
            state.currentPage =  action.payload
        },
        addError: (state, action)=>{
            state.error = action.payload
        }
    }})
export const {setCategory, changeSortType, titleSearch, setPageNumber,addError} = filterSlice.actions
export const filterReducer = filterSlice.reducer
