import React from "react";

export default function NoResult() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center z-0 my-2 gap-x-7">
      <img src="icons/search-icon.svg" alt="" />
      <p className="text-center text-sm text-primaryDark/50">
        <span className="text-xl text-primaryDark font-bold">
          No Results to Show !
        </span>
        <br /> Looking for Something? Search above!
      </p>
    </div>
  );
}
