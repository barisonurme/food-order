import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { uiControllerActions } from "../../store/uiControllerSlice";
import * as Scroll from "react-scroll";

const MealList = (props) => {
  const dispatch = useDispatch();
  let scroll = Scroll.animateScroll;

  const { meal } = props;
  return (
    <Link
      to="add-meal"
      key={meal.id + meal.mealSize}
      onClick={() => {
        scroll.scrollToTop();
        dispatch(uiControllerActions.setIsAddingMeal(true));
        dispatch(
          uiControllerActions.setAddMealObj({
            mealImage: meal.uploadImageUrl,
            mealName: meal.mealName,
            mealPrice: meal.mealSizePrice,
            mealIngredients: meal.mealIngredients,
            mealId: meal.id,
            mealSize: meal.mealSize,
          })
        );
        dispatch(
          uiControllerActions.setCurrentPage({
            isShow: false,
            currentPage: "addMealPage",
          })
        );
      }}
      className="cursor-pointer"
    >
      <div className="flex-col group rounded-3xl mb-2 mt-2 md:m-5 w-full min-h-36 md:w-72 md:min-h-80 flex items-center justify-center flex-wrap content-start bg-gray-50 border hover:shadow-xl hover:scale-105 shadow-xs ease-in-out duration-500 overflow-hidden">
        <div className="w-full justify-center items-center bg-white shadow-inner group-hover:shadow-white duration-1000">
          <img
            alt="pizza!"
            src={meal.uploadImageUrl}
            className=" h-32 w-full md:h-64 object-contain drop-shadow-md group-hover:drop-shadow-xl p-5 group-hover:scale-105 group-hover:rotate-3 ease-in-out duration-500"
          ></img>
        </div>
        <div className="mt-4 group-hover:tracking-wide flex justify-center items-center align-middle text-center text-zinc-600 font-display text-xl ease-in-out duration-500 font-semibold">
          {meal.mealSize === "xl" && "Large "}
          {meal.mealSize === "md" && "Medium "}
          {meal.mealSize === "sm" && "Small "}
          Size {meal.mealName}&nbsp;
        </div>
        <div className="font-sans text-center p-3 pb-2 pt-2 text-zinc-600 font-medium text-xs md:text-xs">
          {meal.mealIngredients.join(", ")}
        </div>
        <div className="flex justify-center items-end w-32 mb-6 bg-white text-zinc-600 p-1 pl-4 pr-4 rounded-xl  mr-0 md:mr-5 font-display border shadow-inner">
          <span className="text-2xl">
            {meal.mealSizePrice.toString().split(",")[0]}
          </span>
          <span className="text-xl">
            {meal.mealSizePrice.toString().split(",")[1] === undefined
              ? ""
              : "," + meal.mealSizePrice.toString().split(",")[1]}
          </span>
          <span className="text-xl">&nbsp;€</span>
        </div>
        <button className="p-2 bg-custom-red text-white pl-4 rounded-lg pr-4 mb-6 ease-in-out duration-500 group-hover:drop-shadow-lg group-hover:text-slate-50">
          Add
        </button>
      </div>
    </Link>
  );
};

export default MealList;
