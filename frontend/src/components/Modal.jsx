import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
     <div className="bg-white rounded-lg shadow-lg w-1/2 max-w-2xl p-6 relative overflow-x-auto h-80 scrollbar-custom">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
