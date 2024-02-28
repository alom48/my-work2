import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import axios from 'axios';

function ProductViews(props) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const history = useHistory(); // Initialize useHistory

    useEffect(() => {
        fetch(`http://localhost:5000/get-product/${props.match.params.id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch product');
                }
                return res.json();
            })
            .then(productData => {
                setProduct(productData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                setLoading(false);
            });
    }, [props.match.params.id]);

    const handleAddToCart = async (productId) => {
        console.log('Adding product to cart:', productId);
        try {
            const response = await axios.post(`http://localhost:5000/add-to-cart/${productId}`);

            if (response.status === 200) {
                // Redirect to the cart page
                history.push('/user/cart'); // Use history.push to navigate
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    return (
        <div>
            <h2>Product Details</h2>
            {loading ? (
                <p>Loading...</p>
            ) : product ? (
                <div>
                    <img src={`http://localhost:5000/get-image/${product.image}`} alt={product.title} />
                    <div>
                        <h3>{product.title}</h3>
                        <p>Price: {product.price}</p>
                        <p>Category: {product.category}</p>
                        <p>Details: {product.details}</p>
                    </div>
                    <button onClick={() => handleAddToCart(product._id)} className='btn btn-success mr-2'>
                        Add to Cart
                    </button>
                </div>
            ) : (
                <p>No product found</p>
            )}
        </div>
    );
}

export default ProductViews;
