const mongoose = require('mongoose');

const stockSchemaData = {
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
};

const basketSchemaData = {
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
};

export default { stockSchemaData, basketSchemaData };
