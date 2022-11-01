import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebaseConfig";
import FormInput from "./ui/forms/FormInput";
import moment from "moment";
import Loading from "./ui/Loading";

const CartForm = () => {
  const uiController = useSelector((store) => store.uiController);
  const totalCartPrice = uiController.totalCartPrice;
  const cartItems = uiController.cartItems;
  const [isFormUploading, setIsFormUploading] = useState(false);
  const navigate = useNavigate();

  let orderUserName;
  let orderPhone;
  let orderAddress;
  let orderNote;
  const onFormBlurHandler = (inputValue, inputWhere) => {
    switch (inputWhere) {
      case "Name Last Name:":
        orderUserName = inputValue;
        break;
      case "Phone:":
        orderPhone = inputValue;
        break;
      case "Address:":
        orderAddress = inputValue;
        break;
      case "Note:":
        orderNote = inputValue;
        break;

      default:
        break;
    }
  };

  const formSender = async (event) => {
    event.preventDefault();
    if (
      orderAddress === undefined ||
      orderPhone === undefined ||
      orderAddress === undefined ||
      orderNote === undefined
    ) {
      return;
    }
    setIsFormUploading(true);
    const dateNow = new Date();
    const m1 = moment(dateNow).format("DD-MM-YYYY-hh-mm-ss");
    try {
      const response = await addDoc(collection(db, "Orders"), {
        orderUserName,
        orderPhone,
        orderAddress,
        orderNote,
        orderDate: m1,
        cartItems,
        totalCartPrice,
        orderProgress: 0,
      });
      navigate(`/order/${response.id}`);
    } catch (error) {
      console.log("Error: " + error);
      setIsFormUploading(false);
    }
  };

  return (
    <form>
      <div className="page">
        <div className="w-full text-center pb-5 font-display text-3xl flex-row underline mt-2 md:mt-20">
          Order Form:
        </div>
        <div className="bg-zinc-50 w-full max-w-7xl m-auto flex justify-center items-center flex-col border rounded-xl shadow-md p-5 md:p-10">
          <div className="w-full max-w-3xl p-4">
            <FormInput
              formPlaceHolder="Name Last Name:"
              onFormBlur={onFormBlurHandler}
            />
            <FormInput
              formPlaceHolder="Phone:"
              onFormBlur={onFormBlurHandler}
            />
            <FormInput
              formPlaceHolder="Address:"
              onFormBlur={onFormBlurHandler}
            />
            <FormInput formPlaceHolder="Note:" onFormBlur={onFormBlurHandler} />
          </div>
        </div>
        <div className="w-full text-center pb-5 font-display text-3xl flex-row underline mt-2 md:mt-5">
          Cart:
        </div>
        <div className="bg-zinc-50 w-full max-w-7xl m-auto flex justify-center items-center flex-row border rounded-xl shadow-md p-4">
          <div className="w-full max-w-3xl p-4 pt-0">
            <div className="p-4  font-serif">
              {uiController.cartItems.map((item) => (
                <ul
                  className="text-center font-light font-sans tracking-wider"
                  key={item.mealId}
                >
                  {item.mealQuantity}x {item.mealSize.toUpperCase()}{" "}
                  {item.mealName} / {item.mealPrice} €
                </ul>
              ))}
            </div>

            <p className="w-full text-center pb-5 font-display text-xl">
              Toplam Tutar: <b>{totalCartPrice.toFixed(2)} €</b>
            </p>
            <button
              type="submit"
              onClick={formSender}
              className={`flex m-auto justify-evenly items-center bg-green-500 w-2/5 h-14 text-white rounded-xl hover:bg-green-600 duration-500 cursor-pointer select-none ${
                isFormUploading && "pointer-events-none"
              }`}
            >
              {isFormUploading ? (
                <Loading size={8} />
              ) : (
                <span>Order Now {">"}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CartForm;
