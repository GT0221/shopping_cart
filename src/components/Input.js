import React from 'react';
import '../styles/Input.css';

function Input(props) {
    const handleButtonClick = (e) => {
        const action = e.target.classList[1];

        if (action === 'increment') {
            props.changeQuantity(() => ({
                ...props.products,
                [props.productKey]: {
                    ...props.products[props.productKey],
                    quantity: props.products[props.productKey].quantity + 1,
                },
            }));
        } else if (action === 'decrement') {
            props.changeQuantity(() => ({
                ...props.products,
                [props.productKey]: {
                    ...props.products[props.productKey],
                    quantity:
                        props.products[props.productKey].quantity <= 1
                            ? 1
                            : props.products[props.productKey].quantity - 1,
                },
            }));
        }
    };
    const handleQuantityChange = (e) => {
        props.changeQuantity(() => ({
            ...props.products,
            [props.productKey]: {
                ...props.products[props.productKey],
                quantity: +e.target.value,
            },
        }));
    };

    return (
        <div className="quantity-container">
            <input
                className="quantity"
                onChange={handleQuantityChange}
                id={props.productKey}
                type="number"
                min="1"
                max="10"
                value={Number(
                    props.products[props.productKey].quantity
                ).toString()}
            />
            <button
                type="button"
                onClick={handleButtonClick}
                className={`quantity-btns decrement`}
                style={{
                    display: `${!props.buttons ? 'none' : 'inline-block'}`,
                }}
            >
                -
            </button>
            <button
                type="button"
                onClick={handleButtonClick}
                className={`quantity-btns increment`}
                style={{
                    display: `${!props.buttons ? 'none' : 'inline-block'}`,
                }}
            >
                +
            </button>
        </div>
    );
}

export default Input;
