import axios from "axios";
import { useReducer, createContext, useState, useEffect } from "react";

export const Store = createContext();

const initialState = {
    cart: {
        cartItems: []
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case "CART_ADD_ITEM": {
            const newItem = action.payload;
            const existItem = state.cart.cartItems.find((item) => item.slug === newItem.slug)
            const cartItems = existItem ? state.cart.cartItems.map((item) => item.name === existItem.name ? newItem : item)
                : [...state.cart.cartItems, newItem]
            return {
                ...state, cart: { ...state.cart, cartItems }
            }
        }
        case "CART_REMOVE_ITEM": {
            const cartItems = state.cart.cartItems.filter((item) => item.slug !== action.payload.slug)
            return { ...state, cart: { ...state.cart, cartItems } }
        }

        default:
            return state;
    }
}

export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [priceTo, setPriceTo] = useState(true);
    //true is ARGS, false is USD
    const [dolar, setDolar] = useState([]);
    useEffect(() => {
        axios
            .get("https://api.bluelytics.com.ar/v2/latest")
            .then((res) => setDolar(res.data))
            .catch((err) => console.log(err));
    })
    const value = { state, dispatch, priceTo, setPriceTo, dolar, setDolar }
    return <Store.Provider value={value}>{children}</Store.Provider>
}