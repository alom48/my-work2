import React from 'react'
import Products from './admin/Products'
import Main from './main/Main'
import { BrowserRouter, Route } from 'react-router-dom'
import ProductCreate from './admin/ProductCreate'
import ProductEdit from './admin/ProductEdit'
import ProductViews from './user/ProductViews';
import ProductList from './user/Productlist'
import Cart from './user/Cart'
import Cheakout from './user/Cheakout'
import Order from './user/Order'

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path='/' exact component={Main} />
        <Route path='/admin/products' exact component={Products} />
        <Route path='/admin/products/create' exact component={ProductCreate} />
        <Route path='/admin/products/:id/edit' exact component={ProductEdit} />
        <Route path='/user/products/:id/view' exact component={ProductViews} />
        <Route path='/user/productlist' exact component={ProductList} />
        <Route path='/user/cart' exact component={Cart} />
        <Route path='/user/Cheakout' exact component={Cheakout} />
        <Route path='/user/Order' exact component={Order} />

      </BrowserRouter>
    </div>
  )
}
