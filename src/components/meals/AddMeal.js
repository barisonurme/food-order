import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';

import { uiControllerActions } from '../../store/uiControllerSlice';

const AddMeal = () => {
  const navigate = useNavigate();
  const uiController = useSelector((store) => store.uiController);
  const addMealObj = uiController.addMealObj;
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsInMeal, setIngredientsInMeal] = useState([]);

  let tempIngredients = [];
  useState(() => {
    if (addMealObj.length === 0) return;
    setIngredients(addMealObj.mealIngredients);
    addMealObj.mealIngredients.forEach((ing) => {
      tempIngredients.push(true);
    });
    setIngredientsInMeal(tempIngredients);
  }, []);

  const dispatch = useDispatch();
  return (
    <div className="page">
      <div className="flex justify-between w-full h-14 md:h-20 items-center align-middle">
        <div className="flex m-auto items-center align-middle justify-between max-w-5xl w-full">
          <Link
            to="/"
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
          </Link>
          <div className="flex font-display text-gray-700 text-base md:text-3xl">Add Meal</div>
          <div className="w-10 mr-5" />
        </div>
      </div>
      <hr />
      {addMealObj.length === 0 && (
        <div className="flex m-auto flex-col items-center justify-center max-w-5xl">
          <p className="flex m-auto text-2xl mt-10">Ürün Bulunamadı!</p>
          <Link
            className="flex m-auto mt-10 border p-2 pr-4 pl-4 rounded-md text-white bg-gray-800"
            to="/"
          >
            Anasayfaya Dön
          </Link>
        </div>
      )}
      {addMealObj.length !== 0 && (
        <div className="flex-none md:flex w-full  md:max-w-5xl m-auto mt-2 md:mt-10 rounded-none md:rounded-xl bg-slate-50 border">
          <img
            alt="pizza!"
            src={addMealObj.mealImage}
            className="flex-none m-auto m-w-9/12 min-h-32 md:w-96 md:h-96 drop-shadow-md group-hover:drop-shadow-xl p-4"
          ></img>
          <div className="grow">
            <div className="flex font-stone-500 text-5xl font-display p-5 w-full items-center justify-center md:justify-start">
              <div className="flex items-center align-middle">
                <div>{addMealObj.mealName}</div>
                <div className="ml-4 flex items-center text-lg justify-center bg-custom-red w-10 h-10 uppercase text-white rounded-full p-4">
                  {addMealObj.mealSize}
                </div>
              </div>
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
                    'line-through bg-slate-200'
                  } select-none border cursor-pointer text-center md:text-left p-2 pl-4 pr-4 rounded-2xl m-1 font-stone-200 text-lg font-sans bg-slate-100 duration-200`}
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
            <div className="fixed md:absolute bottom-0 md:flex md:flex-col md:bg-transparent md:bottom-auto w-full md:w-96 bg-white m-auto mt-8">
              <div className="flex">
                <button
                  onClick={() => {
                    if (!uiController.isAddingMeal) return;
                    dispatch(uiControllerActions.setIsAddingMeal(false));
                    dispatch(
                      uiControllerActions.setInfoModal({
                        infoModalActive: true,
                        infoModalText: 'Added to Cart',
                        infoModalColor: 'green',
                      })
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
                    dispatch(uiControllerActions.setTotalCartItem());
                    navigate('/');
                  }}
                  className="m-4 md:m-1 bg-green-500 hover:bg-green-600 duration-300 w-full h-14 text-white rounded-xl"
                >
                  Sepete Ekle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="w-full h-32"></div>
    </div>
  );
};

export default AddMeal;
