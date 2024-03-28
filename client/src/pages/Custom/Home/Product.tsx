import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../../../Context/ShopContext';
import Breadcrums from '../../../components/Breadcrums/Breadcrums';
import ProductDisplay from '../../../components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../../../components/DescriptionBox/DescriptionBox';
// import RelatedProduct from '../../../components/RelatedProduct/RelatedProduct';
// import data_product, { Product } from '../../../assets/dhananjaya/Data'; // Assuming you have a Product type defined

function Product() {
    const { all_product } = useContext<ContextValue >(ShopContext);
    const { productId } = useParams<{ productId: string }>(); // Assuming productId is of string type

    const product: Product | undefined = all_product.find((e) => e.id === Number(productId));

    return (
        <div>
            {product && <Breadcrums product={product} />}
            {product && <ProductDisplay product={product} />}
            <DescriptionBox />
            {/* <RelatedProduct /> */}
        </div>
    );
}

export default Product;
