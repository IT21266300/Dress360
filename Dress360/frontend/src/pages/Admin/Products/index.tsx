/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../States/store';
import { deleteProduct, fetchProducts } from '../../../States/ProductSlice';
import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
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
import FlexBetween from '../../../components/Admin/FlexBetween';
import Search from './autocomplete';
import ProductsLoader from './Preloaders/productsLoader';
import { useNavigate } from 'react-router-dom';
import ActionMenu from '../../../components/Admin/Products/ActionMenu';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { toast } from 'react-toastify';
import axios from 'axios';
import ActionButton from '../../../components/Admin/Products/ActionButton';
import DeleteAlertBox from '../../../components/Admin/Products/DeleteAlertBox';
import ViewProduct from '../../../components/Admin/Products/ViewProduct';
import UpdateProduct from '../../../components/Admin/Products/UpdateProduct';
import DownloadReport from '../../../components/Admin/DownloadReport';
import Dress360 from '../../../assets/Dress360.png';
import Sign1 from '../../../assets/signs/sign1.png';
import Sign2 from '../../../assets/signs/sign2.png';
import Sign3 from '../../../assets/signs/sign3.png';
import BusinessIcon from '@mui/icons-material/Business';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { Type } from 'react-toastify/dist/utils';

export default function Products() {
  const navigate = useNavigate();

  const pdfRef = useRef();

  const [selectedRow, setSelectedRow] = useState({} as unknown);
  const [openDialog, setOpenDialog] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleClickOpenAlert = () => {
    setOpenAlert(true);
    setAnchorEl(null);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
    setAnchorEl(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

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
    _id: string;
    mongoID: string;
    image: string;
    price: number;
    barcode: number;
    category: string;
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

  const [totalInventory, setTotalInventory] = useState(0);

  useEffect(() => {
    let total = 0;
    productData.forEach((product) => {
      total += product.totalQuantity;
    });
    setTotalInventory(total);
  }, [productData]);

  const productColumns: GridColDef[] = [
    {
      field: 'id',
      headerName: '#',
      flex: 0.3,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'mongoID',
      headerName: 'MID',
      flex: 0,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'name',
      headerName: 'Product Name',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'brand',
      headerName: 'Product Brand',
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
      field: 'totalQuantity',
      headerName: 'Total Quantity',
      flex: 0.7,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'price',
      headerName: 'Product Price',
      flex: 1,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'barcode',
      headerName: 'Bar Code',
      flex: 0.7,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'sku',
      headerName: 'SKU',
      flex: 0.5,
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'action',
      headerName: 'Actions',
      flex: 0.7,
      sortable: false,
      filterable: false,
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box>
          <ActionButton handleClick={handleClick} params={params} open={open} />
        </Box>
      ),
    },
  ];

  const productRows = productData.map((product: Product, index) => ({
    id: index + 1,
    mongoID: product._id,
    name: product.name,
    brand: product.brand,
    category: product.category,
    totalQuantity: product.totalQuantity,
    price: product.price,
    barcode: product.barcode,
    sku: product.sku,
  }));

  // handle actions here
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, params) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(params.row);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    setAnchorEl(null);
    setOpenAlert(false);
    try {
      await dispatch(deleteProduct(selectedRow.mongoID)).unwrap();
      toast.success('Data successfully deleted!', { position: 'top-center' });
      window.location.reload();
    } catch (err) {
      toast.success(err.message, { position: 'bottom-right' });
      console.log(err);
    }
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
          <DownloadReport pdfRef={pdfRef} />
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
            initialState={{
              columns: {
                columnVisibilityModel: {
                  mongoID: false,
                },
              },
              // sorting: { sortModel: [{field: 'date', sort: 'asc'}]}
            }}
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
        handleClickOpenAlert={handleClickOpenAlert}
        handleClickOpenDialog={handleClickOpenDialog}
        handleCloseDialog={handleCloseDialog}
        mongoID={selectedRow.mongoID}
      />

      <ViewProduct
        handleClickOpenDialog={handleClickOpenDialog}
        handleCloseDialog={handleCloseDialog}
        openDialog={openDialog}
        mongoID={selectedRow.mongoID}
        handleClickOpenAlert={handleClickOpenAlert}
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        handleDelete={handleDelete}
      />

      <DeleteAlertBox
        openAlert={openAlert}
        handleCloseAlert={handleCloseAlert}
        handleDelete={handleDelete}
      />

      {/* report template */}
        <Box sx={{width: '70%', height: '0', overflow: 'hidden', position: 'absolute'}}>
          <Box ref={pdfRef} sx={{ padding: '0 3rem'}}>
            <Box sx={{ borderTop: '10px solid #52b788', padding: '2rem 0' }}>
              {/* heading */}
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'self-start',
                  marginBottom: '1rem',
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <img src={Dress360} alt="logo" width="150px" height="150px" />
                </Box>
                <Box
                  sx={{
                    width: '40%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <Box sx={{ width: '100%', display: 'flex', gap: '1rem' }}>
                    <Box sx={{ color: '#52b788' }}>
                      <BusinessIcon />
                    </Box>
                    <Box>
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                        Dress360 Group (PVT) LTD
                      </Typography>
                      <Typography variant="h5">No. 12/345, High Forest St.</Typography>
                      <Typography variant="h5">Nuwara-Eliya</Typography>
                      <Typography variant="h5">Sri Lanka</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ width: '100%', display: 'flex', gap: '1rem' }}>
                    <Box sx={{ color: '#52b788' }}>
                      <LocalPhoneIcon />
                    </Box>
                    <Typography variant="h5">+(94) 522 344 556</Typography>
                  </Box>
                  <Box sx={{ width: '100%', display: 'flex', gap: '1rem' }}>
                    <Box sx={{ color: '#52b788' }}>
                      <AlternateEmailIcon />
                    </Box>
                    <Typography variant="h5">dress360@mail.com</Typography>
                  </Box>
                </Box>
                <Box></Box>
              </Box>

              {/* title */}
              <Box
                sx={{
                  paddingBottom: '1rem',
                  margin: '2rem 0',
                  borderBottom: '2px solid #b0b0b0',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{ fontWeight: 'bold', fontSize: '2rem', width: '100%' }}
                >
                  Inventory List
                </Typography>
                <Box
                  sx={{
                    width: '60%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h5">
                    Date:{' '}
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(new Date())}
                  </Typography>
                  <Typography variant="h5">
                    Report Number: {Math.floor(Math.random() * 90000) + 10000}
                  </Typography>
                </Box>
              </Box>

              {/* summary data */}
              <Box
                sx={{
                  paddingBottom: '1rem',
                  margin: '2rem 0',
                  width: '100%',
                  display: 'flex',
                  gap: '1.5rem',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    gap: '0.6rem',
                    color: '#fff',
                    background: '#333333',
                    padding: '0.8rem 1rem',
                    borderRadius: '10px',
                  }}
                >
                  <Typography variant="h5">Total Products: </Typography>
                  <Typography variant="h5">{productCount}</Typography>
                </Box>
              </Box>

              {/* content */}
              <Box>
                <table className="table">
                  <thead
                    style={{
                      background: '#52b788',
                      color: '#fff',
                      fontSize: '0.8rem',
                    }}
                  >
                    <tr>
                      {productColumns.map(
                        (col, index) =>
                          col.headerName !== 'MID' &&
                          col.headerName !== 'Actions' && (
                            <th key={index} style={{ padding: '1rem 0.5rem' }}>
                              {col.headerName}
                            </th>
                          )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {productData.map((row, index) => (
                      <tr key={index}>
                        <th
                          style={{ padding: '0.8rem 0.5rem', fontSize: '0.9rem' }}
                          scope="row"
                        >
                          {index + 1}
                        </th>
                        <td style={{ padding: '0.8rem 0.5rem', fontSize: '0.9rem' }}>
                          {row.name}
                        </td>
                        <td style={{ padding: '0.8rem 0.5rem', fontSize: '0.9rem' }}>
                          {row.brand}
                        </td>
                        <td style={{ padding: '0.8rem 0.5rem', fontSize: '0.9rem' }}>
                          {row.category}
                        </td>
                        <td style={{ padding: '0.8rem 0.5rem', fontSize: '0.9rem' }}>
                          {row.totalQuantity}
                        </td>
                        <td style={{ padding: '0.8rem 0.5rem', fontSize: '0.9rem' }}>
                          {row.price.toFixed(2)}
                        </td>
                        <td style={{ padding: '0.8rem 0.5rem', fontSize: '0.9rem' }}>
                          {row.barcode}
                        </td>
                        <td style={{ padding: '0.8rem 0.5rem', fontSize: '0.9rem' }}>
                          {row.sku}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>

              {/* footer */}
              <Box>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Box sx={{ width: '100%' }}>
                      <img src={Sign1} alt="logo" width="100px" height="100px" />
                    </Box>
                    <Box>
                      <Typography>Mr. R.L.R Fernando</Typography>
                      <Typography>Inventory Manager</Typography>
                      <Typography>Dress360 Group (PVT) LTD</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Box sx={{ width: '100%' }}>
                      <img src={Sign2} alt="logo" width="100px" height="100px" />
                    </Box>
                    <Box>
                      <Typography>Ms. W.E.S.D Jonson </Typography>
                      <Typography>Vice Chairman (Finance)</Typography>
                      <Typography>Dress360 Group (PVT) LTD</Typography>
                    </Box>
                  </Box>
                  <Box>
                    <Box sx={{ width: '100%' }}>
                      <img src={Sign3} alt="logo" width="100px" height="100px" />
                    </Box>
                    <Box>
                      <Typography>Mr. W.E.S.D Rahul</Typography>
                      <Typography>CEO</Typography>
                      <Typography>Dress360 Group (PVT) LTD</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    marginTop: '2rem',
                    borderTop: '1px solid #5c5c5c',
                    padding: '1rem 0',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Issued Date:{' '}
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(new Date())}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    Document Id: {Math.floor(Math.random() * 90000) + 10000}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
    </Box>
  );
}
