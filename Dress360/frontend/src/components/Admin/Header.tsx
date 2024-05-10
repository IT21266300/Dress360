import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fade from '@mui/material/Fade';
import { colorPalette } from '../../theme';
import AutoComplete from './autocomplete';
import {
  Badge,
  BadgeProps,
  Button,
  IconButton,
  Link,
  styled,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function ScrollTop(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

const actions = [
  { icon: <FileCopyIcon />, name: 'Copy' },
  { icon: <SaveIcon />, name: 'Save' },
  { icon: <PrintIcon />, name: 'Print' },
  { icon: <ShareIcon />, name: 'Share' },
];

const navMenu = [
  {
    key: 1,
    name: 'Home',
  },
  {
    key: 2,
    name: 'Men',
  },
  {
    key: 3,
    name: 'Women',
  },
  {
    key: 4,
    name: 'Kids & Baby',
  },
  {
    key: 5,
    name: 'Beauty & Health',
  },
];

export default function BackToTop(props: Props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        sx={{
          background: colorPalette.base[500],
          color: colorPalette.accent2[500],
        }}
      >
        <Toolbar
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem 0',
          }}
        >
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ width: '40%' }}>
              <img src="" width="50px" height="50px" />
            </Box>
            <Box sx={{ width: '100%' }}>
              <AutoComplete sx={{ width: '100%' }} />
            </Box>
            <Box sx={{ width: '40%' }}>
              <Typography
                variant="h6"
                sx={{ color: colorPalette.accent2[200] }}
              >
                Login/Sign up
              </Typography>
              <Link href="/" sx={{ fontSize: '1rem', textDecoration: 'none' }}>
                My Account
              </Link>
            </Box>
            <Box sx={{ width: '20%' }}>
              <IconButton aria-label="cart">
                <Badge badgeContent={4} sx={{ color: '#ff1744' }}>
                  <ShoppingCartIcon sx={{ color: colorPalette.accent1[500] }} />
                </Badge>
              </IconButton>
            </Box>
          </Box>
          <Box
            width="100%"
            sx={{
              margin: '0.7rem 0',
              height: '2px',
              background: colorPalette.accent1[500],
            }}
          ></Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                width: '60%',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              {navMenu.map((action) => (
                <Button
                  key={action.key}
                  endIcon={action.name !== 'Home' && <KeyboardArrowDownIcon />}
                  sx={{ color: colorPalette.accent2[300] }}
                >
                  {action.name}
                </Button>
              ))}
              <Button sx={{ color: colorPalette.accent2[300] }}>
                New Arrivals
              </Button>
            </Box>
            <Box
              sx={{
                width: '30%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
              }}
            >
              <Typography>Need Help?</Typography>
              <LocalPhoneIcon sx={{ color: colorPalette.accent1[500] }} />
              <EmailIcon sx={{ color: colorPalette.accent1[500] }} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar id="back-to-top-anchor" />
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}
