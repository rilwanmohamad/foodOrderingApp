import classes from './Cart.module.css'
import CartItem from './CartItem';
import React from 'react';
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import CartCheckOut from './CartCheckOut';
const Cart = (props) => {
    const [isCheckOut, setIsCheckOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);
    const totalAmont = `₹${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 })
    };
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const orderHandler = () => {
        setIsCheckOut(true);
        console.log('working')

    }
    const submitHandler = (userData) => {
        setIsSubmitting(true)
        fetch('https://food-app-api-e5adb-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
    };

    const cartItems = (<ul className={classes['cart-items']}>
        {cartCtx.items.map((item) => (<CartItem key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onRemove={cartItemRemoveHandler.bind(null, item.id)
            } onAdd={cartItemAddHandler.bind(null, item)} />))}
    </ul>
    );

    const modalActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>close</button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>order</button>}
    </div>

    const cartModalContent = <React.Fragment>
        <Modal onClose={props.onClose} >

            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmont}</span>
            </div>
            {!isCheckOut && modalActions}

            {isCheckOut && <CartCheckOut onConfirm={submitHandler} onClose={props.onClose} />}

        </Modal>

    </React.Fragment>

    const isSubmittingModalContent = <p>Sending order data...</p>
    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order!</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );
    return (
        <Modal>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}

        </Modal>


    );
}

export default Cart;