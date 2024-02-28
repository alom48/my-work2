import React from 'react'
import { Link } from 'react-router-dom'

function SideBar() {
    return (
        <div class="sidebar">
    <ul class="side-menu">
        <li><Link to="/admin/products">Products</Link></li>
        <li><Link to='/admin/products/create'>Add Product</Link></li>
    </ul>
</div>
    )
}

export default SideBar
