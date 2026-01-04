import { Schema, model, models } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    inStock: {
      type: Boolean,
      default: true,
    },

    availableFrom: {
      type: Date,
      default: Date.now,
    },
  },
);

// Text search optimization
productSchema.index({
  name: "text",
  description: "text",
  brand: "text",
});

const Product = models.Product || model("Product", productSchema);
export default Product;
