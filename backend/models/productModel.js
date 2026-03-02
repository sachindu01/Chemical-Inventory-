import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Array, required: true }, // Stores product images
    locationImage: { type: Array, required: false }, // Stores location images
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    quantity: { type: Number, required: true },
    availability: { type: Boolean, default: false },
    date: { type: Number, required: true },
    unit: { type: String, required: true },
    location: { type: String, required: true }
  });
  
  // Pre-save middleware to update availability based on quantity
  productSchema.pre('save', function (next) {
    if (this.quantity === 0) {
      this.availability = false;
    } else {
      this.availability = true;
    }
    next();
  });
  
const productModel = mongoose.models.product || mongoose.model("product", productSchema);
  
export default productModel;






