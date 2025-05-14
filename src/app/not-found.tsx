import Link from 'next/link'
import React from 'react'

export default function Notfound() {
  return (
    <div className='h-screen bg-blue-100 text-center mx-auto w-screen my-0 text-gray-700'>
      <div className="text-[9rem] font-light pt-[7rem]">404</div>
      <div className="text-[1.5rem]">Sorry, the page you are looking for does not exist, go back <Link className='text-blue-700' href="/">Home</Link></div>
    </div>
  )
}
