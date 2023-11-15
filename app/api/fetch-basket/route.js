import { cookies } from 'next/headers';
import { headers } from 'next/headers';

const mongoose = require('mongoose');
// Connect to stock DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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
          variant: [{ name: String, count: Number }],
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

  let data = res[0];
  //let testData = "{ testing: 'ver tested', othertest: 'testing' }";
  return new Response(JSON.stringify(data));
}
