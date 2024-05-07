/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Admin/Drawer';

const LayoutAdmin = () => {
  // const isDesktop = useMediaQuery('(min-width: 600px)');
  return (
    <Box
      minWidth="100%"
      height="100%"
      sx={{ display: 'flex', justifyContent: 'center' }}
    >
      <Sidebar />
      <Box
        sx={{
          width: '100%',
          // margin: '3rem',
          padding: '5rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default LayoutAdmin;
