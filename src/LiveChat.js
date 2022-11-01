import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { uiControllerActions } from './store/uiControllerSlice';

import Modal from './components/ui/modal/Modal';

const LiveChat = () => {
  const [modalActive, setModalActive] = useState(false);

  const uiController = useSelector((store) => store.uiController);
  const liveChatActive = uiController.liveChatActive;
  const dispatch = useDispatch();
  return (
    <div
      className={`fixed ${
        liveChatActive
          ? 'w-full md:w-96 h-96 left-0 md:right-10 rounded-0 bottom-0 bg-slate-100'
          : 'w-12 h-12 left-8 md:right-10 rounded-3xl bottom-8 bg-custom-red'
      } flex-row text-white z-30 duration-1000 ease-in-out overflow-hidden shadow-lg`}
    >
      <Modal
        modalActive={modalActive}
        onClose={() => {
          setModalActive(false);
        }}
      >
        Live Chat
      </Modal>
      <div
        onClick={() => {
          dispatch(uiControllerActions.liveChatToggle());
        }}
        className=" cursor-pointer  flex justify-center items-center h-12 bg-custom-red group-hover:bg-red-600"
      >
        <div className=" font-display select-none">
        <svg className='fill-white' xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M5.542 11.125h5.604q.104 0 .208-.094.104-.093.104-.239 0-.125-.104-.23-.104-.104-.229-.104H5.521q-.104 0-.209.094-.104.094-.104.24 0 .125.104.229.105.104.23.104Zm0-2.771h8.937q.104 0 .209-.094.104-.093.104-.239 0-.125-.104-.229-.105-.104-.23-.104H5.521q-.104 0-.209.093-.104.094-.104.24 0 .125.104.229.105.104.23.104Zm0-2.771h8.937q.104 0 .209-.093.104-.094.104-.24 0-.125-.104-.229-.105-.104-.23-.104H5.521q-.104 0-.209.093-.104.094-.104.24 0 .125.104.229.105.104.23.104Zm-3.459 9.355V3.708q0-.791.542-1.333.542-.542 1.333-.542h12.084q.791 0 1.333.542.542.542.542 1.333v8.667q0 .792-.542 1.333-.542.542-1.333.542H4.958l-1.291 1.292q-.438.437-1.011.208t-.573-.812Z"/></svg>
        </div>
        <div className="absolute ml-96 mr-12 mb-4 w-2 h-2 rounded-full font-display">
          <svg
            className="fill-red-400"
            xmlns="http://www.w3.org/2000/svg"
            height="20"
            width="20"
          >
            <path d="m10 11.833-3.646 3.646q-.396.396-.906.386-.51-.011-.906-.407-.396-.396-.396-.916 0-.521.396-.917l3.646-3.646-3.667-3.667q-.396-.374-.386-.895.011-.521.407-.917.396-.396.916-.396.521 0 .917.396L10 8.167l3.646-3.646q.396-.396.916-.396.521 0 .917.396t.396.917q0 .52-.396.916L11.833 10l3.667 3.667q.375.395.385.895.011.5-.385.896t-.917.396q-.521 0-.916-.396Z" />
          </svg>
        </div>
      </div>
      <CSSTransition
        in={liveChatActive}
        unmountOnExit
        timeout={1200}
        classNames="CssAnim"
      >
        <div className="flex-row w-full justify-center items-center h-full text-stone-800 text-center">
          <div className="w-full mt-32">
            Before start live chat you must
          </div>
          <button
            onClick={() => {
              setModalActive(true);
              dispatch(uiControllerActions.setModalActive(true));
            }}
            className="cursor-pointer w-24 pt-1 pb-1 m-auto rounded-lg border-2 border-stone-700 font-extrabold mt-4 hover:bg-custom-red hover:bg-custom-red hover:text-white duration-300 font-display"
          >
            Login
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};

export default LiveChat;
