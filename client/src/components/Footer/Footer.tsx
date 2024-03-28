import React from 'react'
import './Footer.css'
import footer_logo from '../../assets/dhananjaya/logo_big.png'
import instagram_icon from '../../assets/dhananjaya/instagram_icon.png'
import pintarest_icon from '../../assets/dhananjaya/pintester_icon.png'
import whatsapp_icon from '../../assets/dhananjaya/whatsapp_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-logo">
            <img src={footer_logo} alt="" />
            <p>Dress360</p>

        </div>
        <ul className="footer-links">
            <li>Company</li>
            <li>Product</li>
            <li>Offices</li>
            <li>About</li>
            <li>Conatact</li>
        </ul>
        <div className="footer-social-icon">
            <div className="footer-icons-container">
                <img src={instagram_icon} alt="" />

            </div>
            <div className="footer-icons-container">
                <img src={pintarest_icon} alt="" />

            </div>
            <div className="footer-icons-container">
                <img src={whatsapp_icon} alt="" />

            </div>
        </div>
        <div className="footer-copyright">
            <hr />
            <p>Copyright @ 2023 - All Right Reserved</p>
        </div>
      
    </div>
  )
}

export default Footer
