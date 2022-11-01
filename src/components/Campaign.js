import React from 'react';

import pizzaImg from '../images/pizza-item.png';

const DUMMY_CAMPAIGN = [
  {
    id: 'm1',
    mealName: 'Büyük Boy Pizza 79,99 TL',
    ingredients: ['pepperoni pizza', 'margherita'],
    price: 8.99,
  },
];

const Campaign = () => {
  return (
    <>
    <div className="max-w-7xl  m-auto mt-10">
      <div className="font-display text-3xl text-zinc-600 font-bold text-left pl-24">
        KAMPANYALAR
      </div>
    </div>
    <div className="flex flex-wrap max-w-7xl m-auto justify-evenly justify-start cursor-pointer">
      {DUMMY_CAMPAIGN.map((meal) => (
        <div key={meal.id}>
          <div className="group rounded-xl m-5 w-80 min-h-80 flex items-center justify-center flex-wrap content-start overflow-hidden bg-slate-50 drop-shadow-md group-hover:drop-shadow-lg ease-in-out duration-500">
            <img
              alt="pizza!"
              src={pizzaImg}
              className="grayscale opacity-25 group-hover:grayscale-0 group-hover:opacity-100 w-62 h-62 drop-shadow-md group-hover:drop-shadow-xl p-5 group-hover:scale-105 group-hover:rotate-3 ease-in-out duration-500"
            ></img>
            <div className="font-display text-xl ease-in-out duration-1000 font-semibold mt-4">
              {meal.mealName}
            </div>
            <div className="font-sans p-3 pb-5 pt-2 text-zinc-500 font-medium">
              {meal.ingredients.join(', ')}
            </div>
          <button className="p-2 bg-slate-300 pl-4 rounded-lg pr-4 mb-6 group-hover:pl-5 group-hover:pr-5 ease-in-out duration-700 group-hover:drop-shadow-lg group-hover:bg-orange-600 group-hover:text-slate-50">+</button>
          </div>
        </div>
      ))}
    </div>
  </>
  );
};

export default Campaign;
