import React, { useRef, useState } from "react";

const FormInput = (props) => {
  const { formPlaceHolder } = props;
  const [isThereAnyValue, setIsThereAnyValue] = useState(false);
  const userInput = useRef();

  const validationHandler = () => {
    props.onFormBlur(userInput.current.value, formPlaceHolder);
    if (userInput.current.value.trim() !== "") return;
    setIsThereAnyValue(false);
  };
  return (
    <>
      <div
        onClick={() => {
          userInput.current.focus();
          setIsThereAnyValue(true);
        }}
        className={`font-display ${
          isThereAnyValue
            ? "text-md translate-x-6 translate-y-7"
            : "text-md translate-x-11 translate-y-11"
        } duration-200 select-none`}
      >
        {formPlaceHolder}
      </div>
      <input
        ref={userInput}
        className={`w-full  p-4 pt-6 rounded-xl font-light tracking-wider border-2 font-display ${
          isThereAnyValue ? "border-green-500" : "border-zinc-500"
        }`}
        onFocus={() => setIsThereAnyValue(true)}
        onBlur={validationHandler}
      ></input>
    </>
  );
};

export default FormInput;
