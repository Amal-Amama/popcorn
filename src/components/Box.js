import React, { useState } from "react";

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button onClick={() => setIsOpen((cur) => !cur)} className="btn">
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

export default Box;
