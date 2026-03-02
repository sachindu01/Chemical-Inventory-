import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'


const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'}/>

      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[580px]' src={assets.contact_img} alt=" "/>
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Department</p>
          <p className='text-gray-500'><br/>Faculty of Science,<br/>University of Peradeniya,<br/>Peradeniya,<br/> 20400,<br/> Sri Lanka <br/> </p>
          <p className='text-gray-500'>Tel: 94 81 238 8693 / 9151 / 9152<br/> Email: deansci@pdn.ac.lk</p>
          <p className='font-semibold text-xl text-gray-600'></p>
          <p className='text-gray-500'></p>
          


        </div>

      </div>
      

    </div>
  )
}

export default Contact