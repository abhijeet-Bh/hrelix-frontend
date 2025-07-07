import { NavLink } from "react-router";

export default function NavButton({ to, icon, text, isCollapsed }) {
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
      <img
        src={icon}
        alt={`${text} icon`}
        className={`h-[20px] ${isCollapsed ? "mx-auto" : "mx-4"}`}
      />
      {!isCollapsed && (
        <p className="font-semibold whitespace-nowrap">{text}</p>
      )}
    </NavLink>
  );
}
