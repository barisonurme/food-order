import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import Backdrop from './Backdrop';

import { Link } from 'react-router-dom';

import { uiControllerActions } from '../../../store/uiControllerSlice';

const Modal = ({ onClose }) => {
  const dispatch = useDispatch();
  const backdropRoot = document.getElementById('backdrop');

  const uiController = useSelector((store) => store.uiController);
  const modalActive = uiController.modalShown;
  const modalType = uiController.modalContext;

  // Using CSSTransition instead of return null;
  //
  // if (!modalActive) return null;

  const [modalActiveBool, setModalActiveBool] = useState(false);

  let modalCtx = <p></p>;
  switch (modalType) {
    case 'login':
      modalCtx = (
        <div className="flex-row w-full align-middle items-center justify-center overflow-hidden">
          <div className="flex items-center justify-center  text-2xl font-bold text-white p-4 font-display mb-4 w-full">
            Giriş
          </div>
          <button className=" border flex h-12 w-64  m-auto items-center justify-center bg-slate-50 shadow-sm rounded-3xl">
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
            <div className="ml-4">Google ile giriş yap</div>
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
            <div className="ml-4">Apple ile giriş yap</div>
          </button>
          <div className="flex items-center justify-center mb-4 text-white">
            ya da
          </div>
          <Link
            onClick={() => {
              dispatch(
                uiControllerActions.setModalActive({ modalActive: false })
              );
            }}
            to="login"
            className="flex h-12 w-64 m-auto mt-4 mb-4 items-center justify-center bg-custom-red text-white  rounded-3xl"
          >
            <div className="ml-4">E-mail ile giriş yap</div>
          </Link>
        </div>
      );
      break;

    case 'removeItemFromCart':
      modalCtx = (
        <div className="flex flex-col">
          <div className="bg-white w-96 h-36 flex flex-col items-center justify-center border-4 rounded-2xl">
            <p className="flex items-center justify-center tracking-wider font-light text-white bg-gray-700 h-1/2 w-full rounded-t-2xl">
              Do you want to remove item from cart?
            </p>
            <div className="mt-2">
              <button
                onClick={() => {
                  dispatch(
                    uiControllerActions.removeItemFromCart(
                      uiController.whichItemToRemove
                    )
                  );
                  dispatch(
                    uiControllerActions.setModalActive({
                      modalActive: false,
                    })
                  );
                }}
                className="m-4 bg-custom-red text-white text-xs p-2 pr-6 pl-6 rounded-md"
              >
                Remove
              </button>
              <button
                onClick={() => {
                  dispatch(
                    uiControllerActions.setModalActive({
                      modalActive: false,
                    })
                  );
                }}
                className="m-4 bg-gray-600 text-white text-xs p-2 pr-6 pl-6 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      );
      break;

    default:
      break;
  }

  return ReactDOM.createPortal(
    <>
      <CSSTransition
        in={modalActive}
        unmountOnExit
        timeout={1200}
        classNames="modal"
        onEntering={() => {
          setModalActiveBool(true);
        }}
        onExit={() => {
          setModalActiveBool(false);
        }}
      >
        <div
          style={{
            left: '50%',
            transform: 'translate(-50%, -50%)',
            top: `${!modalActiveBool ? '250px' : '350px'}`,
            transition: '.5s ease-in-out',
          }}
          className="fixed mx-auto border-none overflow-hidden w-96 min-h-36 rounded-2xl bg-transparent z-50 "
        >
          <div className="flex-row align-middle items-center justify-center">
            <div className="flex w-full  items-center justify-center">
              {modalCtx}
            </div>
            <div className="flex w-full  items-center justify-center">
              {/* <button onClick={onClose}>close</button> */}
            </div>
          </div>
        </div>
      </CSSTransition>
      {ReactDOM.createPortal(
        <Backdrop
          modalActive={modalActive}
          onBackdropClose={() => {
            dispatch(
              uiControllerActions.setModalActive({
                modalActive: false,
              })
            );
          }}
        />,
        backdropRoot
      )}
    </>,
    document.getElementById('modal')
  );
};

export default Modal;
