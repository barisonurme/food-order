import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GiFullPizza, GiFlame, GiScooter, GiCheckMark } from "react-icons/gi";
import { WiWindy } from "react-icons/wi";
import Loading from "./ui/Loading";
import { db } from "../config/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

const OrderCompleted = () => {
  const [isOrderLoaded, setIsOrderLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState([]);
  const [orderProgress, setOrderProgress] = useState();
  const { orderId } = useParams();

  useEffect(() => {
    getOrder();
    // eslint-disable-next-line
  }, [order]);

  const getOrder = onSnapshot(doc(db, "Orders/", `${orderId}`), (docSnap) => {
    if (docSnap.exists()) {
      setOrder(docSnap.data());
      console.log(docSnap.data());
      setOrderProgress(docSnap.data().orderProgress);
      setIsOrderLoaded(true);
    } else {
      // doc.data() will be undefined in this case
      setError("Order not found!");
    }
  });

  const MealIngredientsHandler = (prob) => {
    return (
      <div className="font-display font-light flex  flex-wrap">
        {prob.item.mealIngredients.map((ing) => (
          <div
            key={prob.item.mealIngredients + Math.random()}
            className={`${
              prob.item.desiredIngredients[
                prob.item.mealIngredients.indexOf(ing)
              ] === false
                ? "line-through"
                : ""
            } m-1 bg-gray-50 border rounded-lg p-1 pl-2 pr-2 text-xs`}
          >
            {ing}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="page mt-10">
      {!isOrderLoaded && !error && (
        <div className="p-10 flex text-center flex-col ">
          <Loading size={14} />
          <div className="mt-10 text-mono tracking-wider">
            Order Page is Loading...
          </div>
        </div>
      )}
      {error && (
        <div className="mt-10 text-mono tracking-wider w-full text-center">
          {error}
        </div>
      )}
      {isOrderLoaded && (
        <div className="bg-zinc-100 w-full max-w-7xl m-auto flex items-center flex-col rounded-3xl shadow-xl p-0 md:p-0 overflow-hidden border-8 border-gray-200">
          <div className="text-3xl md:text-5xl font-display w-full bg-custom-blue text-center justify-center items-center flex flex-col text-slate-100 p-4 md:p-10">
            Order Details
            <div className="text-sm  mt-4 font-light tracking-wider">
              ORDER NO: {orderId.toUpperCase()}
            </div>
          </div>
          <div className="flex flex-col max-w-7xl w-full justify-center items-center">
            <div className="flex w-full max-w-2xl justify-start items-start flex-row">
              <div className="text-xs md:text-base font-light max-w-2xl flex text-left  border-4 border-zinc-100  font-display md:w-4xl mt-2 translate-x-5 translate-y-4 bg-zinc-100">
                Order Date:
              </div>
            </div>
            <div className="border border-slate-300  rounded-2xl text-xl md:text-xl  font-display md:w-4xl text-left justify-center items-left flex flex-col  m-5 mt-0 mb-1 ml-1 p-3 pl-6 w-full max-w-2xl">
              {order.orderDate}
            </div>
          </div>
          <div className="flex flex-col max-w-7xl w-full justify-center items-center">
            <div className="flex w-full max-w-2xl justify-start items-start flex-row">
              <div className="text-xs md:text-base font-light max-w-2xl flex text-left  border-4 border-zinc-100  font-display md:w-4xl mt-2 translate-x-5 translate-y-4 bg-zinc-100">
                Phone Number:
              </div>
            </div>
            <div className="border border-slate-300  rounded-2xl text-xl md:text-xl  font-display md:w-4xl text-left justify-center items-left flex flex-col  m-5 mt-0 mb-1 ml-1 p-3 pl-6 w-full max-w-2xl">
              {order.orderPhone}
            </div>
          </div>
          <div className="flex flex-col max-w-7xl w-full justify-center items-center">
            <div className="flex w-full max-w-2xl justify-start items-start flex-row">
              <div className="text-xs md:text-base font-light max-w-2xl flex text-left  border-4 border-zinc-100  font-display md:w-4xl mt-2 translate-x-5 translate-y-4 bg-zinc-100">
                Adress:
              </div>
            </div>
            <div className="border border-slate-300  rounded-2xl text-xl md:text-xl  font-display md:w-4xl text-left justify-center items-left flex flex-col  m-5 mt-0 mb-1 ml-1 p-3 pl-6 w-full max-w-2xl">
              {order.orderAddress}
            </div>
          </div>
          <div className="flex flex-col max-w-7xl w-full justify-center items-center">
            <div className="flex w-full max-w-2xl justify-start items-start flex-row">
              <div className="text-xs md:text-base font-light max-w-2xl flex text-left  border-4 border-zinc-100  font-display md:w-4xl mt-2 translate-x-5 translate-y-4 bg-zinc-100">
                Note:
              </div>
            </div>
            <div className="border border-slate-300  rounded-2xl text-xl md:text-xl  font-display md:w-4xl text-left justify-center items-left flex flex-col  m-5 mt-0 mb-1 ml-1 p-3 pl-6 w-full max-w-2xl">
              {order.orderNote}
            </div>
          </div>
          <div className="flex flex-col max-w-7xl w-full justify-center items-center">
            <div className="flex w-full max-w-2xl justify-start items-start flex-row">
              <div className="text-xs md:text-base font-light max-w-2xl flex text-left  border-4 border-zinc-100  font-display md:w-4xl mt-2 translate-x-5 translate-y-4 bg-zinc-100">
                Order:
              </div>
            </div>
            <div className="border border-slate-300 rounded-2xl p-5 text-xl md:text-xl  md:w-4xl text-left justify-center items-left flex flex-col w-full max-w-2xl">
              {order.cartItems.map((item) => (
                <div
                  key={item.mealId}
                  className="font-display flex m-2 p-5 pb-2 pt-2 border rounded-xl flex-wrap font-light text-md w-full border-slate-300"
                >
                  <div className="grow flex">
                    {" "}
                    {">"} {item.mealName} {item.mealSize.toUpperCase()}
                    <MealIngredientsHandler item={item} />
                  </div>
                  <div className="text-zinc-500 ">{item.mealPrice}€</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center w-full max-w-2xl text-3xl p-3 font-display font-light tracking-wide">
            Total: {order.totalCartPrice.toFixed(2)}€
          </div>
          <div className="w-full from-slate-800 to-transparent translate-y-4 h-4 bg-gradient-to-b z-20 opacity-10"></div>
          {/* Tack Progress */}
          <div className="flex flex-row w-full h-16 text-sm bg-slate-100 flex-1 select-none">
            <div
              className={`h-24 text-white  flex flex-col flex-grow justify-center items-center ${
                orderProgress >= 0 ? "bg-green-500" : "bg-slate-400"
              } duration-1000`}
            >
              <span className="text-lg font-display font-black">
                <GiFullPizza
                  size={35}
                  className={`${
                    orderProgress ===  0
                      ? "animate-spin-slow opacity-100"
                      : "opacity-50"
                  }`}
                />
              </span>
              <span
                className={`${
                  orderProgress >= 0 ? "opacity-100" : "opacity-50"
                } text-xs md:text-lg font-bold`}
              >
                Preparing
              </span>
            </div>
            <div
              className={`h-24 text-white  flex flex-col flex-grow justify-center items-center ${
                orderProgress >= 1 ? "bg-green-500" : "bg-slate-400"
              } duration-1000`}
            >
              <div className="flex flex-row w-full">
                <svg
                  className={`${
                    orderProgress >= 0 ? "fill-green-500" : "fill-slate-400"
                  } duration-1000`}
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.0"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 24 96"
                  style={{
                    height: "96px",
                    transform: `translate(-1px, 0px)`,
                    filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.1))",
                  }}
                >
                  <g>
                    <path d="M0.34,1.38l15.21,22.93c9.54,14.39,9.54,32.98,0,47.37L0.34,94.62V1.38z" />
                    <path d="M0.68,2.51L15.27,24.5c4.61,6.95,7.05,15.08,7.05,23.5c0,8.42-2.44,16.55-7.05,23.5L0.68,93.49l0-45.49    L0.68,2.51 M0,0.25L0,48l0,47.75l15.84-23.88l0,0c9.55-14.4,9.55-33.35,0-47.75l0,0L0,0.25L0,0.25z" />
                  </g>
                </svg>
                <div
                  className={`flex w-full flex-col md:just justify-end pb-6 md:pb-4 items-center ${
                    orderProgress >= 1 ? "opacity-100" : "opacity-100"
                  }`}
                >
                  <span className="text-lg font-display font-black mb-2">
                    <GiFlame
                      size={25}
                      className={`${
                        orderProgress ===  1
                          ? "animate-flame opacity-100"
                          : "opacity-50"
                      }`}
                    />
                  </span>
                  <span
                    className={`${
                      orderProgress >= 1 ? "opacity-100" : "opacity-50"
                    } text-xs md:text-lg  font-bold`}
                  >
                    In Oven
                  </span>
                </div>
              </div>
            </div>
            <div
              className={`h-24 text-white  flex flex-col flex-grow justify-center items-center ${
                orderProgress >= 2 ? "bg-green-500" : "bg-slate-400"
              } duration-1000`}
            >
              <div className="flex flex-row w-full">
                <svg
                  className={`${
                    orderProgress >= 1 ? "fill-green-500" : "fill-slate-400"
                  } duration-1000`}
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.0"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 24 96"
                  style={{
                    height: "96px",
                    transform: `translate(-1px, 0px)`,
                    filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.1))",
                  }}
                >
                  <g>
                    <path d="M0.34,1.38l15.21,22.93c9.54,14.39,9.54,32.98,0,47.37L0.34,94.62V1.38z" />
                    <path d="M0.68,2.51L15.27,24.5c4.61,6.95,7.05,15.08,7.05,23.5c0,8.42-2.44,16.55-7.05,23.5L0.68,93.49l0-45.49    L0.68,2.51 M0,0.25L0,48l0,47.75l15.84-23.88l0,0c9.55-14.4,9.55-33.35,0-47.75l0,0L0,0.25L0,0.25z" />
                  </g>
                </svg>
                <div
                  className={`flex w-full flex-col md:just justify-end pb-6 md:pb-4 items-center ${
                    orderProgress >= 2 ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <span className="text-lg font-display font-black flex  mb-1">
                    <WiWindy
                      size={35}
                      className={`${
                        orderProgress === 2 && "animate-wind"
                      } origin-right`}
                    />
                    <GiScooter
                      size={35}
                      className={`${
                        orderProgress ===  2 && "animate-scooter"
                      } -translate-x-4`}
                    />
                  </span>
                  <span className="text-xs md:text-lg font-bold">On the Way</span>
                </div>
              </div>
            </div>
            <div
              className={`h-24 text-white  flex flex-col flex-grow justify-center items-center ${
                orderProgress >= 3 ? "bg-green-500" : "bg-slate-400"
              } duration-1000`}
            >
              <div className="flex flex-row w-full">
                <svg
                  className={`${
                    orderProgress >= 2 ? "fill-green-500" : "fill-slate-400"
                  } duration-1000`}
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.0"
                  id="Layer_1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 24 96"
                  style={{
                    height: "96px",
                    transform: `translate(-1px, 0px)`,
                    filter: "drop-shadow(3px 5px 2px rgb(0 0 0 / 0.1))",
                  }}
                >
                  <g>
                    <path d="M0.34,1.38l15.21,22.93c9.54,14.39,9.54,32.98,0,47.37L0.34,94.62V1.38z" />
                    <path d="M0.68,2.51L15.27,24.5c4.61,6.95,7.05,15.08,7.05,23.5c0,8.42-2.44,16.55-7.05,23.5L0.68,93.49l0-45.49    L0.68,2.51 M0,0.25L0,48l0,47.75l15.84-23.88l0,0c9.55-14.4,9.55-33.35,0-47.75l0,0L0,0.25L0,0.25z" />
                  </g>
                </svg>
                <div
                  className={`flex w-full flex-col md:just justify-end pb-6 md:pb-4 items-center ${
                    orderProgress >= 3 ? "opacity-100" : "opacity-50"
                  }`}
                >
                  <span className="text-lg font-display font-black">
                    <GiCheckMark size={25} />
                  </span>
                  <span className="text-xs md:text-lg font-bold mt-1">Completed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCompleted;
