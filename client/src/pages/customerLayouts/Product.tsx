import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import Breadcrums from '../../components/Breadcrums/Breadcrums';
import ProductDisplay from '../../components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../../components/DescriptionBox/DescriptionBox';
import RelatedProduct from '../../components/RelatedProduct/RelatedProduct';


function Product(){

    const {all_product}=useContext(ShopContext)
    const {productId}=useParams();

    const product=all_product.find((e)=>e.id===Number(productId));

    return(
        <div>
            <Breadcrums product={product}/>
            <ProductDisplay product={product}/>
            <DescriptionBox/>
            <RelatedProduct/>
        </div>
    )
}

export default Product
