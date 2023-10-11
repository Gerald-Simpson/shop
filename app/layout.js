import { headers } from 'next/headers';
import { cookies } from 'next/headers';
import './globals.css';
import { Inter } from 'next/font/google';
import NavBar from './_components/navBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'test tab title',
  description: 'Built by Gerald Simpson',
};

const mongoose = require('mongoose');
// Connect to stock DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const basketSchema = new mongoose.Schema({
  cookieId: {
    type: String,
    unique: true,
  },
  itemDbId: {
    type: [String],
  },
});

// Create DB model
let basketModel =
  mongoose.models.basket || mongoose.model('basket', basketSchema);

/*
export const fetchBasket = async function () {
  return await basketModel.find({ cookieId: cookies().get('id')['value'] });
};
*/

//Once adding items to basket is created, need to look at how to re-validate fetchBasket once items are added, as the basket count on the navbar element doesn't update unless the page is refreshed.
export default async function RootLayout({ children }) {
  let fetchBasket = await basketModel.find({
    cookieId: cookies().get('id')['value'],
  });
  if (fetchBasket.length == 0) {
    basketModel.create({
      cookieId: cookies().get('id')['value'],
      itemDbId: [],
    });
  }
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='flex flex-col w-view items-center'>
          <NavBar
            basketCount={
              fetchBasket[0]['itemDbId'].length === 0
                ? ''
                : ' ' + fetchBasket[0]['itemDbId'].length
            }
          />
          {children}
        </div>
      </body>
    </html>
  );
}
