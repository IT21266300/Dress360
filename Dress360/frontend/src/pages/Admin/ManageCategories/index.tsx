import { Box, Button, TextField } from '@mui/material';
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
  const [categoryData, setCategoryData] = useState();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/category/addCategory', {
        category,
      });
      toast.success('New data has been created successfully!', {
        position: 'top-center',
      });
      navigate('/manageCategories');
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

  console.log(categoryData);

  return (
    <Box>
      {/* Categories */}
      <Box>
        {/* category adding form */}
        <Box>
          <form onSubmit={submitHandler}>
            <Box>
              <TextField
                id="outlined-basic"
                label="Outlined"
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
          {categoryData &&
            categoryData.map((item: any) => (
              <Box>
                <Box>{item.category}</Box>
              </Box>
            ))}
        </Box>
      </Box>

      {/* size */}
      <Box></Box>

      {/* discount types */}
      <Box></Box>
    </Box>
  );
}
