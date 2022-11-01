import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiControllerActions } from "../store/uiControllerSlice";
import CartItems from "./CartItems";

import { Link } from "react-router-dom";
// import autoAnimate from '@formkit/auto-animate';

const Cart = () => {
  const dispatch = useDispatch();
  const uiController = useSelector((store) => store.uiController);
  const cartItems = uiController.cartItems;
  const totalCartPrice = uiController.totalCartPrice;

  function totalCartPriceCalc() {
    dispatch(uiControllerActions.totalCartPriceCalc());
  }

  useEffect(() => {
    totalCartPriceCalc();
    // eslint-disable-next-line
  }, [cartItems]);

  // const parent = useRef(null);
  // useEffect(() => {
  //   parent.current && autoAnimate(parent.current);
  // }, [parent]);

  return (
    <div className="page">
      <div className="flex justify-between w-full h-14 md:h-20 items-center align-middle">
        <div className="flex m-auto items-center align-middle justify-between max-w-4xl w-full">
          {/* Back to Main Page Button*/}
          <Link
            to="/"
            onClick={() => {
              dispatch(
                uiControllerActions.setCurrentPage({
                  isShow: false,
                  currentPage: "mainPage",
                })
              );
            }}
            className="flex justify-center items-center ml-5 md:ml-0 w-10 h-10 bg-slate-50 border rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="m10.725 19.3-6.5-6.5q-.175-.175-.25-.375-.075-.2-.075-.425 0-.225.075-.425.075-.2.25-.375l6.5-6.5q.325-.3.788-.313.462-.012.812.313.35.325.363.8.012.475-.338.8L7.8 10.85h10.675q.475 0 .813.338.337.337.337.812 0 .475-.337.812-.338.338-.813.338H7.8l4.55 4.55q.325.3.338.788.012.487-.338.812-.325.325-.8.325-.475 0-.825-.325Z" />
            </svg>
          </Link>

          <div className="flex font-display text-gray-700  text-base md:text-3xl">My Cart</div>
          <div className="w-10 mr-5" />
        </div>
      </div>
      <hr />
      <div>
        <div className="w-full h-8"></div>
        {cartItems.length === 0 ? (
          <div className="flex w-11/12 max-w-7xl items-center justify-center align-middle m-auto bg-gray-50 h-96 border rounded-xl">
            <p className="">Cart is Empty.</p>
          </div>
        ) : (
          <>
            {/* <div className="hidden md:flex justify-between items-center font-display max-w-4xl text-xl h-16 bg-stone-50 m-auto rounded-xl border">
              <div>
                <span className="ml-16">Sepet Tutarı:</span>
                <span className="ml-2 font-light">150&nbsp;TL</span>
              </div>
              <button className="flex items-center justify-center mr-4 text-base p-2 bg-custom-red text-white pl-4 pr-4 rounded-lg">
                Siparişi Tamamla
              </button>
            </div> */}
          </>
        )}
        {cartItems.map((item) => (
          <CartItems key={item.mealId} cartItems={item} />
        ))}
      </div>
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.1) 100%)",
        }}
        className="fixed w-full h-4 bottom-20"
      ></div>
      <div className="fixed bottom-0 w-full m-auto mt-6 bg-white shadow-xl">
        <div className="max-w-4xl m-auto">
          <div className="flex m-auto  tracking-wider">
            <span className="flex justify-center items-center text-xl w-3/5">
              <span className="font-display">Total Price:</span>
              <span className="font-display font-light">
                &nbsp;&nbsp;{totalCartPrice.toFixed(2)}&nbsp;€
              </span>
            </span>
            <Link
              to="form"
              className="flex justify-evenly items-center m-4 bg-green-500 w-2/5 h-14 text-white rounded-xl"
            >
              <span>Finish Order {">"}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-32"></div>
    </div>
  );
};

export default Cart;
