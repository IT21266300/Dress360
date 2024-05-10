import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Content from './content';
import { Box } from '@mui/material';
import { colorPalette } from '../../../../theme';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ViewProduct({
  handleClickOpenDialog,
  handleCloseDialog,
  openDialog,
  mongoID,
  handleClickOpenAlert,
}: props) {
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={openDialog}
        onClose={handleCloseDialog}
        TransitionComponent={Transition}
      >
        <Box
          sx={{
            width: '100%',
            height: '100px',
            background: colorPalette.accent1[500],
            padding: '0.2rem 2rem',
            color: colorPalette.base[500],
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseDialog}
            aria-label="close"
          >
            <CloseIcon sx={{ fontSize: '1.5rem' }} />
          </IconButton>
        </Box>
        <Content
          mongoID={mongoID}
          handleClickOpenAlert={handleClickOpenAlert}
          handleCloseDialog={handleCloseDialog}
        />
      </Dialog>
    </React.Fragment>
  );
}
