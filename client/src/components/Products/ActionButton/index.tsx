import { Button, ButtonProps } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { colorPalette } from '../../../theme';


export default function ActionButton({
  handleClick,
  params,
  open,
  ...buttonProps
}: {
  handleClick: (event: React.SyntheticEvent, params: unknown) => void;
  params: unknown;
  open: boolean;
} & ButtonProps) {
  return (
    <Button
      id="basic-button"
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      endIcon={<ExpandMoreIcon />}
      onClick={(event) => {
        handleClick(event, params);
      }}
      sx={{
        background: colorPalette.accent1[500],
        color: colorPalette.base[500],
        '&:hover': {
          background: colorPalette.accent1[400],
        },
      }}
      {...buttonProps}
    >
      Actions
    </Button>
  );
}