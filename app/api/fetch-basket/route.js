import { cookies } from 'next/headers';
import { headers } from 'next/headers';

const mongoose = require('mongoose');
// Connect to stock DB
mongoose.connect(process.env.MONGO_URI);

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

// Create DB model
let basketModel =
  mongoose.models.basket || mongoose.model('basket', basketSchema);

export async function GET() {
  const headersList = headers();
  const cookieId = headersList.get('cookieId') || cookies().get('id')['value'];
  const res = await basketModel.find({
    cookieId: cookieId,
  });
  if (res.length === 0) {
    return new Response('[]');
  }
  let data = res[0];
  return new Response(JSON.stringify(data));
}
