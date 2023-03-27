import React from 'react';
import Head from 'next/head';


function Layout({ title, description, children}) {

  return (
    <div>
      <Head>
      <title>{title ? `${title} - Remedy Exports` : 'Remedy Exports'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
        <div>
            { children }
        </div>
    </div>
  );
}

export default Layout;