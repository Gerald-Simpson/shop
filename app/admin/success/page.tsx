import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import Cms from './_components/cmsComponents.tsx';
import { redirect } from 'next/navigation';
import Page from '@/app/shop/[productId]/page.tsx';

export default withPageAuthRequired(async function Success() {
  return <Cms />;
});

/*
 MySql setup unfinished
import mysql, { ConnectionOptions } from 'mysql2/promise';
  const access: ConnectionOptions = {
    host: 'bitnami@3.11.146.50',
    user: 'root',
    password: process.env.MySqlPassword,
    port: 22,
    database: 'menagerie',
    sslkey: '../../../../credentials/portfolioSSH.pem',
  };
  try {
    const [results, fields] = await connection.query('select * from pet');
    console.log(results);
    console.log(fields);
  } catch (err) {
    console.log(err);
  }
  return <p>test</p>;
    */
