import React from 'react'
import Location from '../components/ui/modal/Location'
import { Link } from 'react-router-dom'

const AboutPage = () => {
  return (
    <>
     <div className="mt-10 font-display text-3xl text-zinc-600 font-bold flex justify-center">
        En Kaliteli Malzemeler
      </div>
      <p className='max-w-xl m-auto text-center mt-5 flex justify-center font-display font-extralight tracking-wider text-gray-700'>2004 yılından beri açılışından beri üst düzey hizmet ve malezeme kalitesi günümüze kadar müşterilerine lezzet sunmaya devam ediyor.</p>
      <Link to="/siparis" className='flex m-auto w-32 justify-center mt-10 p-2 pl-4 pr-4 rounded-xl border border-stone-700 hover:bg-gray-900 duration-500 hover:text-white'>Sipariş Ver</Link>
      <Location/>
    </>
  )
}

export default AboutPage