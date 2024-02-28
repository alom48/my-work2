import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [cart, setCart] = useState([]);
    const history = useHistory(); // Get the history object

    useEffect(() => {
        fetch('http://localhost:5000/get-image')
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setProducts(data.data);
                } else {
                    console.error('Error fetching products:', data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cart');
        if (storedCartItems) {
            setCart(JSON.parse(storedCartItems));
        }
    }, []);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }

    const handleAddToCart = async (productId) => {
        try {
            // Send a POST request to the server to add the product to the cart
            const response = await axios.post(`http://localhost:5000/add-to-cart/${productId}`);

            // Check if the request was successful
            if (response.status === 200) {
                // If successful, update the cart state in the frontend
                const newProduct = response.data.product;
                setCart([...cart, newProduct]);

                // Update the cart items in local storage
                localStorage.setItem('cart', JSON.stringify([...cart, newProduct]));

                // Redirect to the cart page
                history.push('/user/cart');
            }
        } catch (error) {
            // Handle any errors
            console.error('Error adding product to cart:', error);
        }
    };

    const isInCart = (productId) => {
        return cart.some(item => item._id === productId);
    };

    const filteredProducts = products.filter(product =>
        (selectedCategory === '' || product.category.toLowerCase() === selectedCategory.toLowerCase())
    );

    return (
        <div>
            <h1>Buy Product</h1>
            <select onChange={handleCategoryChange}>
                <option value="">All</option>
                <option value="laptop">Laptop</option>
                <option value="mouse">Mouse</option>
                <option value="keyboard">Keyboard</option>
            </select>

            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {filteredProducts.map(p => (
                    <div key={p._id} style={{ width: '20%', margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
                        <img src={`http://localhost:5000/get-image/${p.image}`} alt={p.title} width="100%" />
                        <h3>{p.title}</h3>
                        <p>Price: {p.price}$</p>
                        {isInCart(p._id) ? (
                            <button disabled className='btn btn-secondary mr-2'>
                                In Cart
                            </button>
                        ) : (
                            <button onClick={() => handleAddToCart(p._id)} className='btn btn-success mr-2'>
                                Add to Cart
                            </button>
                        )}
                        <Link to={`/user/products/${p._id}/view`} className='btn'>View Product</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
