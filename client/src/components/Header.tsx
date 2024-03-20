import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import { Link } from 'react-router-dom';
import { Badge, Button, IconButton } from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { colorPalette } from '../theme';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function HideAppBar(props: Props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            px: '2rem',
            width: '100%',
            height: '4rem',
            textTransform: 'inherit',
          }}
        >
          <Toolbar
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography variant="h6" component="div">
                Dress 360
              </Typography>
            </Box>
            <Box
              sx={{
                fontSize: '1.3rem',
                color: colorPalette.body[500],
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                sx={{
                  color: colorPalette.body[500],
                  textTransform: 'inherit',
                  fontSize: '1rem',
                }}
                variant="text"
                size="large"
              >
                Link
              </Button>
              <Button
                sx={{
                  color: colorPalette.body[500],
                  textTransform: 'inherit',
                  fontSize: '1rem',
                }}
                variant="text"
                size="large"
              >
                Link
              </Button>
              <Button
                sx={{
                  color: colorPalette.body[500],
                  textTransform: 'inherit',
                  fontSize: '1rem',
                }}
                variant="text"
                size="large"
              >
                Link
              </Button>
            </Box>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button
                sx={{ color: colorPalette.body[500], textTransform: 'inherit' }}
                startIcon={<AccountCircleIcon />}
                size="large"
              >
                Sign In
              </Button>
              <Badge badgeContent={4} color="secondary">
                <IconButton size="small" sx={{ color: colorPalette.body[500] }}>
                  <ShoppingBagIcon />
                </IconButton>
              </Badge>
            </Box>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </React.Fragment>
  );
}
