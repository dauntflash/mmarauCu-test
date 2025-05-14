"use client";
import React, { useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
type Props = {
    ministry:string,
    description:string,
    isAccodionOpen:boolean
}

const Accordion = (props:Props) => {
    const [isAccodionOpen,setAccodion] = useState(false);
    function toggleAccodion(){
        if(!isAccodionOpen) {
            setAccodion(true)
        } else{
            setAccodion(false)
        }
    }
  return (
    <div className='flex flex-col gap-4 py-4 transition-all delay-500'>
        {/*text */}
        <p onClick={toggleAccodion} className='flex justify-between gap-2 sm:text-3xl text-2xl font-bold cursor-pointer text-white bg-[#393ee3] p-6 rounded-lg'><span>{props.ministry}</span> <span></span> { isAccodionOpen ? <BiMinus/> : <BiPlus/>}</p>
        {/*description */}
        {
            isAccodionOpen &&( 
                <p className='text-sm sm:text-base text-gray-700 bg-purple-100 p-7'>{props.description}</p>
       
            )
        }
     </div>   
  )
}

export default Accordion
