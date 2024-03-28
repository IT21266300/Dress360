/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

const LayoutCustomer = () => {
  return (
    <Box minWidth="100%" height="100%">
      <Header />
      {/* <Box sx={{ m: '3rem' }}>
      </Box> */}
        <Outlet />
    </Box>
  );
};

export default LayoutCustomer;
