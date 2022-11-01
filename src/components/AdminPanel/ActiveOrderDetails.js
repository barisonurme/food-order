import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { GiFullPizza, GiFlame, GiScooter, GiCheckMark } from "react-icons/gi";
import { MdKeyboardArrowUp } from "react-icons/md";
import { db } from "../../config/firebaseConfig";

const ActiveOrderDetails = (props) => {
  const { order, orders, onSetOrders, activeOrderModalActive } = props;

  const shownHandler = (orderId) => {
    const orderRef = doc(db, "Orders", orderId);
    setDoc(orderRef, { showDetails: !activeOrderModalActive }, { merge: true });
  };
  const orderProgressHandler = (orderId, orderProgress) => {
    const orderRef = doc(db, "Orders", orderId);
    setDoc(orderRef, { orderProgress }, { merge: true });

    let updatedOrders = [];
    orders.forEach((order) => {
      if (order.orderId === orderId) {
        order.order.orderProgress = orderProgress;
        updatedOrders.push(order);
      } else {
        updatedOrders.push(order);
      }
    });
    onSetOrders(updatedOrders);
  };
  const OrderMeals = (props) => {
    const { meals } = props;
    return (
      <div className="flex flex-col justify-center items-start">
        {meals.order.cartItems.map((meal) => (
          <div
            key={meal.mealId}
            className="flex flex-row border border-slate-400 rounded-2xl p-1 pl-4 mt-1 bg-slate-200 w-full shadow-md"
          >
            <div className="flex justify-center items-center">
              {"> "}
              {meal.mealName} {meal.mealSize.toUpperCase()}
            </div>
            <MealIngredientsHandler meal={meal} />
          </div>
        ))}
      </div>
    );
  };

  const MealIngredientsHandler = (prob) => {
    return (
      <div className="flex flex-wrap pl-2">
        {prob.meal.mealIngredients.map((ing) => (
          <div
            key={prob.meal.mealIngredients + Math.random()}
            className={`${
              prob.meal.desiredIngredients[
                prob.meal.mealIngredients.indexOf(ing)
              ] === false
                ? "line-through"
                : ""
            } m-1 bg-slate-50 rounded-lg border  border-slate-300 p-1 pl-2 pr-2 text-xs`}
          >
            {ing}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div
        className={`flex w-full flex-col duration-300  ${
          activeOrderModalActive ? "h-[770px]" : "h-12"
        } `}
      >
        <div
          onClick={() => shownHandler(order.orderId)}
          className={`flex w-max-5xl sticky justify-between items-center p-4 ${
            activeOrderModalActive === undefined
              ? "bg-green-600"
              : "bg-custom-blue"
          } duration-300 text-white top-0 cursor-pointer z-30 text-xs`}
        >
          <div className="flex whitespace-nowrap overflow-hidden">
            <div
              className={`w-3 h-3 bg-green-800 rounded-full flex mr-2 animate-pulse ${
                activeOrderModalActive !== undefined && "hidden"
              }`}
            ></div>
            <div>
              <span className="font-bold">Time:</span>
              <span className="uppercase font-light">
                &nbsp;{order.order.orderDate}
              </span>
            </div>
            <div>
              <span className="font-bold">
                &nbsp;&nbsp;&nbsp;&nbsp;Order ID:&nbsp;&nbsp;
              </span>
              <span className="uppercase  font-light">{order.orderId}</span>
            </div>
          </div>
          <MdKeyboardArrowUp
            className={`duration-300 ${
              activeOrderModalActive ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <div className="  flex-col shadow-sm border border-gray-100 flex w-full m-auto">
          <div className="flex flex-col w-full m-auto">
            <div className="flex flex-row text-sm">
              <div className="flex-1 flex-grow bg-slate-100 shadow-sm border rounded-xl m-2 border-zinc-500 p-4">
                <span className="font-bold ">Costumer: </span>
                <span className="">{order.order.orderUserName}</span>
              </div>
              <div className="ml-1 flex-1 flex-grow bg-slate-100 shadow-sm border rounded-xl m-2 border-zinc-500 p-4">
                <span className="font-bold">Phone: </span>
                <span>{order.order.orderPhone}</span>
              </div>
            </div>
            <div className="bg-slate-100 shadow-sm border rounded-xl m-2 border-zinc-500 p-4 mt-2 mb-2">
              <span className="font-bold">Address: </span>
              <span>{order.order.orderAddress}</span>
            </div>
            <div className="bg-slate-100 shadow-sm border rounded-xl m-2 border-zinc-500 p-4 mt-2 mb-2">
              <span className="font-bold">Order: </span>
              <div className="max-h-56  overflow-y-auto border border-zinc-500 p-4 shadow-inner scrollbar-hide rounded-xl bg-slate-300">
                <OrderMeals meals={order} />
              </div>
            </div>
            <div className="bg-slate-100 shadow-sm border rounded-xl m-2 border-zinc-500 p-4 mt-2 mb-2">
              <span className="font-bold">Order Time: </span>
              <span>{order.order.orderDate}</span>
            </div>
            <div className="bg-slate-100 shadow-sm border rounded-xl m-2 border-zinc-500 p-4 mt-2 mb-2">
              <span className="font-bold">Order Note: </span>
              <span>{order.order.orderNote}</span>
            </div>
            <div className="bg-slate-100 shadow-sm border rounded-xl m-2 border-zinc-500 p-4 mt-2 mb-2">
              <span className="font-bold">Total Price: </span>
              <span>{order.order.totalCartPrice} €</span>
            </div>
            <div className="flex justify-around items-center flex-row">
              <div className="flex justify-center p-4 hover:text-gray-500 cursor-pointer">
                Cancel Order
              </div>
              <div className="flex justify-center p-4 hover:text-gray-500 cursor-pointer">
                Mark as not Active
              </div>
            </div>
          </div>
        </div>

        {/* Order Progress */}
        <div className="flex flex-row w-full text-sm bg-slate-100 flex-1 sticky bottom-0">
          <div
            onClick={() => {
              orderProgressHandler(order.orderId, 0);
            }}
            className={`h-24 ${
              order.order.orderProgress === 0
                ? "bg-green-500 hover:bg-green-600"
                : "bg-slate-400 hover:bg-gray-500"
            }  cursor-pointer text-white  flex flex-col flex-grow justify-center items-center`}
          >
            <span className="text-lg font-display font-black">
              <GiFullPizza size={35} />
            </span>
            <span className="text-lg  font-bold">Preparing</span>
          </div>
          <div
            onClick={() => {
              orderProgressHandler(order.orderId, 1);
            }}
            className={`h-24 ${
              order.order.orderProgress === 1
                ? "bg-green-500 hover:bg-green-600"
                : "bg-slate-400 hover:bg-gray-500"
            }  cursor-pointer text-white  flex flex-col flex-grow justify-center items-center`}
          >
            <span className="text-lg font-display font-black">
              <GiFlame size={25} />
            </span>
            <span className="text-lg font-bold">In Oven</span>
          </div>
          <div
            onClick={() => {
              orderProgressHandler(order.orderId, 2);
            }}
            className={`h-24 ${
              order.order.orderProgress === 2
                ? "bg-green-500 hover:bg-green-600"
                : "bg-slate-400 hover:bg-gray-500"
            }  cursor-pointer text-white  flex flex-col flex-grow justify-center items-center`}
          >
            <span className="text-lg font-display font-black">
              <GiScooter size={35} />
            </span>
            <span className="text-lg font-bold">On the Way</span>
          </div>
          <div
            onClick={() => {
              orderProgressHandler(order.orderId, 3);
            }}
            className={`h-24 ${
              order.order.orderProgress === 3
                ? "bg-green-500 hover:bg-green-600"
                : "bg-slate-400 hover:bg-gray-500"
            }  cursor-pointer text-white flex flex-col flex-grow justify-center items-center`}
          >
            <span className="text-lg font-display font-black">
              <GiCheckMark size={25} />
            </span>
            <span className="text-lg font-bold">Completed</span>
          </div>
        </div>
        {/* {ReactDOM.createPortal(
            <Backdrop modalActive={true} onBackdropClose={onBackdropClose} />,
            document.getElementById("backdrop")
          )} */}
      </div>
    </>
  );
};

export default ActiveOrderDetails;
