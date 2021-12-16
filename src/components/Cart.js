import React, { useState, useEffect } from 'react';
import Input from './Input';
import Message from './Message';
import { Link } from 'react-router-dom';
import { getLocalStorage, countStorageQuantity } from './helpers';
import '../styles/Cart.css';

function Cart(props) {
    const [cartItems, setCartItems] = useState(getLocalStorage() || null);
    const [showMessage, setShowMessage] = useState(false);
    const deleteCartItem = (e) => {
        const itemName = e.target.id;
        delete cartItems[itemName];
        setCartItems(() => ({ ...cartItems }));
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 5000);
        console.log(cartItems);
    };
    const clearCart = () => {
        const userAnswer = window.confirm(
            'Are you sure you want to remove all items?'
        );

        if (userAnswer) {
            setCartItems({});
        } else {
            return;
        }
    };
    const calculateCartTotal = () => {
        const total = Object.values(cartItems).reduce((previous, current) => {
            return current.quantity * current.price + previous;
        }, 0);
        return total;
    };

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        props.setQuantityDisplay(countStorageQuantity());
    }, [cartItems, props]);

    if (Object.keys(cartItems).length === 0) {
        return (
            <div className="cart-page empty">
                <h1>Cart is empty</h1>
            </div>
        );
    }
    console.log(cartItems);
    return (
        <div className="cart-page">
            {showMessage && (
                <Message message="Removed from Cart" checkMark={false} />
            )}
            <div className="cart-header">
                <h1>Shopping Cart</h1>
                <button className="clear-cart" onClick={clearCart}>
                    Remove All
                </button>
            </div>
            {Object.keys(cartItems).map((key) => {
                return (
                    <div className="cart-items" key={`cart-item-${key}`}>
                        <div>
                            <img
                                src={cartItems[key].imageSrc}
                                style={{
                                    width: '75px',
                                    height: '100px',
                                    objectFit: 'contain',
                                }}
                                alt=""
                            />
                        </div>
                        <div style={{ textAlign: 'center', width: '25%' }}>
                            <p>{cartItems[key].title}</p>
                            <br></br>
                            <p>Price: ${cartItems[key].price}</p>
                        </div>
                        <div>
                            <Input
                                products={cartItems}
                                productKey={key}
                                changeQuantity={setCartItems}
                                buttons={true}
                            />
                        </div>
                        <div style={{ textAlign: 'center', width: '25%' }}>
                            <p>
                                Total: $
                                {cartItems[key].price * cartItems[key].quantity}
                            </p>
                            <button
                                className="delete-item"
                                id={key}
                                onClick={deleteCartItem}
                            >
                                Remove item
                            </button>
                        </div>
                    </div>
                );
            })}
            <div className="total">
                <div>
                    <p>Total: ${calculateCartTotal()}</p>
                    <p>Tax: 2%</p>
                    <p>
                        Grand Total: $
                        {calculateCartTotal() * 0.05 + calculateCartTotal()}
                    </p>
                </div>
            </div>
            <div className="checkout">
                <Link to="/cart/checkout" className="checkout-link">
                    Checkout
                </Link>
            </div>
        </div>
    );
}

function Checkout() {
    return (
        <div className="checkout-page">
            <p>
                Clicking on the checkout link on the cart page would lead to
                this checkout page where the customer would enter payment
                information to confirm their order.
            </p>
        </div>
    );
}

export { Cart, Checkout };
