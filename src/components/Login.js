import React from 'react';

import { Link } from 'react-router-dom';

const Login = () => {
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
          <div className="flex font-display text-gray-700">Login</div>
          <div className="w-10 mr-5" />
        </div>
      </div>
      <hr />
      <div className="page flex flex-col m-auto w-full justify-center items-center align-middle">
        <div className="flex flex-col m-10 max-w-5xl border rounded-xl p-10 shadow-lg">
          <div className="flex flex-row border rounded-xl shadow-inner bg-gray-100">
            <Link
              to="/login"
              className="flex text-2xl tracking-wide w-1/2 text-center m-2 h-12 justify-center items-center border bg-white rounded-lg shadow-md font-display"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="flex text-2xl tracking-wider  w-1/2 text-center m-2 h-12 justify-center items-center text-gray-200 font-display font-light"
            >
              Register
            </Link>
          </div>
          <form className="flex flex-col">
            <div className="flex flex-col">
              <label className="mt-10 ml-2">E-mail:</label>
              <input
                placeholder="email@mail.com"
                type="mail"
                className="border w-96 h-10 pl-4 mt-2 font-sans"
              ></input>
              <label className="mt-4 ml-2">Password:</label>
              <input
                placeholder="****"
                type="password"
                className="border w-96 h-10 pl-4 mt-2 font-sans"
              ></input>
              <button className="p-2 pl-4 pr-4 bg-custom-red  w-1/2 m-auto mt-4 rounded-md text-white">
                Login
              </button>
              <p className="w-full text-center mt-4">or</p>
            </div>
            <button className=" border flex h-12 w-64  m-auto items-center justify-center bg-slate-50 shadow-sm rounded-3xl mt-4">
              <div>
                <svg
                  className="h-4 w-4"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <g>
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    ></path>
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    ></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </g>
                </svg>
              </div>
              <div className="ml-4">Login with Google</div>
            </button>
            <button className=" border flex h-12 w-64 m-auto mt-4 mb-4 items-center justify-center bg-slate-50 shadow-sm rounded-3xl">
              <div>
                <svg
                  className="h-4 w-4 flex justify-center items-center"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g>
                    <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z"></path>
                  </g>
                </svg>
              </div>
              <div className="ml-4">Login with Apple</div>
            </button>
            <span className="flex m-auto mt-4">
              Don have an account?
              <Link
                to="/register"
                className="font-bold hover:text-custom-red duration-500"
              >
                &nbsp;Register&nbsp;
              </Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
