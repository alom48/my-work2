import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Checkout(props) {
    const [checkoutInput, setCheckoutInput] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: ''
    });

    const [error, setError] = useState({
        firstname: '',
        lastname: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        zipcode: ''
    });

    const [paymentType, setPaymentType] = useState('cash'); // Added paymentType state

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCheckoutInput(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChange = (e) => {
        setPaymentType(e.target.value);
    };

    const submitOrder = (e) => {
        e.preventDefault();
        // Handle order submission based on payment method
    };

    return (
        <section>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Cart Information</h4>
                        </div>
                        <div className="card-body">
                            <h5>Total Price: ${props.location.state.totalPrice.toFixed(2)}</h5>
                            <h5>Items:</h5>
                            <ul>
                                {props.location.state.cartItems.map((item, index) => (
                                    <li key={index}>{item.title} - Quantity: {item.quantity}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Basic Information</h4>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Name</label>
                                            <input type="text" name="firstname" onChange={handleInput} value={checkoutInput.firstname} className="form-control" />
                                            <small className="text-danger">{error.firstname}</small>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Phone Number</label>
                                            <input type="number" name="phone" onChange={handleInput} value={checkoutInput.phone} className="form-control" />
                                            <small className="text-danger">{error.phone}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mb-3">
                                            <label>Email Address</label>
                                            <input type="email" name="email" onChange={handleInput} value={checkoutInput.email} className="form-control" />
                                            <small className="text-danger">{error.email}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group mb-3">
                                            <label>City</label>
                                            <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className="form-control" />
                                            <small className="text-danger">{error.city}</small>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group mb-3">
                                            <label>Full Address</label>
                                            <textarea rows="3" name="address" onChange={handleInput} value={checkoutInput.address} className="form-control"></textarea>
                                            <small className="text-danger">{error.address}</small>
                                        </div>
                                    </div>

                                    <div className='col-md-12'>
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='radio'
                                                name='paymentMethod'
                                                value='cash'
                                                onChange={handleChange}
                                                checked={paymentType === 'cash'}
                                            />
                                            <label className='form-check-label'>
                                                Cash on Delivery
                                            </label>
                                        </div>
                                        <div className='form-check'>
                                            <input
                                                className='form-check-input'
                                                type='radio'
                                                name='paymentMethod'
                                                value='online'
                                                onChange={handleChange}
                                                checked={paymentType === 'online'}
                                            />
                                            <label className='form-check-label'>
                                                Online Payment
                                            </label>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="form-group text-end">
                                            <Link to={{
                                                pathname: '/user/order',
                                                state: {
                                                    checkoutInput: checkoutInput,
                                                    paymentType: paymentType,
                                                    totalPrice: props.location.state.totalPrice,
                                                    cartItems: props.location.state.cartItems
                                                }
                                            }} className="btn btn-primary mx-1">Place Order</Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Checkout;
