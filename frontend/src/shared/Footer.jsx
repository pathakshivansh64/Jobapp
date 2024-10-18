import { Facebook, FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'



function Footer() {
  return (
    <div className=' mx-auto mt-20  '>
        <footer className="bg-gray-100 text-black py-8 rounded-lg">
      <div className="container mx-auto  px-4 flex flex-wrap justify-between rounded-md">
        <div className="w-full md:w-1/4 mb-6">
          <h4 className="text-lg font-semibold mb-4">About Us</h4>
          <p className="text-gray-400">We are a team of passionate developers building amazing web experiences.</p>
        </div>
        <div className="w-full md:w-1/3 mb-6">
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className='flex gap-2'>
            <li className="mb-2"><Link href="/" className="text-gray-400 hover:text-gray-800">Home</Link></li>
            <li className="mb-2"><Link href="/about" className="text-gray-400 hover:text-gray-800">About</Link></li>
            <li className="mb-2"><Link href="/services" className="text-gray-400 hover:text-gray-800">Services</Link></li>
            <li className="mb-2"><Link href="/contact" className="text-gray-400 hover:text-gray-800">Contact</Link></li>
          </ul>
        </div>
        <div className="w-full md:w-1/3 mb-6">
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-800 flex"><FacebookIcon/>Facebook</a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-800 flex"><TwitterIcon/>Twitter</a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-800 flex"><InstagramIcon/>Instagram</a>
          </div>
        </div>
      </div>
      <div >
        <p className="text-center text-gray-400">&copy; {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
      </div>
    </footer>
    </div>
  )
}

export default Footer
