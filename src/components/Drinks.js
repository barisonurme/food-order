import React from 'react';

// import pizzaImg from '../../images/pizza-item.png';
// import kutuKola from '../../images/kutu-lime.png';

const DUMMY_DRINKS = [
  {
    id: 'm1',
    mealName: 'Coca Cola Klasik 250 ml',
    ingredients: ['Klasik'],
    price: 1.99,
    image: '/images/kutu-cola.png'
  },
  {
    id: 'm2',
    mealName: 'Coca Cola Zero 250 ml',
    ingredients: ['Şekersiz'],
    price: 1.99,
    image: '/images/kutu-zero.png'
  },
  {
    id: 'm3',
    mealName: 'Coca Cola Lime 250 ml',
    ingredients: ['Limonlu'],
    price: 1.99,
    image: '/images/kutu-lime.png'
  },
];


const Drinks = () => {
  return (
    <>
      <div className="max-w-7xl  m-auto mt-10">
        <div className="font-display text-3xl text-zinc-600 font-bold text-left pl-24">
          İÇECEKLER
        </div>
        <hr className="flex m-auto max-w-6xl  border-1 border-zinc-600" />
        <hr className="flex m-auto max-w-6xl opacity-30 border-1 border-zinc-600" />
      </div>
      <div className="flex flex-wrap max-w-7xl m-auto justify-evenly">
        {DUMMY_DRINKS.map((meal) => (
          <div key={meal.id} className="cursor-pointer">
            <div className="group rounded-xl m-5 w-36 min-h-36 md:w-80 md:min-h-80 flex items-center justify-center flex-wrap content-start overflow-hidden bg-slate-50 drop-shadow-md group-hover:drop-shadow-lg ease-in-out duration-500">
              <img
                alt="pizza!"
                src={meal.image}
                className="grayscale opacity-25 group-hover:grayscale-0 group-hover:opacity-100 w-32 h-32 md:w-64 md:h-64 drop-shadow-md group-hover:drop-shadow-xl p-5 group-hover:scale-105 ease-in-out duration-500"
              ></img>
              <div className="font-display text-xl ease-in-out duration-1000 font-semibold text-center mt-4">
                {meal.mealName}
              </div>
              <div  className="min-w-full">
              <div className="font-sans text-center p-3 pb-5 pt-2 text-zinc-500 font-medium text-sm md:text-lg">
                  {meal.ingredients.join(', ')}
                </div>
              </div>
              <button className="p-2 bg-slate-300 pl-4 rounded-lg pr-4 mb-6 group-hover:pl-5 group-hover:pr-5 ease-in-out duration-700 group-hover:drop-shadow-lg group-hover:bg-orange-600 group-hover:text-slate-50">
                +
              </button>
              <div className="mb-6 bg-white p-1 pl-4 pr-4 rounded-xl  ml-5 text-2xl font-display">
                {meal.price} <span className="text-lg font-normal"> €</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Drinks;
