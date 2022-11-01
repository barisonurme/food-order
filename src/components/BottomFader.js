import React from 'react';

const BottomFader = () => {
  return (
    <div
      style={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 19%, rgba(255,255,255,1) 100%)',
      }}
      className="md:hidden fixed bottom-0 h-32 bg-white z-10 w-full"
    ></div>
  );
};

export default BottomFader;
