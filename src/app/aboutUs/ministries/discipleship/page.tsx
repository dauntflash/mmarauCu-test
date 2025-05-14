import React from 'react'
import Accordion from './accordion/accordion'
import { data } from './accordion/data'
import Image from 'next/image'

const Discipleship = () => {
  return (
    <div className=''>
      <div className="relative">
              <Image
                className="w-full object-cover h-[70vh]"
                src="/bg/images/ministries/technical.jpg"
                alt="ministries"
                width={1920}
                height={1080}
              />
              <div className=" w-full  bg-cover bg-center absolute inset-0  h-[70vh]">
                {/* Overlay */}
                <div className=" bg-opacity-50 w-full h-[70vh] absolute bg-black"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <h1 className="font-extrabold text-4xl lg:text-5xl text-white leading-tight">
                  Discipleship Ministry
                  </h1>
                  <p className="text-white font-medium mt-2">
                  Maasai Mara christian union discipleship ministry equips believers through biblical teaching, mentoring, and community, fostering spiritual growth, faithfulness, and Christlike living.
                  </p>
                </div>
              </div>
            </div>
        <div className='mx-auto w-[90%] sm:w-[80%] mt-4'>
            <p className='pb-3 text-xl'>MISSION</p>
            <p className='pb-3 text-lg'>To enhance the art and practice of discipleship by deepening and strengthening the spiritual life through studying of the Bible, Prayers and Christian fellowship of members of the campus community and society for effective Christian living.</p>
        </div>
        <div className='mx-auto w-[90%] sm:w-[80%] mt-4'>
            <p className='pb-3 text-xl'>Sub-ministries within discipleship focus on mentoring, small groups, Bible study, leadership training, and spiritual growth, strengthening faith and community.</p>
            <div className='flex flex-col gap-4 divide-y'>
            {
              data.map((d,i) => 
                <Accordion  
                ministry={d.ministry}
                description={d.discription}
                key={i}
                isAccodionOpen={d.sAccodionOpen}
                />
              )
            }
        
            </div>
        </div>
    </div>
  )
}

export default Discipleship