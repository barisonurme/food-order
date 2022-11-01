import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { uiControllerActions } from '../../store/uiControllerSlice';

const EditMeal = () => {
  const uiController = useSelector((store) => store.uiController);
  const addMealObj = uiController.addMealObj;
  const totalCartItem = uiController.totalCartItem;
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsInMeal, setIngredientsInMeal] = useState([]);

  let tempIngredients = [];

  useState(() => {
    setIngredients(addMealObj.mealIngredients);
    addMealObj.mealIngredients.forEach((ing) => {
      tempIngredients.push(true);
    });
    setIngredientsInMeal(tempIngredients);
  }, []);

  const dispatch = useDispatch();
  return (
    <div>
      <div className="flex justify-between w-full h-14 items-center align-middle">
        <div
          onClick={() => {
            dispatch(
              uiControllerActions.setCurrentPage({
                isShow: false,
                currentPage: 'mainPage',
              })
            );
          }}
          className="flex justify-center items-center ml-5 w-10 h-10 bg-slate-50 border rounded-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
            <path d="m10.725 19.3-6.5-6.5q-.175-.175-.25-.375-.075-.2-.075-.425 0-.225.075-.425.075-.2.25-.375l6.5-6.5q.325-.3.788-.313.462-.012.812.313.35.325.363.8.012.475-.338.8L7.8 10.85h10.675q.475 0 .813.338.337.337.337.812 0 .475-.337.812-.338.338-.813.338H7.8l4.55 4.55q.325.3.338.788.012.487-.338.812-.325.325-.8.325-.475 0-.825-.325Z" />
          </svg>
        </div>
        <div className="flex font-display text-gray-700">Add Meal:</div>
        <div className="w-10 mr-5" />
      </div>
      <div className="flex-none md:flex max-w-5xl m-auto rounded-none md:rounded-xl bg-slate-50 border">
        <img
          alt="pizza!"
          src={addMealObj.mealImage}
          className="flex-none m-auto w-9/12 min-h-32 md:w-96 md:h-96 drop-shadow-md group-hover:drop-shadow-xl p-4"
        ></img>
        <div className="grow">
          <div className="font-stone-500 text-5xl font-display p-5 w-full items-center justify-center text-center md:text-left">
            {addMealObj.mealName}
          </div>
          <div className="md:flex md:flex-wrap w-full">
            {ingredients.map((ing) => (
              <div
                onClick={() => {
                  tempIngredients = ingredientsInMeal;
                  tempIngredients[ingredients.indexOf(ing)] =
                    !tempIngredients[ingredients.indexOf(ing)];
                  setIngredientsInMeal([...tempIngredients]);
                }}
                className={`${
                  ingredientsInMeal[ingredients.indexOf(ing)] === false &&
                  'line-through'
                } select-none cursor-pointer text-center md:text-left p-2 pl-4 pr-4 rounded-2xl m-1 font-stone-200 text-lg font-sans bg-slate-100`}
                key={ingredients.indexOf(ing)}
              >
                {ing}
              </div>
            ))}
          </div>
          <div className="text-stone-900 font-bold text-4xl p-4 w-full items-center justify-center text-center md:text-left">
            {addMealObj.mealPrice.toString().split('.')[0]}
            <span className="text-3xl">
              {'.' + addMealObj.mealPrice.toString().split('.')[1]}
            </span>
            <span className="text-3xl">&nbsp;€</span>
          </div>
          <div className="fixed bottom-0 md:flex md:flex-col md:bg-transparent md:bottom-auto w-full md:w-96 bg-white m-auto mt-8">
            <div className="flex">
              <button
                onClick={() => {
                  if (uiController.addMealPage)
                    dispatch(
                      uiControllerActions.setInfoModal({
                        infoModalActive: true,
                        infoModalText: 'Sepete Eklendi',
                        infoModalColor: 'green',
                      })
                    );
                  dispatch(
                    uiControllerActions.setTotalCartItem()
                  );
                  dispatch(
                    uiControllerActions.setCurrentPage({
                      isShow: false,
                      currentPage: 'mainPage',
                    })
                  );
                  dispatch(
                    uiControllerActions.setCartItems({
                      currentMeal: addMealObj,
                      desiredIngredients: ingredientsInMeal,
                    })
                  );
                }}
                className="m-4 md:m-1 bg-green-500 hover:bg-green-600 duration-300 w-full h-14 text-white rounded-xl"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-32"></div>
    </div>
  );
};

export default EditMeal;
