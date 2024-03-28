import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { colorPalette } from '../../../theme';
import { Typography } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface DeleteAlertBoxProps {
  openAlert: boolean;
  handleCloseAlert: () => void;
  handleDelete: () => void;
}

export default function DeleteAlertBox({
  openAlert,
  handleCloseAlert,
  handleDelete,
}: DeleteAlertBoxProps) {
  return (
    <Dialog
      open={openAlert}
      onClose={handleCloseAlert}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h5" sx={{ color: '#ff1744' }}>
          {'Permanently Delete Data..?'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="body1">
            This action will permanently delete the selected data. Are you sure
            you want to proceed?
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCloseAlert}
          sx={{ color: colorPalette.base[900] }}
        >
          Discard
        </Button>
        <Button onClick={handleDelete} autoFocus sx={{ color: '#ff1744' }}>
          Yes, delete it
        </Button>
      </DialogActions>
    </Dialog>
  );
}
