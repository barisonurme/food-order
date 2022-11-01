import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import MealList from "./MealList";

// const DUMMY_MEAL = [
//   {
//     id: 'm1',
//     mealName: 'Margherita',
//     ingredients: ['domates sosu', 'margherita', 'fesleğen', 'zeytin yağı'],
//     price: 80.99,
//     image: '/images/pizza-item.png',
//     size: 'l',
//   }
// ];

// let mealLength = DUMMY_MEAL.length
// DUMMY_MEAL.forEach((meal) => {
//   mealLength--;
//   console.log(mealLength)
//   meal.ingredients.forEach(ing => {
//     console.log(ing);
//   });
// });

const Meals = () => {
  const [largeMeals, setLargeMeals] = useState([]);
  const [mediumMeals, setMediumMeals] = useState([]);
  const [smallMeals, setSmallMeals] = useState([]);

  useEffect(() => {
    getMeals();
  }, []);

  const getMeals = async () => {
    const querySnapshot = await getDocs(collection(db, "Meals"));
    setMediumMeals([]);
    setSmallMeals([]);
    setLargeMeals([]);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      for (const mealSize in data.mealPrices) {
        if (data.mealPrices[mealSize] === "") return;
        const dataTry = {
          ...data,
          mealSize,
          mealSizePrice: data.mealPrices[mealSize],
        };

        if (mealSize === "sm") {
          setSmallMeals((prevState) => [...prevState, dataTry]);
        }
        if (mealSize === "md") {
          setMediumMeals((prevState) => [...prevState, dataTry]);
        }
        if (mealSize === "xl") {
          setLargeMeals((prevState) => [...prevState, dataTry]);
        }
      }
    });
  };
  return (
    <>
      {/* LARGE MEALS */}
      <div className="max-w-7xl  m-auto mt-2">
        <div className="font-display text-xl md:text-3xl pt-2 pb-2 align-middle flex flex- text-white bg-zinc-800 font-bold text-center md:text-left pl-0 md:pl-24">
          LARGE SIZE PIZZA&nbsp;
          <div className="flex items-center text-sm md:text-xl text-gray-300 font-light tracking-wider">
            {"(2-3 Person)"}
          </div>
        </div>
        {/* <hr className="flex m-auto max-w-6xl  border-1 border-zinc-600" /> */}
      </div>
      <div className="flex flex-wrap max-w-7xl m-auto justify-evenly">
        {largeMeals.map((meal) => (
          <MealList meal={meal} key={meal.id + meal.mealSize} />
        ))}
      </div>

      {/* MEDUIM MEALS */}
      <div className="max-w-7xl  m-auto mt-10">
        <div className="font-display text-xl md:text-3xl pt-2 pb-2 align-middle flex flex- text-white bg-zinc-800 font-bold text-center md:text-left pl-0 md:pl-24">
          MEDIUM SIZE PIZZAS&nbsp;
          <div className="flex items-center text-sm md:text-xl text-gray-300 font-light tracking-wider">
            {"(2-3 Person)"}
          </div>
        </div>
        {/* <hr className="flex m-auto max-w-6xl  border-1 border-zinc-600" /> */}
      </div>
      <div className="flex flex-wrap max-w-7xl m-auto justify-evenly">
        {mediumMeals.map((meal) => (
          <MealList meal={meal} key={meal.id + meal.mealSize} />
        ))}
      </div>

      {/* SMALL MEALS */}
      <div className="max-w-7xl  m-auto mt-10">
        <div className="font-display text-xl md:text-3xl pt-2 pb-2 align-middle flex flex- text-white bg-zinc-800 font-bold text-center md:text-left pl-0 md:pl-24">
          SMALL SIZE PIZZAS&nbsp;
          <div className="flex items-center text-sm md:text-xl text-gray-300 font-light tracking-wider">
            {"(Single Person)"}
          </div>
        </div>
        {/* <hr className="flex m-auto max-w-6xl  border-1 border-zinc-600" /> */}
      </div>
      <div className="flex flex-wrap max-w-7xl m-auto justify-evenly">
        {smallMeals.map((meal) => (
          <MealList meal={meal} key={meal.id + meal.mealSize} />
        ))}
      </div>
    </>
  );
};

export default Meals;
