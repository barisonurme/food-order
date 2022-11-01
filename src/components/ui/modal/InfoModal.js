import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { uiControllerActions } from '../../../store/uiControllerSlice';

const InfoModal = () => {
  const uiController = useSelector((store) => store.uiController);
  const dispatch = useDispatch();
  const infoModalActive = uiController.infoModalActive;
  const infoModalText = uiController.infoModalText;
  const infoModalColor = uiController.infoModalColor;

  return (
    <CSSTransition
      in={uiController.infoModalActive}
      unmountOnExit
      timeout={600}
      classNames="infoModal"
      onEntered={() => {
        setTimeout(() => {
          dispatch(
            uiControllerActions.setInfoModal({
              infoModalActive: !infoModalActive,
              infoModalText: infoModalText,
              infoModalColor: infoModalColor,
            })
          );
        }, 1200);
      }}
    >
      <div
        // style={{ right: '15px', bottom: '15px' }}
        className="fixed w-11/12 md:w-96 min-h-8 z-40 bottom-20 transform -translate-x-1/2 -translate-y-1/2  left-1/2"
      >
        <div
          className={`w-full min-h-8 ${
            infoModalColor === 'green' ? 'bg-green-500' : 'bg-custom-red'
          } opacity-90 rounded-lg`}
        >
          <div className="flex min-h-8 p-2 pr-16 pl-16 justify-center align-middle items-center text-white font-display">
            {uiController.infoModalText}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default InfoModal;
