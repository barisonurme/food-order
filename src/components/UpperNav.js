import React from 'react';

const UpperNav = () => {
  return (
    <div className="hidden md:flex max-w-7xl m-auto h-12 items-center align-middle justify-center">
      <div className="ml-10 font-extralight tracking-wider h-12 flex flex-1 items-center align-middle justify-start flex-row  ">
        <svg
          stroke="currentColor"
          className="mr-2 fill-custom-red"
          strokeWidth="0"
          viewBox="0 0 512 512"
          height="24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M256 32c-88.004 0-160 70.557-160 156.801C96 306.4 256 480 256 480s160-173.6 160-291.199C416 102.557 344.004 32 256 32zm0 212.801c-31.996 0-57.144-24.645-57.144-56 0-31.357 25.147-56 57.144-56s57.144 24.643 57.144 56c0 31.355-25.148 56-57.144 56z"></path>
        </svg>
        <div className="font-display text-gray-900">Fener Mahallesi, Antalya</div>
      </div>
      <div className="mr-10 font-extralight tracking-wider h-12 flex flex-1 items-center align-middle justify-end flex-row  ">
        <svg
          className="mr-2 fill-custom-red"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
        >
          <path d="M20.05 11.825q-.425 0-.725-.288-.3-.287-.4-.762-.35-2.325-2.025-4-1.675-1.675-4-2.025-.45-.075-.75-.4t-.3-.75q0-.475.313-.75.312-.275.737-.225 3.225.375 5.513 2.65 2.287 2.275 2.662 5.5.05.425-.263.737-.312.313-.762.313Zm-4.25 0q-.35 0-.612-.238-.263-.237-.413-.662-.225-.725-.75-1.25t-1.25-.75q-.4-.15-.662-.438-.263-.287-.263-.637 0-.525.363-.85.362-.325.837-.225 1.45.325 2.5 1.375t1.375 2.475q.125.5-.225.85t-.9.35Zm4.375 9.425q-3.325 0-6.475-1.488-3.15-1.487-5.6-3.95Q5.65 13.35 4.15 10.2t-1.5-6.5q0-.5.275-.775T3.7 2.65h4.225q.375 0 .7.25.325.25.375.6l.675 3.7q.075.35 0 .638-.075.287-.275.462l-2.525 2.5q1.075 1.8 2.687 3.438Q11.175 15.875 13 16.95l2.625-2.55q.225-.225.45-.288.225-.062.475-.012l3.775.825q.375.075.638.362.262.288.262.663v4.25q0 .5-.275.775t-.775.275Z" />
        </svg>
        <div className="font-display text-gray-900">0850 850 50 50</div>
      </div>
    </div>
  );
};

export default UpperNav;
