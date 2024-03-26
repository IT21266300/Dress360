import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../state/store';
import { fetchProducts } from '../../../state/products/ProductSlice';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { colorPalette } from '../../../theme';
import {
  DataGrid,
  GridToolbar,
  GridToolbarContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  GridColDef,
} from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import FlexBetween from '../../../components/FlexBetween';
import Search from './autocomplete';
import ProductsLoader from './Preloaders/productsLoader';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const navigate = useNavigate();

  const productData = useSelector(
    (state: RootState) => state.products.productData
  );
  const productCount = useSelector(
    (state: RootState) => state.products.productCount
  );
  const loading = useSelector((state: RootState) => state.products.loading);
  const dispatch = useDispatch<AppDispatch>();

  interface Product {
    name: string;
    description: string;
    image: [];
    price: number;
    category: string;
  }

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(loading);
  console.log(productData);

  const productColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.3,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'image',
      headerName: 'Product Image',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'name',
      headerName: 'Product Name',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'price',
      headerName: 'Product Price',
      flex: 1,
      // valueFormatter: (params) => params.value.toFixed(2),
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'category',
      headerName: 'Product Category',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'action',
      headerName: 'Actions',
      flex: 0.5,
      sortable: false,
      filterable: false,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box>
          <Button
            sx={{
              background: colorPalette.accent1[500],
              color: colorPalette.base[500],
              '&:hover': {
                background: colorPalette.accent1[400],
              },
            }}
          >
            Actions
          </Button>
        </Box>
      ),
    },
  ];

  const productRows = productData.map((product: Product, index) => ({
    id: index + 1,
    image: product.image,
    name: product.name,
    price: product.price,
    category: product.category,
  }));

  return loading ? (
    <ProductsLoader />
  ) : (
    <Box width="100%" sx={{ margin: '1rem 0' }}>
      <Box
        sx={{
          marginBottom: '2rem',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="h2">Product List</Typography>
          <Typography variant="body1">
            The product list effectively dictates product presentation and
            provides space to list your products and offering in the most
            appealing way.
          </Typography>
        </Box>
        <Box>
          <Button
            size="large"
            sx={{
              background: colorPalette.accent1[500],
              color: colorPalette.base[500],
              '&:hover': {
                background: colorPalette.accent1[400],
              },
            }}
            startIcon={<AddIcon />}
            onClick={() => {
              navigate(`/addProduct`);
            }}
          >
            Add New Product
          </Button>
        </Box>
      </Box>
      <FlexBetween sx={{ marginBottom: '1rem' }}>
        <Box>
          <Typography variant="h4">
            {productCount} Products Available
          </Typography>
        </Box>
        <Box>
          <Search />
        </Box>
      </FlexBetween>
      <Box
        height="300"
        width="100%"
        sx={{
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .super-app-theme--header': {
            backgroundColor: colorPalette.accent1[500],
            color: colorPalette.base[500],
            fontSize: '1rem',
            fontWeight: 'bold',
            borderBottom: 'none',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: colorPalette.accent2[100],
            color: colorPalette.accent1[900],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${colorPalette.accent1[500]} !important`,
          },
        }}
      >
        <Box style={{ height: '600px', width: '100%' }}>
          <DataGrid
            rows={productRows}
            columns={productColumns}
            pageSize={10}
            sx={{ fontSize: '0.9rem' }}
            components={{
              toolbar: () => {
                return (
                  <GridToolbarContainer
                    style={{ justifyContent: 'flex-start', padding: '0.4rem' }}
                  >
                    <GridToolbarFilterButton />
                    <GridToolbarQuickFilter />
                  </GridToolbarContainer>
                );
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
