import { Col, Row } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductItem from '../components/ProductItem'
import { useGetProductsQuery } from '../hooks/productHooks'
import { ApiError } from '../types/ApiError'
import { getError } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../States/store'
import React from 'react'
import { fetchProducts } from '../States/ProductSlice'

export default function HomePage() {
  const { data: products, isLoading, error } = useGetProductsQuery()

  const productData = useSelector(
    (state: RootState) => state.products.productData
  );

  const loading = useSelector((state: RootState) => state.products.loading);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(productData)

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <Row>
      <Helmet>
        <title>Dress 360</title>
      </Helmet>
      {productData!.map((product, index) => (
        <Col key={index} sm={6} md={4} lg={3}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  )
}
