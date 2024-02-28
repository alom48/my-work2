import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'; // Import plus and minus icons
import { Link } from 'react-router-dom'; // Import Link for routing

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cart');
        if (storedCartItems) {
            const cartData = JSON.parse(storedCartItems);
            setCartItems(
                cartData.map(item => ({
                    ...item,
                    image: item.image,
                    price: item.price,
                    quantity: 1  // Set default quantity to 1
                }))
            );
        }
        setLoading(false);
    }, []);

    const handleRemove = (index) => {
        const updatedCart = cartItems.filter((item, i) => i !== index);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleQuantityChange = (e, index) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1) {
            const updatedCart = [...cartItems];
            updatedCart[index].quantity = value;
            setCartItems(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const incrementQuantity = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity += 1;
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const decrementQuantity = (index) => {
        const updatedCart = [...cartItems];
        updatedCart[index].quantity -= 1;
        if (updatedCart[index].quantity < 1) {
            updatedCart[index].quantity = 1; // Ensure quantity doesn't go below 1
        }
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const totalItems = cartItems.length;
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <section className='cart-page m-4'>
            <div className='jumbotron'>
                <h1 className='display-4'>Cart</h1>
            </div>
            <div className='row'>
                <div className='col-md-8'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope='col'>Product</th>
                                <th scope='col'>title</th>
                                <th scope='col'>Quantity</th>
                                <th scope='col'>Price</th>
                                <th scope='col'>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan='4'>Loading...</td>
                                </tr>
                            ) : cartItems.length > 0 ? (
                                cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img src={`http://localhost:5000/get-image/${item.image}`} alt={item.title} width="90" />
                                        </td>
                                        <td>{item.title && <h3>{item.title}</h3>}</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <button className="btn btn-outline-secondary" onClick={() => decrementQuantity(index)}>
                                                    <FontAwesomeIcon icon={faMinus} />
                                                </button>
                                                <input
                                                    type='number'
                                                    min='1'
                                                    defaultValue={1}
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(e, index)}
                                                />
                                                <button className="btn btn-outline-secondary" onClick={() => incrementQuantity(index)}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </button>
                                            </div>
                                        </td>
                                        <td>
                                            <p>{item.price && `  ${item.price}`}৳</p>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => handleRemove(index)}>
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </button>
                                        </td>
                                    </tr>
                                ))

                            ) : (
                                <tr>
                                    <td colSpan='4'>No items in the cart</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {cartItems.length > 0 && (
                    <div className='col-md-4 border-left pl-4'>
                        <h2>Cart Summary</h2>
                        <p className='font-weight-light text-muted border-bottom'>
                            {totalItems === 1 ? '(1) Item' : `(${totalItems}) Items`}
                        </p>
                        <p className='font-weight-bold'>
                            Total: {(totalPrice).toFixed(2)}৳
                        </p>
                        <Link to={{ pathname: "/user/Cheakout", state: { cartItems: cartItems, totalPrice: totalPrice } }} className="btn btn-primary">Checkout</Link>

                    </div>
                )}
            </div>
        </section>
    );
}

export default Cart;
