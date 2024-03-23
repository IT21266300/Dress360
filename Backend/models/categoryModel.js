import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String
    },
    image: {
      type: String
    }
  },{
    timestamps: true
  });

const Category = mongoose.model('category', categorySchema);
export default Category;