'use server';
import mongoose from 'mongoose';

let basketModel = mongoose.models.basket;

export async function AddToBasket(dataObj) {
  'use server';
  // Need to check if cookieId is already in basketDB & add if not.
  // Also change itemDbId in basketDB to object with count rather than array
  // Need to revalidate fetchBasket in layout.js on basketDB change
  let query = { cookieId: dataObj['cookieId'] };

  let fetchBasket = await basketModel.find(query);

  if (fetchBasket.length === 0) {
    // Basket not created
    // Create basket & add item
    basketModel.create({
      cookieId: dataObj['cookieId'],
      basket: { itemDbId: dataObj['itemDbId'], count: 1 },
    });
  }
  let basketCopy = fetchBasket[0]['basket'];
  let position = -1;
  // Basket already exists
  // Check if item already in basket
  basketCopy.forEach((obj, index) => {
    if (obj.itemDbId === dataObj['itemDbId']) {
      position = index;
      // Increment cont in basketCopy
      basketCopy[index]['count'] += 1;
    }
  });
  if (position > -1) {
    // Replace basket with updated basketCopy
    await basketModel.findOneAndUpdate(
      { 'basket.itemDbId': dataObj['itemDbId'] },
      {
        $set: { basket: basketCopy, lastUpdated: Date.now() },
      }
    );
  } else {
    //If not, add the item to the itemDbId object with value of 1
    let basketPushItem = { itemDbId: dataObj['itemDbId'], count: 1 };
    await basketModel.findOneAndUpdate(query, {
      $push: { basket: basketPushItem },
      $set: { lastUpdated: Date.now() },
    });
  }
}
