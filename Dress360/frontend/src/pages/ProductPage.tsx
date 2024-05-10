import { useContext, useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Col,
  ListGroup,
  Row,
  Modal,
} from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { useGetProductDetailsBySlugQuery } from '../hooks/productHooks';
import { Store } from '../Store';
import { ApiError } from '../types/ApiError';
import { convertProductToCartItem, getError } from '../utils';
import TryonRoom from '../components/TryonRoom/TryonRoom';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import {
  Box,
  Divider,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { colorPalette } from '../theme';

export default function ProductPage() {
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const params = useParams();
  const { slug } = params;
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsBySlugQuery(slug!);

  console.log(slug);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const navigate = useNavigate();

  const [currentImage, setCurrentImg] = useState('');
  const [itemData, setItemData] = useState({});

  const getItemData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/product/getProduct/${slug}`
      );
      setItemData(response.data.product);
      setCurrentImg(response.data.product.image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItemData();
  }, []);

  console.log(itemData);

  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product!.countInStock < quantity) {
      toast.warn('Sorry. Product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...convertProductToCartItem(product!), quantity },
    });
    toast.success('Product added to the cart');
    navigate('/cart');
  };

  const itemSizeSet = itemData.size;
  return (
    <div style={{ paddingBottom: '1rem' }}>
      <Row>
        <Col md={6}>
          <Image
            cloudName="dypvbk20u"
            publicId={currentImage}
            width="500"
            height="500"
            crop="scale"
            alt="img"
            className="rounded-full"
            sx={{ objectFit: 'content' }}
          />
          <Button className="try-on-btn" onClick={togglePopup}>
            Try on
          </Button>
          {showPopup && (
            <TryonRoom handleClose={togglePopup} show={showPopup} />
          )}
          {/* <Modal show={showPopup} onHide={togglePopup} centered> */}
          {/* <Modal.Header closeButton>
              <Modal.Title>Try on Your Clothes</Modal.Title>
            </Modal.Header> */}
          {/* <Modal.Body> */}
          {/* <TryonRoom handleClose={togglePopup} show={showPopup} /> */}
          {/* </Modal.Body> */}
          {/* </Modal> */}
        </Col>
        <Col md={6}>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.8rem',
            }}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                gap: '0.4rem',
                justifyContent: 'start',
                alignItems: 'center',
              }}
            >
              <Stack direction="row" spacing={1} sx={{ color: '#ffeb3b' }}>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </Stack>
              <Typography
                variant="subtitle1"
                sx={{
                  color: colorPalette.accent2[500],
                  fontWeight: 'bold',
                  fontSize: '0.97rem',
                }}
              >
                5.0
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: colorPalette.accent1[500],
                  fontWeight: 'bold',
                  fontSize: '0.97rem',
                }}
              >
                (3200)
              </Typography>
            </Box>
            <Box>
              <Typography variant="h2">{itemData && itemData.name}</Typography>
            </Box>
            <Box>
              <Typography
                variant="h3"
                sx={{ fontWeight: 'bold', color: colorPalette.accent2[500] }}
              >
                LKR: {itemData && itemData.price.toFixed(2)}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body1"
                sx={{ color: colorPalette.accent2[300], fontSize: '0.96rem' }}
              >
                {itemData && itemData.description}
              </Typography>
            </Box>
            <Divider sx={{ fontWeight: '2rem' }} />
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                Brand:
              </Typography>
              <Typography sx={{ fontSize: '1rem' }}>
                {itemData && itemData.brand}
              </Typography>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                Discount:{' '}
              </Typography>
              <Typography sx={{ fontSize: '1rem' }}>
                {itemData && itemData.discount}% (percent) |
              </Typography>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                Discount Type:{' '}
              </Typography>
              <Typography sx={{ fontSize: '0.9rem' }}>
                {itemData && itemData.discountType}
              </Typography>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                Category:
              </Typography>
              <Typography sx={{ fontSize: '1rem' }}>
                {itemData && itemData.category}
              </Typography>
            </Box>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                SKU:
              </Typography>
              <Typography>{itemData && itemData.sku} |</Typography>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                Barcode:
              </Typography>
              <Typography>{itemData && itemData.barcode}</Typography>
            </Box>
            <Box
              sx={{
                width: '100%',
                // display: 'flex',
                gap: '0.5rem',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                Sizes:
              </Typography>
              <TableContainer component={Paper} sx={{ width: '300px' }}>
                <Table sx={{ width: '100%' }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Size</TableCell>
                      <TableCell>Available Stock</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {itemSizeSet &&
                      itemSizeSet.map((row, index: unknown) => (
                        <TableRow
                          key={index}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.sizeType}
                          </TableCell>
                          <TableCell>{row.quantity}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Button variant="primary" style={{width: '200px'}}>
              Add to Cart
            </Button>
          </Box>
        </Col>
      </Row>
    </div>
  );
}
