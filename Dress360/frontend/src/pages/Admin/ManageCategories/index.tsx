import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { colorPalette } from '../../../theme';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../States/store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function ManageCategories() {
  const navigate = useNavigate();

  const [category, setCategory] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [size, setSize] = useState<string>('');

  const [categoryData, setCategoryData] = useState();
  const [typeData, setTypeData] = useState();
  const [sizeData, setSizeData] = useState();


// category crud
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/category/addCategory', {
        category,
      });
      toast.success('New data has been created successfully!', {
        position: 'top-center',
      });
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.error, {
        position: 'bottom-center',
      });
      console.log('eroor', error.response.data.error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/category/`);
      setCategoryData(response.data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const deleteCategory = async (id: any) => {
    await axios.delete(
      `http://localhost:4000/api/category/deleteCategory/${id}`
    );
    window.location.reload();
  };



  // discount crd
  const submitDiscountHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/category/addDiscountType', {
        type,
      });
      toast.success('New data has been created successfully!', {
        position: 'top-center',
      });
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.error, {
        position: 'bottom-center',
      });
      console.log('eroor', error.response.data.error);
    }
  };

  const fetchDiscountTypes = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/category/discountTypes`);
      setTypeData(response.data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchDiscountTypes();
  }, []);

  const deleteDiscountType = async (id: any) => {
    await axios.delete(
      `http://localhost:4000/api/category/deleteDiscountType/${id}`
    );
    window.location.reload();
  };


  // size crd
  const submitSizeHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/category/addSizeType', {
        size,
      });
      toast.success('New data has been created successfully!', {
        position: 'top-center',
      });
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.error, {
        position: 'bottom-center',
      });
      console.log('eroor', error.response.data.error);
    }
  };

  const fetchSizeTypes = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/category/sizeTypes`);
      setSizeData(response.data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    fetchSizeTypes();
  }, []);

  const deleteSizeType = async (id: any) => {
    await axios.delete(
      `http://localhost:4000/api/category/deleteSizeType/${id}`
    );
    window.location.reload();
  };


  return (
    <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-between', margin: '2rem 0', gap: '2rem'}}>

      {/* discount types */}
      <Box sx={{width: '50%'}}>
        {/* category adding form */}
        <Box sx={{marginBottom: '1.5rem'}}>
          <form onSubmit={submitDiscountHandler}>
            <Box sx={{width: '100%', display: 'flex', gap: '1.4rem'}}>
              <TextField
                id="outlined-basic"
                label="Add Discount"
                variant="outlined"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  background: colorPalette.accent1[500],
                  color: colorPalette.base[500],
                  '&:hover': {
                    background: colorPalette.accent1[400],
                  },
                }}
              >
                Add Discount Type
              </Button>
            </Box>
          </form>
        </Box>

        {/* display data */}
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                  >
                    Discount Type
                  </TableCell>
                  <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {typeData &&
                  typeData.map((row: any) => (
                    <TableRow
                      key={row.category}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.type}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => deleteDiscountType(row._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Categories */}
      <Box sx={{width: '25%'}}>
        {/* category adding form */}
        <Box sx={{marginBottom: '1.5rem'}}>
          <form onSubmit={submitHandler}>
            <Box sx={{width: '100%', display: 'flex', gap: '1.4rem'}}>
              <TextField
                id="outlined-basic"
                label="Add Category"
                variant="outlined"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  background: colorPalette.accent1[500],
                  color: colorPalette.base[500],
                  '&:hover': {
                    background: colorPalette.accent1[400],
                  },
                }}
              >
                Add Product
              </Button>
            </Box>
          </form>
        </Box>

        {/* display data */}
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                  >
                    Category Type
                  </TableCell>
                  <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categoryData &&
                  categoryData.map((row: any) => (
                    <TableRow
                      key={row.category}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.category}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => deleteCategory(row._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* size */}
      <Box sx={{width: '25%'}}>
        {/* category adding form */}
        <Box sx={{marginBottom: '1.5rem'}}>
          <form onSubmit={submitSizeHandler}>
            <Box sx={{width: '100%', display: 'flex', gap: '1.4rem'}}>
              <TextField
                id="outlined-basic"
                label="Add Size"
                variant="outlined"
                value={size}
                onChange={(e) => setSize(e.target.value)}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  background: colorPalette.accent1[500],
                  color: colorPalette.base[500],
                  '&:hover': {
                    background: colorPalette.accent1[400],
                  },
                }}
              >
                Add Size
              </Button>
            </Box>
          </form>
        </Box>

        {/* display data */}
        <Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 250 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="left"
                    sx={{ fontSize: '1rem', fontWeight: 'bold' }}
                  >
                    Size Type
                  </TableCell>
                  <TableCell sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sizeData &&
                  sizeData.map((row: any) => (
                    <TableRow
                      key={row.category}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.size}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => deleteSizeType(row._id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
}
