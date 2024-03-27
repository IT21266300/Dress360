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
import ActionMenu from '../../../components/Products/ActionMenu';

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
    image: string;
    price: number;
    barcode: number;
    category: string;
    size: string;
    quantity: number;
    discount: number;
    discountType: string;
    sku: number;
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
      field: 'name',
      headerName: 'Product Name',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'category',
      headerName: 'Product Category',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'price',
      headerName: 'Product Price',
      flex: 0.8,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'barcode',
      headerName: 'Bar Code',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'sku',
      headerName: 'SKU',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'size',
      headerName: 'Size',
      flex: 0.6,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      flex: 0.6,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'action',
      headerName: 'Actions',
      flex: 0.6,
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
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Actions
          </Button>
        </Box>
      ),
    },
  ];

  const productRows = productData.map((product: Product, index) => ({
    id: index + 1,
    name: product.name,
    category: product.category,
    price: product.price,
    barcode: product.barcode,
    sku: product.sku,
    size: product.size,
    quantity: product.quantity,
  }));

  // handle actions here
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            autoHeight
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
      <ActionMenu
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
        // handleUpdate={handleUpdate}
        // funcs={'Transport'}
        // handleClickOpenAlert={handleClickOpenAlert}
      />
    </Box>
  );
}
