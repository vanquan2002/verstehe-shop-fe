import React from "react";
import { FaRegFaceFrownOpen } from "react-icons/fa6";

const Message = ({ children }) => {
  return (
    <div className="flex items-center gap-2 text-balance md:text-xl font-medium animate-pulse text-firePrimary">
      {children}
    </div>
  );
};

export default Message;
