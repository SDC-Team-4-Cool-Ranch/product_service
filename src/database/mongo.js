const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String },
  slogan: { type: String },
  description: { type: String },
  category: { type: String },
  default_price: { type: Number, required: true },
  features: [
    {
      feature: { type: String },
      value: { type: String },
    },
  ],
});

const StyleSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  name: { type: String },
  sale_price: { type: String },
  original_price: { type: String },
  default_style: { type: Boolean },
  photos: [{ thumbnail_url: { type: String }, url: { type: String } }],
  skus: [{ size: { type: String }, quantity: { type: Number } }],
});

const RelatedProductsSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  related_product_ids: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  ],
});

export { ProductSchema, StyleSchema, RelatedProductsSchema };
