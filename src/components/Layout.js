import Navbar from './Navbar';
import Head from 'next/head';

const Layout = ({children}) => {

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar/>
      <div>{children}</div>
    </>
  )
}

export default Layout