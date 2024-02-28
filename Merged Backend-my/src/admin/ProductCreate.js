import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Wrapper from './Wrapper';
import axios from 'axios';

function ProductCreate() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [details, setDetails] = useState('');
    const [image, setImage] = useState('');
    const [allImage, setAllImage] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const history = useHistory();

    useEffect(() => {
        getImage();
    }, []);

    const submitImage = async (formData) => {
        try {
            const result = await axios.post(
                "http://localhost:5000/upload-image",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log(result.data);
            setSuccessMessage('Product uploaded successfully');
            setTimeout(() => {
                setSuccessMessage('');
                // Navigate to the product page after 2 seconds
                history.push('/admin/products');
            }, 2000);
            getImage(); // Refresh the image list
        } catch (error) {
            console.error(error);
        }
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "title") {
            setTitle(value);
        } else if (name === "price") {
            setPrice(value);
        } else if (name === "category") {
            setCategory(value);
        } else if (name === "details") {
            setDetails(value);
        } else if (name === "image") {
            setImage(e.target.files[0]);
        }
    };

    const getImage = async () => {
        try {
            const result = await axios.get("http://localhost:5000/get-image");
            setAllImage(result.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("price", price);
        formData.append("category", category);
        formData.append("details", details);
        submitImage(formData);
    };

    const categories = ['laptop', 'keyboard', 'mouse'];

    return (
        <Wrapper>
            <div className="container">
                <h2>Add Product</h2>

                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="form-group">
                        <label>Title:</label>
                        <input type="text" className="form-control" name="title" onChange={onInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Price:</label>
                        <input type="number" className="form-control" name="price" onChange={onInputChange} />
                    </div>
                    <div className="form-group">
                        <label>Category:</label>
                        <select className="form-control" name="category" value={category} onChange={onInputChange}>
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Details:</label>
                        <textarea className="form-control" name="details" onChange={onInputChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label>Image:</label>
                        <input type="file" className="form-control-file" name="image" onChange={onInputChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
            </div>
        </Wrapper>
    );
}

export default ProductCreate;
