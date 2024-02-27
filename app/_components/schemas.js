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

export default stockSchemaData;
