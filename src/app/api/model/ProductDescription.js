import mongoose from 'mongoose';

const ProductDescriptionSchema = new mongoose.Schema(
  {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.ProductDescription || mongoose.model('ProductDescription', ProductDescriptionSchema);
