/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Drawer';

const LayoutAdmin = () => {
  // const isDesktop = useMediaQuery('(min-width: 600px)');
  return (
    <Box minWidth="100%" height="100%" >
      <Sidebar />
      <Box sx={{ m: '3rem' }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutAdmin;
