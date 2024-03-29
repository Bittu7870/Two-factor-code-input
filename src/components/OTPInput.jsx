import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const OTPInput = () => {
  const emptyArray = ["", "", "", ""];
  const [input, setInput] = useState(emptyArray);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const handleInputChange = (e, index) => {
    const inputVal = e.target.value;

    if (!Number(inputVal)) return;

    if (index < input.length - 1) {
      refs[index + 1].current.focus();
    }

    const copyInput = [...input];
    copyInput[index] = inputVal;

    setInput(copyInput);
  };

  const handleOnKeyDown = (e, index) => {
    if (e.keyCode === 8) {
      const copyInput = [...input];
      copyInput[index] = "";

      setInput(copyInput);

      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  };

  const handleOnPaste = (e) => {
    const data = e.clipboardData.getData("text");
    if (!Number(data) || data.length !== input.length) return;
    const pestCode = data.split("");
    setInput(pestCode);
    refs[input.length - 1].current.focus();
  };

  useEffect(() => {
    refs[0].current.focus();
  }, []);

  return (
    <div className="text-center ">
      <h1 className="text-6xl my-8 text-center font-mono">
        Two-factor code input
      </h1>
      <div className="my-9">
        {emptyArray.map((item, index) => (
          <input
            key={index}
            ref={refs[index]}
            type="text"
            value={input[index]}
            maxLength={1}
            onPaste={handleOnPaste}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
            className="border w-20 h-20 text-center items-center mx-4 bg-gray-200 text-3xl font-bold focus:outline-blue-500"
          />
        ))}
      </div>
      <button className="px-10 py-4 bg-purple-600 text-xl font-mono text-white rounded-lg hover:bg-purple-900 outline-none">
        Submit
      </button>
    </div>
  );
};

export default OTPInput;
