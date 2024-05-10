import { Menu, MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { colorPalette } from '../../../../theme';
import { useNavigate } from 'react-router-dom';

interface Props {
  anchorEl: HTMLElement | null;
  open: boolean;
  handleClose: () => void;
  handleClickOpenAlert: () => void;
}

export default function ActionMenu({ anchorEl, open, handleClose, handleClickOpenAlert, mongoID, handleClickOpenDialog, handleCloseDialog }: Props) {
  const navigate = useNavigate();
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem
        onClick={handleClickOpenDialog}
        sx={{
          gap: '0.5rem',
          fontSize: '0.9rem',
          color: colorPalette.accent2[400],
        }}
      >
        <VisibilityIcon />
        View
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate(`/updateProduct?mongoID=${mongoID}`)
        }}
        sx={{
          gap: '0.5rem',
          fontSize: '0.9rem',
          color: colorPalette.accent2[400],
        }}
      >
        <EditNoteIcon />
        Update
      </MenuItem>
      <MenuItem
        onClick={handleClickOpenAlert}
        sx={{
          gap: '0.5rem',
          fontSize: '0.9rem',
          color: '#ff1744',
        }}
      >
        <DeleteIcon />
        Delete
      </MenuItem>
    </Menu>
  );
}