import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { uiControllerActions } from '../store/uiControllerSlice';

const Navigator = () => {
  const [isNavBgActive, setIsNavBgActive] = useState(false);
  window.onscroll = function () {
    let top = window.pageYOffset || document.documentElement.scrollTop;
    if (top <= 46) {
      setIsNavBgActive(false);
    }
    if (top > 47) {
      setIsNavBgActive(true);
    }
  };

  const dispatch = useDispatch();
  const uiController = useSelector((store) => store.uiController);
  let totalCartItem = uiController.totalCartItem;

  const [cartHighlighted, setCartHighlighted] = useState(false);

  const cartItems = uiController.cartItems;

  const localCartItems = JSON.parse(localStorage.getItem('cartItems'));

  useEffect(() => {
    if (cartItems.length === 0 && localStorage.getItem('cartItems') !== null) {
      dispatch(
        uiControllerActions.setLocalCartItemsAsCartItems(localCartItems)
      );
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (totalCartItem > 0) setCartHighlighted(true);
    setTimeout(() => {
      setCartHighlighted(false);
    }, 1000);
  }, [totalCartItem]);

  return (
    <>
      {isNavBgActive && (
        <div className="flex max-w-7xl text-slate-400 m-auto h-24" />
      )}
      <div
        className={`bg-custom-blue ${
          isNavBgActive && 'fixed  top-0 w-full z-10 duration-1000'
        }`}
      >
        <div
          className={`flex max-w-7xl text-slate-400 m-auto ${
            !isNavBgActive ? 'h-24' : 'h-16'
          }  duration-300`}
        >
          <Link
            to="/"
            className="flex-1 flex font-mono  items-center ml-10   justify-start text-left items-left "
          >
            <div
              className="cursor-pointer select-none"
              onClick={() => {
                dispatch(
                  uiControllerActions.setCurrentPage({
                    isShow: false,
                    currentPage: 'mainPage',
                  })
                );
              }}
            >
              <div className="font-black font-serif text-slate-50 text-3xl">
                <span className="text-custom-red">Pizzaria</span>
              </div>
              <div className="ml-4 origin-top-bottom -mt-2 -rotate-3 font-Caveat text-lg text-slate-50">
                Slice of Happiness!
              </div>
            </div>
          </Link>
          <div className="flex-1  flex justify-end items-center">
            <>
              <button
                onClick={() => {
                  dispatch(
                    uiControllerActions.setModalActive({
                      modalType: 'login',
                      modalActive: true,
                    })
                  );
                }}
                className="hidden md:flex h-10 pl-10 pr-10 pb-1 mr-5 font-display rounded-xl border-2 text-white font-bold text-lg hover:bg-custom-red hover:text-white hover:shadow-sm duration-500 ease-in-out items-center hover:border-custom-red hover:shadow-custom-red"
              >
                Login
              </button>
              <Link
                to="cart"
                onClick={() => {
                  dispatch(
                    uiControllerActions.setCurrentPage({
                      isShow: false,
                      currentPage: 'cartPage',
                    })
                  );
                }}
                className="group p-3 w-12 mr-10 h-12 m-1 mt-3 mb-3 font-body rounded-full bg-slate-100 text-gray-800 font-bold text-lg hover:shadow-xl duration-500 ease-in-out hover:bg-custom-red"
              >
                <div
                  className={`absolute opacity-50 ${
                    totalCartItem > 0 ? 'bg-custom-red' : 'bg-gray-600'
                  }   rounded-full h-4 w-4 text-xs mt-5 ml-5 text-white ${
                    cartHighlighted ? 'animate-adding-item-bg' : ''
                  }`}
                />
                <div
                  className={`absolute ${
                    totalCartItem > 0 ? 'bg-custom-red' : 'bg-gray-600'
                  }  rounded-full h-4 w-4 text-xs mt-5 ml-5 text-white ${
                    cartHighlighted ? 'animate-adding-item' : ''
                  }`}
                >
                  <div className="flex justify-center items-center">
                    {totalCartItem}
                  </div>
                </div>
                <svg
                  className="fill-gray-600 group-hover:fill-white"
                  xmlns="http://www.w3.org/2000/svg"
                  height="24"
                  width="24"
                >
                  <path d="M6.85 21.625q-.75 0-1.275-.525-.525-.525-.525-1.275 0-.775.525-1.287.525-.513 1.275-.513.775 0 1.287.513.513.512.513 1.287 0 .75-.513 1.275-.512.525-1.287.525Zm10 0q-.775 0-1.288-.525-.512-.525-.512-1.275 0-.775.512-1.287.513-.513 1.288-.513.75 0 1.275.513.525.512.525 1.287 0 .75-.525 1.275-.525.525-1.275.525Zm-10-5.1q-1.075 0-1.562-.913Q4.8 14.7 5.275 13.8l1.4-2.575L3 3.45H1.85q-.325 0-.562-.238-.238-.237-.238-.587t.238-.588q.237-.237.587-.237h1.45q.35 0 .6.175t.4.45L5 3.8h14.35q.7 0 .987.55.288.55-.012 1.075l-3.35 6.05q-.25.475-.675.737-.425.263-.95.263H7.9L6.975 14.1q-.15.225 0 .5t.425.275h10.5q.3 0 .55.238.25.237.25.587 0 .325-.25.575-.25.25-.575.25Z" />
                </svg>
              </Link>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigator;
