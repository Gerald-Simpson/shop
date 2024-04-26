import mongoose from 'mongoose';

interface stockInterface {
  name: string;
  description: [string];
  variant: [{ name: string; price: string; stock: number }];
  mainCategory: string;
  pictureCount: number;
}

const stockSchema = new mongoose.Schema<stockInterface>({
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

interface basketInterface {
  cookieId: string;
  basket: [{ itemDbId: string; variantName: string; count: number }];
  lastUpdated: Date;
}

const basketSchema = new mongoose.Schema<basketInterface>(
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
  { minimize: false },
);

export { stockSchema, basketSchema };
