import React from 'react'
import { CiDeliveryTruck } from "react-icons/ci";
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <section>
            <div className=" container mx-auto px-5 py-10 md:py-14">
                
                <div className="flex flex-wrap -m-4 text-center">
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"  >
                            <svg className="text-green-600 w-12 h-12 mb-3 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <h2 className="title-font font-medium text-lg text-gray-900" >Premium Products</h2>
                            <p className="leading-relaxed">Quality Verified Products.
                            </p>
                        </div>
                    </div>
                   
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"  >
                            
                        <CiDeliveryTruck size={60} className="text-green-600 w-12 h-12 mb-3 inline-block" />

                            <h2 className="title-font font-medium text-lg text-gray-900" >Fast Delivery</h2>
                            <p className="leading-relaxed">Next Day Delivery.
                            </p>
                        </div>
                    </div>
                    
                    <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                        <div className="border-2 hover:shadow-xl hover:shadow-gray-200 border-gray-200 bg-gray-100 shadow-[inset_0_0_2px_rgba(0,0,0,0.6)] px-4 py-6 rounded-lg"  >
                            <svg className="text-green-600 w-12 h-12 mb-3 inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <h2 className="title-font font-medium text-lg text-gray-900" >Exchange Policy</h2>
                            <p className="leading-relaxed">7 Days Exchange Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <footer className="text-green-600 body-font bg-gradient-to-b from-black to-gray-600 ">
                <div className="container px-5 py-5 mx-auto flex items-center sm:flex-row flex-col">
                    <a className="flex title-font font-medium items-center md:justify-start justify-center text-green">
                        <span className="text-xl font-bold">Abhinav</span>
                    </a>
                    <p className="text-sm text-gray-100 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
                        <Link
                        to={'/'}
                            className="text-gray-100 ml-1"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                        </Link>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
                        <Link className="text-gray-100 cursor-pointer">
                            <svg
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            </svg>
                        </Link>
                        {/* twitter  */}
                        <Link className="ml-3 text-gray-100 cursor-pointer">
                            <svg
                                fill="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                        </Link>
                        {/* instagram  */}
                        <Link className="ml-3 text-gray-100 cursor-pointer" to={'https://www.instagram.com/abhinav_8195/'}>
                            <svg
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                            </svg>
                        </Link>
                        {/* linkedIn  */}
                        <Link className="ml-3 text-gray-100 cursor-pointer">
                            <svg
                                fill="currentColor"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={0}
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="none"
                                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                                />
                                <circle cx={4} cy={4} r={2} stroke="none" />
                            </svg>
                        </Link>
                    </span>
                </div>
            </footer>
        </section>
        
    );
}

export default Footer