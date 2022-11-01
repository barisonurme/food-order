import React from "react";
import ReactDOM from "react-dom";

import { Routes, Route, useLocation, Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import "./App.css";

import Navigator from "./components/Navigator";
import Header from "./components/Header";
import Meals from "./components/meals/Meals";
import Footer from "./components/Footer";
import UpperNav from "./components/UpperNav";
import LiveChat from "./LiveChat";
import InfoModal from "./components/ui/modal/InfoModal";
import AddMeal from "./components/meals/AddMeal";
import Cart from "./components/Cart";
import GoToCart from "./components/GoToCart";
import Register from "./components/Register";
import Login from "./components/Login";
import Modal from "./components/ui/modal/Modal";

// import Drinks from './components/Drinks';
// import AboutPage from './pages/AboutPage';
// import Location from './components/ui/modal/Location';
import AdminPanel from "./components/AdminPanel/AdminPanel";
import OrderCompleted from "./components/OrderCompleted";
import CartForm from "./components/CartForm";

function App() {
  const location = useLocation();
  const error404 = (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <p className="flex m-auto text-2xl mt-10">Nothing to Show!</p>
      <Link
        className="flex m-auto mt-10 border p-2 pr-4 pl-4 rounded-md text-white bg-gray-800"
        to="/"
      >
        Back to Main Page
      </Link>
    </div>
  );

  return (
    <div className="App">
      <Modal />
      <UpperNav />
      <Navigator />
      {ReactDOM.createPortal(
        <InfoModal />,
        document.getElementById("infoModal")
      )}
      <TransitionGroup>
        <CSSTransition key={location.key} timeout={1000} classNames="fade">
          <Routes location={location}>
            <Route
              path="/"
              element={
                <div className="page">
                  <LiveChat />
                  <Header />
                  <GoToCart />
                  <Meals />
                  {/* <Location /> */}
                  <Footer />
                </div>
              }
            />
            <Route path="cart" element={<Cart />} />
            <Route path="cart/form" element={<CartForm />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="add-meal" element={<AddMeal />} />
            <Route path="admin" element={<AdminPanel />} />
            <Route path="order/:orderId" element={<OrderCompleted />} />
            <Route path="*" element={error404} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
