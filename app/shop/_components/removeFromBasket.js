'use server';
import mongoose from 'mongoose';

let basketModel = mongoose.models.basket;

export async function removeFromBasket(dataObj) {
  'use server';
  // Need to check if cookieId is already in basketDB & add if not.
  // Also change itemDbId in basketDB to object with count rather than array
  // Need to revalidate fetchBasket in layout.js on basketDB change
  let query = { cookieId: dataObj['cookieId'] };

  let fetchBasket = await basketModel.find(query);

  if (fetchBasket.length === 0) {
    // Basket not created
    // Do nothing
  } else {
    let basketCopy = fetchBasket[0]['basket'];
    // Basket already exists
    // Check if item is in basket
    basketCopy.forEach((obj, index) => {
      if (
        obj.itemDbId === dataObj['itemDbId'] &&
        obj.variantName === dataObj.variantName
      ) {
        // Delete obj in basketCopy
        basketCopy.splice(index, 1);
      }
    });
    // Replace basket with updated basketCopy
    await basketModel.findOneAndUpdate(
      { 'basket.itemDbId': dataObj['itemDbId'] },
      {
        $set: { basket: basketCopy, lastUpdated: Date.now() },
      }
    );
  }
}
