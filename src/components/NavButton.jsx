import { NavLink } from "react-router";

export default function NavButton({ to, icon, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center p-2.5 my-1 w-full rounded-lg cursor-pointer transition-all ${
          isActive
            ? "bg-primaryDark/20 text-primaryDark"
            : "bg-transparent text-primaryDark"
        } hover:bg-primaryDark/15`
      }
    >
      <img src={icon} alt={`${text} icon`} className="h-[20px] mx-4" />
      <p className="font-semibold">{text}</p>
    </NavLink>
  );
}
