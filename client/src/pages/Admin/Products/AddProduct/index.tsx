import {
  Box,
  Button,
  FormControl,
  IconButton,
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

export default function AddProduct() {
  const [discount, setDiscount] = useState('');
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState();
  const [selectedFile, setSelectedFile] = useState();

  const handleChange = (event: SelectChangeEvent) => {
    setDiscount(event.target.value as string);
  };

  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e: any) => {
    e.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage: never) => {
    console.log(base64EncodedImage);
    try {
      const res = await axios.post(
        'http://localhost:4000/api/product/uploadImage',
        {
          data: base64EncodedImage,
        },
        {
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      const img = res.data;
      localStorage.setItem('imgId', img.public_id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
          <Button variant="outlined" color="error">
            Discard Product
          </Button>
          <Button
            variant="contained"
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

      <form>
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
                    id="filled-basic"
                    label="Product Name"
                    variant="filled"
                    fullWidth
                    name="name"
                  />
                </Box>
                <Box>
                  <TextField
                    id="standard-multiline-static"
                    label="Product Description"
                    multiline
                    rows={5}
                    fullWidth
                    name="description"
                    variant="filled"
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
                    type="number"
                    id="filled-basic"
                    label="Base Price"
                    variant="filled"
                    fullWidth
                    name="price"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">LKR.</InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box sx={{ width: '100%', display: 'flex', gap: '2rem' }}>
                  <TextField
                    id="standard-multiline-static"
                    label="Discount (%)"
                    fullWidth
                    name="discount"
                    defaultValue="0%"
                    variant="filled"
                  />
                  <FormControl fullWidth variant="filled">
                    <InputLabel id="demo-simple-select-label">
                      Discount Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={discount}
                      label="Discount Type"
                      onChange={handleChange}
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
                    id="filled-basic"
                    label="Product Name"
                    variant="filled"
                    fullWidth
                    name="name"
                  />
                </Box>
                <Box>
                  <TextField
                    id="standard-multiline-static"
                    label="Product Description"
                    fullWidth
                    name="description"
                    variant="filled"
                  />
                </Box>
                <Box>
                  <TextField
                    type="number"
                    id="standard-multiline-static"
                    label="Quantity"
                    fullWidth
                    name="quantity"
                    variant="filled"
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* right side */}
          <Box
            width="60%"
            sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
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
                        marginBottom: '1.5rem',
                      }}
                    >
                      <img
                        src={previewSource}
                        alt="img"
                        width="200"
                        height="200"
                        style={{ objectFit: 'contain' }}
                      />
                      <IconButton
                        aria-label="delete"
                        size="small"
                        sx={{
                          color: colorPalette.accent2[100],
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
                        <CloseIcon sx={{ fontSize: '1.2rem' }} />
                      </IconButton>
                    </Box>
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
                      onClick={handleSubmitFile}
                    >
                      Upload image
                    </Button>
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
                      <label for="img-upload">
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
                  <InputLabel id="demo-simple-select-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={discount}
                    label="Category"
                    onChange={handleChange}
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
                  <InputLabel id="demo-simple-select-label">Size</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={discount}
                    label="Size"
                    onChange={handleChange}
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
                    name="tags"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  );
}
