import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import Cms from './_components/cmsComponents.tsx';
import { redirect } from 'next/navigation';

export default withPageAuthRequired(async function Success() {
  return <Cms />;
});
