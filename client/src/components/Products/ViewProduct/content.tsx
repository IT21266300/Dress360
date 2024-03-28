import React, { useEffect, useState } from 'react';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { colorPalette } from '../../../theme';

export default function Content({ mongoID, handleClickOpenAlert, handleCloseDialog }: props) {
  const [currentImage, setCurrentImg] = useState('');
  const [itemData, setItemData] = useState();

  const getItemData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/product/getProduct/${mongoID}`
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

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '3rem',
      }}
    >
      <Box
        sx={{
          width: '50%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
        <Divider orientation="vertical" flexItem />
      </Box>
      <Box
        sx={{
          width: '50%',
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
            LKR: {itemData && itemData.price}
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
          <Typography sx={{ fontSize: '1rem' }}>Loream</Typography>
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
            Size:{' '}
          </Typography>
          <Typography sx={{ fontSize: '1.1rem' }}>
            {itemData && itemData.size}
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
            Available Stock:{' '}
          </Typography>
          <Typography sx={{ fontSize: '1rem' }}>
            {itemData && itemData.quantity} Items
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
            display: 'flex',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <Button variant="outlined">Update Product</Button>
          <Button
            onClick={handleClickOpenAlert}
            sx={{
              background: '#ff1744',
              color: colorPalette.base[500],
              '&:hover': {
                background: '#d50000',
              },
            }}
          >
            Delete Product
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
