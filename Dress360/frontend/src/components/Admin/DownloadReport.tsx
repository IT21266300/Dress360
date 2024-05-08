import { Box, Button } from '@mui/material';
import React, { useRef } from 'react';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { colorPalette } from '../../theme';
import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function DownloadReport({ pdfRef }) {
  // const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      pdf.addImage(
        imgData,
        'PNG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save('invoic.pdf');
    });
  };

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
        onClick={downloadPDF}
      >
        Download Product List
      </Button>
    </Box>
  );
}
