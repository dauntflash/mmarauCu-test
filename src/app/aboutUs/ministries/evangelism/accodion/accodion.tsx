"use client";
import React, { useState } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';

type Props = {
  ministry: string;
  description: string;
  isAccodionOpen: boolean;
};

const Accordion = (props: Props) => {
  const [isAccodionOpen, setAccodion] = useState(false);

  function toggleAccodion() {
    setAccodion(!isAccodionOpen);
  }

  return (
    <div className="flex flex-col gap-4 py-4 transition-all delay-500">
      {/* Title */}
      <p
        onClick={toggleAccodion}
        className="flex justify-between items-center text-2xl sm:text-3xl font-bold cursor-pointerbg-blue-100 rounded-lg shadow-lg p-6 border-b border-gray-300 bg-[#393ee3]"
      >
        <span className='text-white'>{props.ministry}</span>
        <span className='text-white'>{isAccodionOpen ? <BiMinus /> : <BiPlus />}</span>
      </p>
      {/* Description */}
      {isAccodionOpen && (
        <p className="text-sm sm:text-base text-gray-700 bg-gray-100 p-6 border-b border-gray-300">
          {props.description}
        </p>
      )}
    </div>
  );
};

export default Accordion;