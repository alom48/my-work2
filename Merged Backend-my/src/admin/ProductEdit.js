import React, { useState, useEffect } from 'react';
import Wrapper from './Wrapper';
import { useHistory } from 'react-router-dom';

function ProductEdit(props) {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        category: '',
        details: '',
        image: null
    });
    const [message, setMessage] = useState('');
    const history = useHistory();

    useEffect(() => {
        fetch(`http://localhost:5000/get-product/${props.match.params.id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch product');
                }
                return res.json();
            })
            .then(product => {
                setFormData({
                    title: product.title || '',
                    price: product.price || '',
                    category: product.category || '',
                    details: product.details || '',
                    image: null
                });
            })
            .catch(error => console.error('Error fetching product:', error));
    }, [props.match.params.id]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            image: e.target.files[0]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('details', formData.details);
        formDataToSend.append('image', formData.image);

        try {
            await fetch(`http://localhost:5000/update-product/${props.match.params.id}`, {
                method: 'PUT',
                body: formDataToSend
            });
            setMessage('Product updated successfully');
            setTimeout(() => {
                setMessage('');
                history.push('/admin/products');
            }, 3000); // Clear message and redirect after 3 seconds
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <Wrapper>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label>Title:</label>
                    <input type="text" name="title" defaultValue={formData.title} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" name="price" defaultValue={formData.price} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Category:</label>
                    <select name="category" defaultValue={formData.category} onChange={handleInputChange}>
                        <option value="">Select category</option>
                        <option value="laptop">Laptop</option>
                        <option value="keyboard">Keyboard</option>
                        <option value="mouse">Mouse</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Details:</label>
                    <textarea name="details" defaultValue={formData.details} onChange={handleInputChange}></textarea>
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <input type="file" name="image" onChange={handleFileChange} />
                </div>
                <button type="submit">Save Changes</button>
            </form>
            {message && <div>{message}</div>}
        </Wrapper>
    );
}

export default ProductEdit;
