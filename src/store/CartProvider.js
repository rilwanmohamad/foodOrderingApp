import { useReducer } from "react";
import CartContext from "./cart-context";


const defaultCartState = {

    items: [],
    totalAmount: 0
};
const cartReducer = (state, action) => {
    if (action.type === 'add') {

        const updatedAmount = state.totalAmount + action.item.price * action.item.amount;


        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemIndex];

        let updateItems;
        if (existingCartItem) {
            const updateItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };

            updateItems = [...state.items];

            updateItems[existingCartItemIndex] = updateItem;


        } else {
            updateItems = state.items.concat(action.item);

        }


        return {
            items: updateItems,
            totalAmount: updatedAmount
        };
    }
    if (action.type === 'remove') {
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        console.log(existingCartItemIndex);
        const existingCartItem = state.items[existingCartItemIndex];
        console.log(existingCartItem);
        const updatedAmount = state.totalAmount - existingCartItem.price;
        console.log(updatedAmount);
        let updateItems;
        if (existingCartItem.amount === 1) {
            updateItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updateItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
            console.log(updateItem);
            updateItems = [...state.items];
           
            updateItems[existingCartItemIndex] = updateItem;
          
            console.log(updateItems);

        }
        return {
            items: updateItems,
            totalAmount: updatedAmount

        };
    }
    return defaultCartState
}


const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemHandler = (item) => {
        dispatchCartAction({ type: 'add', item: item })
    }

    const removeIdHandler = (id) => {
        dispatchCartAction({ type: 'remove', id: id })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeIdHandler
    };
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>

    );

}


export default CartProvider;