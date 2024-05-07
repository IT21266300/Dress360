import { Box, Button } from '@mui/material'
import React from 'react'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { colorPalette } from '../../../theme';
import puppeteer from 'puppeteer';
import fs from 'fs-extra';

export default function DownloadReport() {

  return (
    <Box>
        <Button
            variant="contained"
            startIcon={<DownloadForOfflineIcon />}
            size="large"
            sx={{
              background: colorPalette.accent1[500],
              color: colorPalette.base[500],
              '&:hover': {
                background: colorPalette.accent1[400],
              },
            }}
            // onClick={downloadReport}
          >
            Download Product List
          </Button>
    </Box>
  )
}
