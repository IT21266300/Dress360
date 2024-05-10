import mongoose from 'mongoose';

const discountSchema = new mongoose.Schema({
    type: {
      type: String,
    }
  },{
    timestamps: true
  });

const DiscountType = mongoose.model('discountType', discountSchema);
export default DiscountType;