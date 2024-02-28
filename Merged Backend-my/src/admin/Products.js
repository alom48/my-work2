import React, { useEffect, useState } from 'react';
import Wrapper from './Wrapper';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Products() {
    const [products, setProducts] = useState([]);

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

    const deleteProduct = async (productId) => {
        try {
            const confirmDelete = window.confirm("Are you sure you want to delete this product?");
            if (confirmDelete) {
                const response = await axios.delete(`http://localhost:5000/delete-image/${productId}`);
                console.log(response.data); //  
                setProducts(products.filter(product => product._id !== productId));
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }


    return (
        <Wrapper>
            <Link to='/admin/products/create' className='btn'>Add Product</Link>
            <table>
                <thead>
                    <tr>
                        <th>#Id</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map(p => {
                            return (
                                <tr key={p._id}>
                                    <td>{p._id}</td>
                                    <td>{p.title}</td>
                                    <td>{p.price}</td>
                                    <td>{p.category}</td>
                                    <td><img src={`http://localhost:5000/get-image/${p.image}`} alt={p.title} width="90" /></td>

                                    <td>
                                        <Link to={`/admin/products/${p._id}/edit`} className='btn'>Edit</Link>
                                        <button onClick={() => deleteProduct(p._id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="6">No products found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Wrapper>
    );
}

export default Products;
