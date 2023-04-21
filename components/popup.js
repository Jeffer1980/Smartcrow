// components/Popup.js

import React from "react";

const Popup = ({ showModal, setShowModal, result}) => {
  return (
    <div
      className={`${
        showModal ? 'fixed' : 'hidden'
      } z-10 inset-0 overflow-y-auto`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="bg-white rounded-lg p-8 w-96 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Modal Title</h2>
          <p className="mb-6">Result: {result}</p>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
