import Link from 'next/link';
import React from 'react';

const PageNotFound = () => {
  return (
    <div>
        <h1>Page Not Found</h1>
        <h3>Check to see if you are in the correct page</h3>
        <Link href='/'>Or go back home</Link>
    </div>
  )
}

export default PageNotFound;