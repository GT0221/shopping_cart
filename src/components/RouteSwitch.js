import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import App from '../App';
import Home from './Home';
import Products from './Products';
import { Cart, Checkout } from './Cart';
import { countStorageQuantity } from './helpers';

function RouteSwitch() {
    const [quantityDisplay, setQuantityDisplay] = useState(
        countStorageQuantity()
    );
    return (
        <div>
            <Router>
                <App quantityDisplay={quantityDisplay} />
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route
                        path="/products"
                        element={
                            <Products
                                quantityDisplay={quantityDisplay}
                                setQuantityDisplay={setQuantityDisplay}
                            />
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <Cart
                                quantityDisplay={quantityDisplay}
                                setQuantityDisplay={setQuantityDisplay}
                            />
                        }
                    />
                    <Route
                        path="/cart/checkout"
                        element={<Checkout />}
                        setQuantityDisplay={setQuantityDisplay}
                    />
                    <Route index element={<Home />} />
                </Routes>
            </Router>
        </div>
    );
}

export default RouteSwitch;
