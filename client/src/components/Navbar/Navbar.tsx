import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/dhananjaya/logo.png'
import cart_icon from '../../assets/dhananjaya/cart_icon.png'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const Navbar = () => {

    const [menu, setMenu] = useState("shop");
    const {getTotalCartItem}=useContext(ShopContext);

  return (
    <div className='navbar'>
        <div className="nav-logo">
            <img src={logo} alt="Shopper" />
            <p>Dress360</p>
        </div>
        <ul className="nav_menu">
            <li onClick={()=>{setMenu("shop")}}><Link style={{textDecoration:'none'}} to='/'>Shop</Link>  {menu==="shop"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("mens")}}> <Link style={{textDecoration:'none'}} to='/mens'>Men</Link> {menu==="mens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("womens")}}> <Link style={{textDecoration:'none'}} to='womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none'}} to='kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className="nav_logging_cart">
            <Link to='/loging'><button>Logging</button></Link>
            <Link to='/cart'><img src={cart_icon} alt="" /></Link>
            <div className="nav-cart-count">
                {getTotalCartItem()}
            </div>
        </div>
      
    </div>
  )
}

export default Navbar
