import React, { useState, useEffect } from "react";
import Input from "./Input";
import Message from "./Message";
import {
    importImages,
    setLocalStorage,
    returnGameConsoles,
    countStorageQuantity,
} from "./helpers";
import "../styles/Products.css";

const productImages = importImages(
    require.context("../images/products", false, /\.(png|jpe?g|svg)$/)
);

function Products(props) {
    const [gameConsoles, setGameConsoles] = useState(
        returnGameConsoles(productImages)
    );
    const [cartItems, setCartItems] = useState({});
    const [showMessage, setShowMessage] = useState(false);
    const handleSubmit = (e) => {
        const inputValue = e.target[0].value;
        const inputId = e.target[0]["id"];
        e.preventDefault();
        if (!inputValue) {
            return;
        } else if (Object.keys(cartItems).includes(inputId)) {
            setCartItems(() => ({
                ...cartItems,
                [e.target[0]["id"]]: {
                    imageSrc: gameConsoles[e.target[0]["id"]].imageSrc,
                    title: gameConsoles[e.target[0]["id"]].title,
                    price: gameConsoles[e.target[0]["id"]].price,
                    quantity:
                        gameConsoles[e.target[0]["id"]].quantity +
                        cartItems[inputId].quantity,
                },
            }));
        } else if (!Object.keys(cartItems).includes(inputId)) {
            setCartItems(() => ({
                ...cartItems,
                [e.target[0]["id"]]: {
                    imageSrc: gameConsoles[e.target[0]["id"]].imageSrc,
                    title: gameConsoles[e.target[0]["id"]].title,
                    price: gameConsoles[e.target[0]["id"]].price,
                    quantity: gameConsoles[e.target[0]["id"]].quantity,
                },
            }));
        }
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
        }, 5000);
    };

    useEffect(() => {
        setLocalStorage(cartItems);
        props.setQuantityDisplay(countStorageQuantity());
    }, [cartItems, props]);

    return (
        <div className="products-page">
            {showMessage && (
                <Message message="Added to cart" checkMark={true} />
            )}
            <h1>Products page</h1>

            <div className="product-cards">
                {Object.keys(gameConsoles).map((key) => {
                    return (
                        <div className="product-card" key={`product-${key}`}>
                            <img src={gameConsoles[key].imageSrc} alt="" />
                            <h2>{gameConsoles[key].title}</h2>
                            <p className="price">
                                ${gameConsoles[key].price}.00
                            </p>
                            <p>{gameConsoles[key].description}</p>
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="quantity">Quantity: </label>
                                <Input
                                    products={gameConsoles}
                                    productKey={key}
                                    changeQuantity={setGameConsoles}
                                    buttons={true}
                                />
                                <button type="submit" id="submit">
                                    Add to cart
                                </button>
                            </form>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Products;
