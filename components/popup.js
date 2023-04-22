// components/Popup.js

import React from "react";
import { useState } from 'react';

const Popup = ({ header, text, closeModal}) => {

    const [myheader, setHeader] = useState("TBD");
    const [mytext, setText] = useState("TBD");

    /*if (result==1){
        setHeader('Cannot withdraw!');
        setText('Last recorded date before bonus startdate');
    }*/

  return (
    
      
      
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{header}</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.707 10L16 15.293l-.707.707L10 10.707l-5.293 5.293-.707-.707L9.293 10l-5.293-5.293.707-.707L10 9.293l5.293-5.293.707.707L10.707 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <p className="text-gray-700">{text}</p>
          </div>
        </div>
      
    
  );
};

export default Popup;
