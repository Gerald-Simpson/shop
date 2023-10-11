'use server';
import mongoose from 'mongoose';

let basketModel = mongoose.models.basket;

export async function AddToBasket(dataObj) {
  console.log(dataObj);
  console.log(dataObj['cookieId']);
  console.log(dataObj['itemDbId']);
  let query = { cookieId: dataObj['cookieId'] };

  await basketModel.findOneAndUpdate(query, {
    $push: { itemDbId: dataObj['itemDbId'] },
  });
}
