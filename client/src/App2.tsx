
import './App2.css';
import Navbar from './components/Navbar/Navbar';
import Shop from './pages/customerLayouts/Shop';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import React from 'react';
import ShopCategory from './pages/customerLayouts/ShopCategory';
import Product from  './pages/customerLayouts/Product';
import LoggingSignup from './pages/customerLayouts/LoggingSignup';
import Cart from './pages/customerLayouts/Cart';
import Footer from './components/Footer/Footer';
import men_banner from './assets/dhananjaya/banner_mens.png';
import women_banner from './assets/dhananjaya/banner_women.png';
import kid_banner from './assets/dhananjaya/banner_kids.png';




function App() {
  return (

    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Shop/>}/>
        <Route path="/mens" element={<ShopCategory banner={men_banner} category="men"/>}/>
        <Route path="/womens" element={<ShopCategory banner={women_banner} category="women"/>}/>
        <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid"/>}/>
        <Route path='/product' element={<Product/>}>
          <Route path=":productId" element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/loging' element={<LoggingSignup/>}/>

      </Routes>
      <Footer/>
      </BrowserRouter>
    
    
    </div>
  );
}


export default App;
