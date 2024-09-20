'use server';

import { redirect } from 'next/navigation';

export default async function Test() {
  redirect('http://localhost:1337/admin');
}
