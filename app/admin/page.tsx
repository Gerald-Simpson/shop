'use client';

import { redirect } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Admin() {
  return redirect('/admin/api/auth/login');
}
