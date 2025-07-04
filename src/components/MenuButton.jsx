import React from "react";

export default function MenuButton({ icon, text, active = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center p-2.5 my-2 w-full rounded-lg cursor-pointer transition-all
        ${
          active
            ? "bg-primaryDark/20 text-primaryDark"
            : "bg-transparent text-primaryDark"
        }
        hover:bg-primaryDark/15`}
    >
      <img src={icon} alt={`${text} icon`} className="h-[20px] mx-4 " />
      <p className="font-semibold">{text}</p>
    </div>
  );
}
