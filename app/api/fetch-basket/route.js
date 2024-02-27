import { cookies } from 'next/headers';
import { headers } from 'next/headers';
import basketSchemaData from '../../_components/schemas.js';

const mongoose = require('mongoose');
// Connect to stock DB
mongoose.connect(process.env.MONGO_URI);

const basketSchema = new mongoose.Schema(basketSchemaData, { minimize: false });

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
