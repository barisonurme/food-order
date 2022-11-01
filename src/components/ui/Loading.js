import React from 'react';

const Loading = (props) => {
  const { margin, size } = props;
  return (
    <div className="flex justify-center items-center">
      <div
        style={{ margin: margin }}
        className={`animate-spin border-4 rounded-full w-${size} h-${size} border-b-gray-400 border-gray-50 mix-blend-overlay`}
      ></div>
    </div>
  );
};

export default Loading;
