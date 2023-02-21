const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true, index: true },
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
  },
  { collection: 'products_features' }
);

const StyleSchema = new mongoose.Schema(
  {
    id: Number,
    product_id: {
      type: Number,
      ref: 'Product',
      index: true,
    },
    name: { type: String },
    sale_price: { type: String },
    original_price: { type: String },
    default_style: { type: Boolean },
    photos: [{ thumbnail_url: { type: String }, url: { type: String } }],
    skus: [{ size: { type: String }, quantity: { type: Number } }],
  },
  { collection: 'styles_skus_photos' }
);

const RelatedProductsSchema = new mongoose.Schema(
  {
    id: Number,
    product_id: { type: Number, ref: 'Product', index: true },
    related_product_ids: [{ type: Number, ref: 'Product' }],
  },
  { collection: 'related_products' }
);

const Product = mongoose.model('Product', ProductSchema);
const Style = mongoose.model('Styles', StyleSchema);
const Related = mongoose.model('Related', RelatedProductsSchema);

module.exports = { Product, Style, Related };
