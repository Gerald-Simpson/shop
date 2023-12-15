'use server';
import mongoose from 'mongoose';

let basketModel = mongoose.models.basket;

export async function addToBasket(dataObj) {
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
      basket: {
        itemDbId: dataObj['itemDbId'],
        variantName: dataObj.variantName,
        count: 1,
      },
    });
  } else {
    let basketCopy = fetchBasket[0]['basket'];
    let position = -1;
    // Basket already exists
    // Check if item already in basket
    basketCopy.forEach((obj, index) => {
      if (
        obj.itemDbId === dataObj['itemDbId'] &&
        obj.variantName === dataObj.variantName
      ) {
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
      let basketPushItem = {
        itemDbId: dataObj['itemDbId'],
        variantName: dataObj.variantName,
        count: 1,
      };
      await basketModel.findOneAndUpdate(query, {
        $push: { basket: basketPushItem },
        $set: { lastUpdated: Date.now() },
      });
    }
  }
}

export async function removeFromBasket(dataObj) {
  'use server';
  // Check if cookieId is in basketDB
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

export async function decrementBasket(dataObj) {
  'use server';
  // Check if cookieId is in basketDB
  let query = { cookieId: dataObj['cookieId'] };

  let fetchBasket = await basketModel.find(query);

  if (fetchBasket.length === 0) {
    // Basket not created
    // Do nothing
  } else {
    let basketCopy = fetchBasket[0]['basket'];
    // Basket already exists
    basketCopy.forEach((obj, index) => {
      if (
        obj.itemDbId === dataObj['itemDbId'] &&
        obj.variantName === dataObj.variantName
      ) {
        if (obj.count <= 1) {
          // Delete obj in basketCopy
          basketCopy.splice(index, 1);
        } else {
          // Decrement count value
          basketCopy[index].count -= 1;
        }
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
