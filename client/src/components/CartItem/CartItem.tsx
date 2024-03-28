import React from 'react'
import './CartItem.css'
import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../../assets/dhananjaya/cart_cross_icon.png'


const CartItem = () => {
const{getTotalCartAmount,all_product,cartItem,removeFromCart}=useContext(ShopContext);

  return (
    <div className='cartitem'>

      <div className="cartitem-format-main">
        <p>Products</p>
        <p>Tittle</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
{all_product.map((e)=>{
if(cartItem[e.id]>0){
        return( <div>
        <div className="cartitem-format cartitem-format-main">
            <img className='cartitem-product-icon' src={e.image} alt="" />
            <p>{e.name}</p>
            <p>Rs {e.new_price}</p>
            <button className='cartitem-qty'>{cartItem[e.id]}</button>
            <p>Rs {e.new_price*cartItem[e.id]}</p>
            <img className='cartitem-remove-icon' src={remove_icon} alt="" onClick={()=>{removeFromCart(e.id)}}/>
        </div>
        <hr />
      </div>)
    }
    return null;
})}
<div className="cartitem-down">
    <div className="cartitem-total">
        <h1>Cart Total</h1>
        <div>
            <div className="cartitem-total-item">
                <p>Subtotal</p>
                <p>Rs {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cartitem-total-item'>
            <p>Shipping Fee</p>
            <p>Free</p>
            </div>
            <hr />
            <div className='cartitem-total-item'>
                <h3>Total</h3>
                <h3>Rs {getTotalCartAmount()}</h3>
            </div>



        </div>
        <button>PROCEED TO CHECKOUT</button>

    </div>
    <div className="cartitem-promocode">
        <p>If you have a promocode,Enter it here</p>
        <div className="cartitem-promobox">
        <input type="text" placeholder='promo code' />
        <button>Submit</button>
        </div>
    </div>
</div>
        
    </div>
  )
}

export default CartItem
