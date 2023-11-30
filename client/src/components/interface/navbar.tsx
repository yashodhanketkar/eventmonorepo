import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="inline-flex gap-2 px-4 font-semibold">
      <NavLink to={"/list"}>List</NavLink>
      <NavLink to={"/manage"}>Manage</NavLink>
    </nav>
  );
};
