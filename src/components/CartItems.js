import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { uiControllerActions } from '../store/uiControllerSlice';

const CartItems = (props) => {
  const [deleteItemAnimActive, setDeleteItemAnimActive] = useState(false);
  const [CSSTransitionActive, SetCSSTransitionActive] = useState(false);

  const { cartItems } = props;

  const uiController = useSelector((store) => store.uiController);

  const dispatch = useDispatch();
  const deleteItemAnimHandler = () => {
    setDeleteItemAnimActive(true);
    setTimeout(() => {
      SetCSSTransitionActive(true);
    }, 300);
    setTimeout(() => {
      dispatch(
        uiControllerActions.setInfoModal({
          infoModalActive: true,
          infoModalText: 'Meal Deleted',
          infoModalColor: 'red',
        })
      );
      dispatch(uiControllerActions.removeItemFromCart(cartItems.mealId));
    }, 1000);
  };
  return (
    <CSSTransition
      in={!CSSTransitionActive}
      unmountOnExit
      timeout={1000}
      classNames="deleteItem"
    >
      <div className="flex justify-center items-center m-auto max-w-4xl border rounded-2xl shadow-sm p-1 mt-2">
        {/* Quantity */}
        <div className=" ml-4 flex flex-col items-center justify-between  p-1 ">
          <div
            onClick={() => {
              dispatch(
                uiControllerActions.setCartItemAmount({
                  arrayNumber: uiController.cartItems.indexOf(cartItems),
                  operationType: 'increase',
                })
              );
              dispatch(uiControllerActions.setTotalCartItem());
              dispatch(
                uiControllerActions.setInfoModal({
                  infoModalActive: true,
                  infoModalText: 'Updated',
                  infoModalColor: 'green',
                })
              );
            }}
            className="bg-custom-red text-white rounded-full h-6 w-6 pb-1 flex items-center justify-center mr-4 text-md font-extrabold select-none cursor-pointer"
          >
            +
          </div>
          <div className="flex p-1 items-center text-lg font-black mr-4 text-gray-600">
            {cartItems.mealQuantity}
          </div>
          <div
            onClick={() => {
              dispatch(
                uiControllerActions.setCartItemAmount({
                  arrayNumber: uiController.cartItems.indexOf(cartItems),
                  operationType: 'decrease',
                })
              );
              dispatch(uiControllerActions.setTotalCartItem());
              if (cartItems.mealQuantity === 1) {
                dispatch(
                  uiControllerActions.setModalActive({
                    modalType: 'removeItemFromCart',
                    modalActive: true,
                  })
                );
                dispatch(
                  uiControllerActions.whichItemToRemove(cartItems.mealId)
                );
              } else {
                dispatch(
                  uiControllerActions.setInfoModal({
                    infoModalActive: true,
                    infoModalText: 'Updated',
                    infoModalColor: 'green',
                  })
                );
              }
            }}
            className="bg-gray-300 text-white border rounded-full h-6 w-6 flex items-center justify-center mr-4 text-lg font-extrabold select-none cursor-pointer"
          >
            -
          </div>
        </div>
        <div
          key={cartItems.mealId}
          className="flex w-full overflow-hidden flex-nowrap"
        >
          <div
            className={`flex-nowrap overflow-hidden ${
              deleteItemAnimActive ? 'w-0' : 'w-full'
            } duration-700`}
          >
            <div className="flex flex-nowrap whitespace-nowrap overflow-hidden text-xl text-gray-600 md:text-2xl mb-2 ml-6 font-display">
              {`${cartItems.mealSize === 'sm' ? 'Small Size' : ''}`}
              {`${cartItems.mealSize === 'md' ? 'Medium Size' : ''}`}
              {`${cartItems.mealSize === 'xl' ? 'Large Size' : ''}`}
              {/* Meal Name */}
              <span className="hidden md:flex-col">&nbsp;Boy</span>&nbsp;
              <div className="whitespace-nowrap overflow-hidden">
                {cartItems.mealName}&nbsp;
              </div>
              {/* Meal Price */}
              <span className="items-end text-xl font-light justify-end flex">
                {cartItems.mealPrice.toString().split('.')[0]}
              </span>
              <span className="items-end text-lg font-light  justify-end flex">
                {'.' + cartItems.mealPrice.toString().split('.')[1]}
              </span>
              <span className="items-end text-lg font-light  justify-end flex">&nbsp;€</span>
            </div>
            <div
              className={`flex grow ${
                deleteItemAnimActive
                  ? 'flex-nowrap'
                  : 'flex-nowrap overflow-hidden'
              } ml-2 max-w-lg mb-4`}
            >
              {cartItems.mealIngredients.map((ing) => (
                <div
                  key={cartItems.mealIngredients.indexOf(ing)}
                  className={`${
                    cartItems.desiredIngredients[
                      cartItems.mealIngredients.indexOf(ing)
                    ] === false
                      ? 'line-through opacity-50'
                      : ''
                  } m-1 bg-gray-50 border rounded-lg p-1 pl-2 pr-2 text-xs`}
                >
                  {ing}
                </div>
              ))}
            </div>
          </div>
          <div
            onClick={deleteItemAnimHandler}
            className={`${
              deleteItemAnimActive ? ' w-full' : 'bg-gray-300 w-16'
            } duration-500  ease-in-out flex justify-center items-center hover:bg-custom-red select-none cursor-pointer rounded-xl`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="40"
              width="40"
              className={`${
                deleteItemAnimActive ? 'animate-delete-item-can' : ''
              } fill-white`}
            >
              <path d="M8.4,32.2c0,0.8,0.3,1.4,0.8,2c0.5,0.5,1.2,0.8,1.9,0.8h17.8c0.7,0,1.4-0.3,1.9-0.8c0.5-0.6,0.8-1.2,0.8-2v-23H8.4V32.2z   M22,12.6h2.8v16.1H22V12.6z M15.2,12.6H18v16.1h-2.8V12.6z" />
              <polygon
                className={`${
                  deleteItemAnimActive ? 'animate-delete-item-top' : ''
                }`}
                points="25.3,6.4 25.3,5 14.7,5 14.7,6.4 6.7,6.4 6.7,9.2 8.4,9.2 31.6,9.2 33.3,9.2 33.3,6.4 "
              />
            </svg>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default CartItems;
