'use server';

import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
const request = NextRequest;
const response = NextResponse.next();

import { cookies } from 'next/headers';

export async function addBasket(item) {
  if (cookies().has(item)) {
    cookies().set(item, 1);
  } else {
    let cookie = cookies().get(item);
    cookies().set(item, cookie.value + 1);
  }
}
