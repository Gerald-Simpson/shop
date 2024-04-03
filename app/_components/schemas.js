const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: [String],
  },
  variant: {
    type: [{ name: String, price: String, stock: Number }],
  },
  mainCategory: {
    type: String,
  },
  pictureCount: {
    type: Number,
  },
});

const basketSchema = new mongoose.Schema(
  {
    cookieId: {
      type: String,
      unique: true,
    },
    basket: {
      type: [
        {
          itemDbId: String,
          variantName: String,
          count: Number,
        },
      ],
      minimize: false,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { minimize: false }
);

export { stockSchema, basketSchema };
