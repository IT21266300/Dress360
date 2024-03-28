import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import FlexBetween from '../../../../components/FlexBetween';
import { Box } from '@mui/material';

export default function Variants() {
  return (
    <Stack spacing={4} sx={{ margin: '1rem 0' }}>
      <FlexBetween>
        <Box>
          <Skeleton
            variant="rectangular"
            width={200}
            height={50}
            animation="wave"
          />
          <Skeleton
            variant="rectangular"
            width={800}
            height={20}
            sx={{ marginTop: '1rem' }}
            animation="wave"
          />
        </Box>
        <Skeleton
          variant="rectangular"
          width={150}
          height={50}
          animation="wave"
        />
      </FlexBetween>
      <FlexBetween>
        <Skeleton
          variant="rectangular"
          width={150}
          height={50}
          animation="wave"
        />
        <Skeleton
          variant="rectangular"
          width={250}
          height={50}
          animation="wave"
        />
      </FlexBetween>
      <Skeleton
        variant="rectangular"
        width={1000}
        height={500}
        animation="wave"
      />
    </Stack>
  );
}
