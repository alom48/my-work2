import React from 'react';
import axios from 'axios';

function Order({ location }) {
    const { checkoutInput, paymentType, totalPrice, cartItems } = location.state;

    const handleConfirmOrder = async () => {
        try {
            const orderData = {
                checkoutInput,
                paymentType,
                totalPrice,
                cartItems
            };
            await axios.post('http://localhost:5000/orders', orderData); // Adjust the URL accordingly
            alert('Order confirmed!');
        } catch (error) {
            console.error('Error confirming order:', error);
            alert('Failed to confirm order');
        }
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
                            <h5>Total Price: ${totalPrice.toFixed(2)}</h5>
                            <h5>Items:</h5>
                            <ul>
                                {cartItems.map((item, index) => (
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
                            <p><strong>Name:</strong> {checkoutInput.firstname} {checkoutInput.lastname}</p>
                            <p><strong>Phone Number:</strong> {checkoutInput.phone}</p>
                            <p><strong>Email Address:</strong> {checkoutInput.email}</p>
                            <p><strong>City:</strong> {checkoutInput.city}</p>
                            <p><strong>Full Address:</strong> {checkoutInput.address}</p>
                            <p><strong>Payment Method:</strong> {paymentType}</p>
                            <button className="btn btn-primary" onClick={handleConfirmOrder}>Confirm Order</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Order;
