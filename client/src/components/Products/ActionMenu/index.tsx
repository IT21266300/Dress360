import { Menu, MenuItem } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { colorPalette } from '../../../theme';

export default function ActionMenu({ anchorEl, open, handleClose }) {
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
        onClick={handleClose}
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
        onClick={handleClose}
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
        onClick={handleClose}
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
