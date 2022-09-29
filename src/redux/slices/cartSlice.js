import { createSlice,  createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../axios"
const countTotalPrice = (state)=> {
    state.totalPrice = state.items.reduce((sum, item)=> {
        return (item.price * item.count) + sum
}, 0)
}
const initialState = {
    totalPrice: 0,
    items: []
}
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const findItem = state.items.find(item => {
                const regex = new RegExp(`${action.payload.id}`)
              return ((item.id.match(regex)) &&
                (item.size === action.payload.size) &&
                (item.type === action.payload.type))
            })
            findItem ? findItem.count++ : state.items.push({
              ...action.payload, id: action.payload.id + "_" + action.payload.type + "_" + action.payload.size  , count: 1
            }) 
            countTotalPrice(state)
          },
        minusCount: (state, action)=> {
            const findItem = state.items.find(item => {
                return ((item.id === action.payload.id) &&
                  (item.size === action.payload.size) &&
                  (item.type === action.payload.type))
              })
            if(findItem && findItem.count > 1) {
                findItem.count--
                countTotalPrice(state)
            }
        },
        removeItem: (state,action)=> {
            state.items = state.items.filter((item=> {
            return ((item.id !== action.payload.id) ||
            (item.size !== action.payload.size) ||
            (item.type !== action.payload.type))
        }))
            countTotalPrice(state)
        },
        clearCart: state=> {
            state.items = []
            state.totalPrice = 0
        }
    }
    })
export const {addItem, removeItem, clearCart, minusCount} = cartSlice.actions
export const cartReducer = cartSlice.reducer
