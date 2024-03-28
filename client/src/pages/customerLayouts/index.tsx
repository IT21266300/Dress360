/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

const LayoutCustomer = () => {
  return (
    <Box minWidth="100%" height="100%">
      <Header children={undefined} />
      {/* <Box sx={{ m: '3rem' }}>
      </Box> */}
      {/* <Outlet /> */}

      <Box
        sx={{
          width: '100%',
          marginTop: '4rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutCustomer;
