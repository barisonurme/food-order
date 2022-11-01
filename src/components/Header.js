import React from 'react';
import MainBanner from './MainBanner';

import { GiFullPizza } from 'react-icons/gi';
import { CgGlassAlt } from 'react-icons/cg';
import { MdOutlineCampaign } from 'react-icons/md';

const Header = () => {
  return (
    <div>
      <MainBanner />
      <div className="flex flex-row max-w-7xl  m-auto ">
        <div className="flex flex-1 flex-grow ml-2 mr-2">
          <div className="flex items-center font-display text-sm md:text-xl justify-center text-white hover:bg-rose-100 hover:border hover:border-red-500 cursor-pointer hover:text-red-500 duration-500 bg-red-600 h-16 mt-2 md:mt-4 rounded-xl flex-grow flex-1 mr-2">
            <GiFullPizza size={25} className="mr-2"/>
            PIZZAS
          </div>
          <div className="flex items-center font-display text-sm md:text-xl justify-center text-white hover:bg-rose-100 hover:border hover:border-red-500 cursor-pointer hover:text-red-500 duration-500 bg-red-600 h-16 mt-2 md:mt-4 rounded-xl flex-grow flex-1 m-2">
            <CgGlassAlt size={25} className="mr-2"/>
            SOFT DRINKS
          </div>
          <div className="flex items-center font-display text-sm md:text-xl justify-center text-white hover:bg-rose-100 hover:border hover:border-red-500 cursor-pointer hover:text-red-500 duration-500 bg-red-600 h-16 mt-2 md:mt-4 rounded-xl flex-grow flex-1 ml-2">
            <MdOutlineCampaign size={25} className="mr-2"/>
            OFFERS
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
