import React from 'react';
import '../index.css';
import { Link } from 'react-router-dom';


function Main() {
    return (
        <div className="main-container">
            <div className="title">Welcome to my Admin site</div>
            <div className="centered-links">
                <ul>
                    <li><Link to='/' className='btn'>Order Views</Link></li>
                    <li><Link to='/admin/products' className='btn'> Product details</Link></li>
                    <li><Link to='/' className='btn'>Logout</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Main;


