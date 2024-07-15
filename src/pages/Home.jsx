import React from 'react'
import Items from '../components/Items'
import HeroSection from '../components/HeroSection'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
    <HeroSection/>
    <Items title={'Products'} section={'all'}/>
      <Items title={'Electronic'} section={'Electronic'}/>
      <Items title={'Kitchen'} section={'Kitchen'}/>
      {/* <div className="relative">
      <img
        src="https://static.toiimg.com/thumb/msid-109892261,width-1280,height-720,imgsize-74050,resizemode-6,overlay-toi_sw,pt-32,y_pad-40/photo.jpg"
        alt="Workspace with a laptop, keyboard, and a notepad that says 'Never Settle'"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-center">
        <h2 className="text-4xl font-bold">Workspace Collection</h2>
        <p className="mt-4 text-lg">
          Upgrade your desk with objects that keep you
          organized and clear-minded.
        </p>
        <button className="mt-6 px-8 py-3 bg-blue-500 text-white font-bold rounded-md">
          View the collection
        </button>
      </div>
    </div> */}
      <Items title={'Fashion'} section={'Clothing'}/>
    <Footer/>
    </>
  )
}

export default Home