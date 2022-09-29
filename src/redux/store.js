import {configureStore} from "@reduxjs/toolkit"
import { pizzasReducer } from "./slices/pizzaSlice"
import {filterReducer} from "./slices/filterSlice"
import {cartReducer} from "./slices/cartSlice"
import { authReducer } from "./slices/authSlice"
const store = configureStore({
    reducer: {
        pizzas: pizzasReducer,
        filter: filterReducer,
        cart: cartReducer,
        auth: authReducer
    }
})

export default store