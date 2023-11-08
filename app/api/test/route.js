import { NextResponse } from 'next/server';

export async function GET() {
  console.log('the test');
  let test = { hi: 'hi' };
  return new Response(JSON.stringify(test));
}
