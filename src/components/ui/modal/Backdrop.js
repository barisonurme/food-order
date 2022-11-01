import React from 'react';
import { CSSTransition } from 'react-transition-group';

const Backdrop = (props) => {
  return (
      <CSSTransition
        in={props.modalActive}
        unmountOnExit
        timeout={600}
        classNames="backdrop"
      >
        <div
          onClick={props.onBackdropClose}
          style={{backgroundColor: 'rgba(0, 0, 0, .8)'}}
          className="h-screen w-screen fixed z-40"
        ></div>
      </CSSTransition>
  );
};

export default Backdrop;
