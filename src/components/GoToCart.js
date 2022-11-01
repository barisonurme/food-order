import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { uiControllerActions } from "../store/uiControllerSlice";

const GoToCart = () => {
  const dispatch = useDispatch();
  const uiController = useSelector((store) => store.uiController);
  return (
    <>
      {uiController.cartItems.length >= 1 && (
        <div
          onClick={() => {
            dispatch(
              uiControllerActions.setCurrentPage({
                isShow: false,
                currentPage: "cartPage",
              })
            );
          }}
          className="select-none cursor-pointer fixed bottom-8 right-10 z-20 w-1/2 md:w-96 bg-green-500 h-10 rounded-xl"
        >
          <Link to="/cart">
            <div className="flex justify-center align-middle items-center h-10 text-white">
              My Card&nbsp;&nbsp;&nbsp;
              <div className="flex justify-center items-center h-5 w-5 bg-white text-green-600 font-lighter text-xs rounded-full">
                {uiController.cartItems.length >= 1
                  ? uiController.cartItems.length
                  : "0"}
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default GoToCart;
