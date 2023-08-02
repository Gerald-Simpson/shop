import { weeksToDays } from 'date-fns';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
const request = NextRequest;
const response = NextResponse.next();

export function middleware(request) {
  if (!request.cookies.has('id')) {
    // if there is no previous cookie
    // create a new individual id
    // create new cookie id
  }
  //let cookie = request.cookies.get('id');
  //response.cookies.set('id', 'cookieId');
  //if (request.cookies.has('id')) {
  //response.cookies.set('id', 'asdfasdfasdf');
  //}
  //response.cookies.set('id', 1);
  //let cookie = request.cookies.get('id');
  //console.log(cookie);
  return response;
}
