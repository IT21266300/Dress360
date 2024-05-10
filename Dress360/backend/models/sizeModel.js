import mongoose from 'mongoose';

const sizeSchema = new mongoose.Schema({
    size: {
      type: String,
    }
  },{
    timestamps: true
  });

const SizeType = mongoose.model('sizeType', sizeSchema);
export default SizeType;