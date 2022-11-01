import React, { useRef } from 'react';

import { Link } from 'react-router-dom';

import { register, dataTest } from '../config/firebaseConfig';

const Register = () => {
  const userMailInput = useRef();
  const userPasswordInput = useRef();

  const registerUserHandler = async (e) => {
    e.preventDefault();
    await register(
      userMailInput.current.value,
      userPasswordInput.current.value
    );
    await dataTest();
  };

  return (
    <div className="page">
      <div className="flex justify-between w-full h-14 items-center align-middle">
        <div className="flex m-auto items-center align-middle justify-between max-w-5xl w-full">
          <Link
            to="/"
            className="flex justify-center items-center ml-5 w-10 h-10 bg-slate-50 border rounded-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
              <path d="m10.725 19.3-6.5-6.5q-.175-.175-.25-.375-.075-.2-.075-.425 0-.225.075-.425.075-.2.25-.375l6.5-6.5q.325-.3.788-.313.462-.012.812.313.35.325.363.8.012.475-.338.8L7.8 10.85h10.675q.475 0 .813.338.337.337.337.812 0 .475-.337.812-.338.338-.813.338H7.8l4.55 4.55q.325.3.338.788.012.487-.338.812-.325.325-.8.325-.475 0-.825-.325Z" />
            </svg>
          </Link>
          <div className="flex font-display text-gray-700">Register</div>
          <div className="w-10 mr-5" />
        </div>
      </div>
      <hr />
      <div className="flex m-auto w-full justify-center items-center align-middle">
        <div className="flex flex-col m-10 max-w-5xl border rounded-xl p-10 shadow-lg">
          <div className="flex flex-row border rounded-xl shadow-inner bg-gray-100">
            <Link
              to="/login"
              className="flex text-2xl tracking-wider  w-1/2 text-center m-2 h-12 justify-center items-center text-gray-200 font-display font-light"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="flex text-2xl tracking-wide w-1/2 text-center m-2 h-12 justify-center items-center border rounded-lg bg-white shadow-md font-display"
            >
              Register
            </Link>
          </div>
          <form onSubmit={registerUserHandler} className="flex flex-col">
            <label className="mt-10 ml-2">E-mail:</label>
            <input
              ref={userMailInput}
              placeholder="email@mail.com"
              type="mail"
              className="border w-96 h-10 pl-4 mt-2 font-sans"
            ></input>
            <label className="mt-4 ml-2">Password:</label>
            <input
              ref={userPasswordInput}
              placeholder="****"
              type="password"
              className="border w-96 h-10 pl-4 mt-2 font-sans"
            ></input>
            <label className="mt-4 ml-2">Phone Number:</label>
            <input
              placeholder="532 322 32 32"
              className="border w-96 h-10 pl-4 mt-2 font-sans"
            ></input>
            <button className="p-2 pl-4 pr-4 w-1/2 m-auto bg-custom-red mt-4 rounded-md text-white">
              Register
            </button>
            <span className="flex m-auto mt-4">
              Already have an account?
              <Link
                to="/login"
                className="font-bold hover:text-custom-red duration-500"
              >
                &nbsp;Login&nbsp;
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
