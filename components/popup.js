// components/Popup.js

import React, { useRef } from "react";
import { useState } from 'react';

const Popup = ({ header, text, closeModal, isOpen}) => {

    const [myheader, setHeader] = useState("TBD");
    const [mytext, setText] = useState("TBD");

    const modalRef = useRef();

    const handleClose = (e) => {
      if (modalRef.current === e.target) {
        closeModal();
      }};
    

  return (
               
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
      isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleClose}
      ref={modalRef}>
      <div className="w-full max-w-md bg-gray-500 rounded-lg p-4 transform transition-all duration-300 opacity-100 scale-100">
      {/* Icon */}
      <div className="flex justify-center text-center mb-4">
        <img src="/assets/images/error.png" alt="Paste Image" className="h-5 w-5" /> 
      </div>

      

      {/* Header text */}
      <h2 className="text-xl font-semibold mb-4 flex justify-center">{header}</h2>

      {/* Horizontal dividing line */}
      <hr className="border-gray-200 my-4" />

      {/* Normal text */}
      <p className="text-gray-600 flex justify-center">{text}</p>
    </div>
  </div>
      
    
  );
};

export default Popup;
