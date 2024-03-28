/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import FlexBetween from '../../../../components/FlexBetween';
import { colorPalette } from '../../../../theme';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DiscountList from '../Data/discountList.json';
import { commonSizes } from '../Data/sizes';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../state/store';
import { uploadImage } from '../../../../state/products/ProductSlice';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const navigate = useNavigate();

  // * states
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState();
  const [inputName, setInputName] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [inputPrice, setInputPrice] = useState(0);
  const [inputDiscount, setInputDiscount] = useState(0);
  const [inputDiscountType, setInputDiscountType] = useState('');
  const [inputSKU, setInputSKU] = useState(0);
  const [inputBarcode, setInputBarCode] = useState(0);
  const [inputQuantity, setInputQuantity] = useState(0);
  const [inputCategory, setInputCategory] = useState('');
  const [inputSize, setInputSize] = useState('');
  const [inputTags, setInputTags] = useState('');

  const inputImage = useSelector((state: RootState) => state.products.imageID);
  const loading = useSelector((state: RootState) => state.products.loading);
  const uploadState = useSelector(
    (state: RootState) => state.products.uploadState
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleFileInputChange = (e: SelectChangeEvent) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const previewFile = (file: unknown) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleImageSubmit = (e: { preventDefault: () => void }) => {
    if (!previewSource) return;
    dispatch(uploadImage(previewSource));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/product/addProduct', {
        inputName,
        inputDescription,
        inputPrice,
        inputDiscount,
        inputDiscountType,
        inputSKU,
        inputBarcode,
        inputQuantity,
        inputImage,
        inputCategory,
        inputSize,
        inputTags,
      });
      toast.success('New data has been created successfully!', {
        position: 'top-center',
      });
      navigate('/products');
      window.location.reload();
    } catch (error) {
      toast.error('Data with same date and time already exists', {
        position: 'bottom-right',
      });
      console.log(error);
    }
  };

  const handleChangeDiscountType = (e: SelectChangeEvent) => {
    setInputDiscountType(e.target.value as string);
  };

  const handleChangeCategory = (e: SelectChangeEvent) => {
    setInputCategory(e.target.value as string);
  };

  const handleChangeSize = (e: SelectChangeEvent) => {
    setInputSize(e.target.value as string);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={submitHandler}>
        <Box width={`100%`} sx={{ margin: '1rem 0' }}>
          <FlexBetween
            sx={{
              boxShadow: 2,
              padding: '1rem',
              marginBottom: '2rem',
            }}
            flexDirection={{ xs: 'row' }}
          >
            <Box>
              <Typography variant="h3">Add New Product</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '1rem',
              }}
            >
              <Button
                variant="outlined"
                color="error"
                type="reset"
                onClick={() => navigate('/products')}
              >
                Discard Product
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  background: colorPalette.accent1[500],
                  color: colorPalette.base[500],
                  '&:hover': {
                    background: colorPalette.accent1[400],
                  },
                }}
              >
                Add Product
              </Button>
            </Box>
          </FlexBetween>

          <Box
            width="100%"
            sx={{
              display: 'flex',
              gap: '2rem',
              flexDirection: 'row',
              md: { flexDirection: 'column' },
            }}
          >
            {/* left side */}
            <Box
              width="100%"
              sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
            >
              {/* item 01 */}
              <Box sx={{ width: '100%', padding: '1rem 1.3rem', boxShadow: 3 }}>
                <Box
                  sx={{
                    width: '100%',
                    textAlign: 'left',
                    marginBottom: '2rem',
                  }}
                >
                  <Typography variant="h4">General Information</Typography>
                </Box>
                <Box sx={{ fontSize: '2rem' }}>
                  <Box sx={{ marginBottom: '2rem' }}>
                    <TextField
                      required
                      label="Product Name"
                      variant="filled"
                      fullWidth
                      name="inputName"
                      value={inputName}
                      onChange={(e) => setInputName(e.target.value as string)}
                    />
                  </Box>
                  <Box>
                    <TextField
                      required
                      label="Product Description"
                      multiline
                      rows={5}
                      fullWidth
                      name="inputDescription"
                      variant="filled"
                      value={inputDescription}
                      onChange={(e) =>
                        setInputDescription(e.target.value as string)
                      }
                    />
                  </Box>
                </Box>
              </Box>

              {/* item 02 */}
              <Box sx={{ width: '100%', padding: '1rem 1.3rem', boxShadow: 3 }}>
                <Box
                  sx={{
                    width: '100%',
                    textAlign: 'left',
                    marginBottom: '2rem',
                  }}
                >
                  <Typography variant="h4">Pricing</Typography>
                </Box>
                <Box sx={{ fontSize: '2rem' }}>
                  <Box sx={{ marginBottom: '2rem' }}>
                    <TextField
                      required
                      type="number"
                      label="Price"
                      value={inputPrice}
                      variant="filled"
                      fullWidth
                      name="inputPrice"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">LKR.</InputAdornment>
                        ),
                      }}
                      onChange={(e) => setInputPrice(e.target.value)}
                    />
                  </Box>
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      gap: '2rem',
                      textAlign: 'left',
                    }}
                  >
                    <TextField
                      type="number"
                      label="Discount (%)"
                      fullWidth
                      name="inputDiscount"
                      defaultValue="0"
                      variant="filled"
                      value={inputDiscount}
                      onChange={(e) => setInputDiscount(e.target.value)}
                    />
                    <FormControl fullWidth variant="filled">
                      <InputLabel id="demo-simple-select-label">
                        Discount Type
                      </InputLabel>
                      <Select
                        value={inputDiscountType}
                        label="Discount Type"
                        onChange={handleChangeDiscountType}
                      >
                        {DiscountList.map((discount) => (
                          <MenuItem key={discount.key} value={discount.type}>
                            {discount.type}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                </Box>
              </Box>

              {/* item 03 */}
              <Box sx={{ width: '100%', padding: '1rem 1.3rem', boxShadow: 3 }}>
                <Box
                  sx={{
                    width: '100%',
                    textAlign: 'left',
                    marginBottom: '2rem',
                  }}
                >
                  <Typography variant="h4">Inventory</Typography>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    fontSize: '2rem',
                    display: 'flex',
                    gap: '1rem',
                  }}
                >
                  <Box>
                    <TextField
                      required
                      type="number"
                      label="SKU"
                      variant="filled"
                      fullWidth
                      name="inputSKU"
                      value={inputSKU}
                      onChange={(e) => setInputSKU(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <TextField
                      required
                      type="number"
                      label="Barcode"
                      fullWidth
                      name="inputBarcode"
                      variant="filled"
                      value={inputBarcode}
                      onChange={(e) => setInputBarCode(e.target.value)}
                    />
                  </Box>
                  <Box>
                    <TextField
                      type="number"
                      required
                      label="Quantity"
                      fullWidth
                      name="inputQuantity"
                      variant="filled"
                      value={inputQuantity}
                      onChange={(e) => setInputQuantity(e.target.value)}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* right side */}
            <Box
              width="60%"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                textAlign: 'left',
              }}
            >
              {/* item 01 */}
              <Box sx={{ width: '100%', padding: '1rem 1.3rem', boxShadow: 3 }}>
                <Box
                  sx={{
                    width: '100%',
                    textAlign: 'left',
                    marginBottom: '1rem',
                  }}
                >
                  <Typography variant="h4">Product Media</Typography>
                  <Typography variant="subtitle1">Product Image</Typography>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    fontSize: '2rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '1rem',
                    flexDirection: 'column',
                  }}
                >
                  {previewSource ? (
                    <Box>
                      <Box
                        sx={{
                          width: '100%',
                          position: 'relative',
                          marginBottom: '1rem',
                        }}
                      >
                        <img
                          src={previewSource}
                          alt="img"
                          width="200"
                          height="200"
                          style={{ objectFit: 'contain' }}
                        />
                        {!uploadState && (
                          <IconButton
                            aria-label="delete"
                            size="small"
                            sx={{
                              color: colorPalette.base[500],
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              zIndex: 100,
                              background: '#f50057',
                              '&:hover': {
                                background: '#f06292',
                              },
                            }}
                            onClick={() => {
                              setPreviewSource(null);
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: '1rem' }} />
                          </IconButton>
                        )}
                      </Box>
                      {uploadState ? (
                        <Box
                          sx={{
                            width: '100%',
                            height: 'auto',
                            fontSize: '3rem',
                          }}
                        >
                          <Button
                            variant="outlined"
                            startIcon={<CloudDoneIcon />}
                          >
                            Image Uploaded
                          </Button>
                        </Box>
                      ) : loading ? (
                        <CircularProgress
                          sx={{
                            color: colorPalette.accent1[500],
                            fontSize: '5rem',
                          }}
                        />
                      ) : (
                        <Button
                          component="label"
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                          sx={{
                            background: colorPalette.accent1[500],
                            color: colorPalette.base[500],
                            '&:hover': {
                              background: colorPalette.accent1[400],
                            },
                          }}
                          onClick={handleImageSubmit}
                        >
                          Upload image
                        </Button>
                      )}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        width: '100px',
                        height: '100px',
                        borderStyle: 'dashed',
                        borderWidth: '1px',
                        borderColor: colorPalette.accent1[400],
                        overflow: 'hidden',
                      }}
                    >
                      <Button sx={{ color: colorPalette.accent1[200] }}>
                        <label htmlFor="img-upload">
                          <Box
                            sx={{
                              width: '80px',
                              height: '85px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              cursor: 'pointer',
                            }}
                          >
                            <AddAPhotoIcon sx={{ fontSize: '2rem' }} />
                          </Box>
                        </label>
                      </Button>
                    </Box>
                  )}
                  <input
                    type="file"
                    name="image"
                    id="img-upload"
                    hidden
                    onChange={handleFileInputChange}
                    value={fileInputState}
                  />
                </Box>
              </Box>

              {/* item 02 */}
              <Box sx={{ width: '100%', padding: '1rem 1.3rem', boxShadow: 3 }}>
                <Box
                  sx={{
                    width: '100%',
                    textAlign: 'left',
                    marginBottom: '2rem',
                  }}
                >
                  <Typography variant="h4">Categories</Typography>
                </Box>
                <Box
                  sx={{
                    width: '100%',
                    fontSize: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    flexDirection: 'column',
                  }}
                >
                  {/* item sub 01 */}
                  <FormControl fullWidth variant="filled">
                    <InputLabel>Category</InputLabel>
                    <Select
                      required
                      value={inputCategory}
                      label="Category"
                      onChange={handleChangeCategory}
                    >
                      {DiscountList.map((discount) => (
                        <MenuItem key={discount.key} value={discount.type}>
                          {discount.type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* item sub 02 */}
                  <FormControl fullWidth variant="filled">
                    <InputLabel>Size</InputLabel>
                    <Select
                      required
                      value={inputSize}
                      label="Size"
                      onChange={handleChangeSize}
                    >
                      {commonSizes.map((size) => (
                        <MenuItem key={size.key} value={size.size}>
                          {size.size}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* item sub 03 */}
                  <Box sx={{ width: '100%' }}>
                    <TextField
                      id="filled-basic"
                      label="Tags"
                      variant="filled"
                      fullWidth
                      name="inputTags"
                      value={inputTags}
                      onChange={(e) => setInputTags(e.target.value as string)}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
