import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import Cms from './_components/cmsComponents.tsx';

export default withPageAuthRequired(async function Success() {
  return <Cms />;
});
