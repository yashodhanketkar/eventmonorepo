import { NavLink } from "react-router-dom";
import { useMeQuery } from "../../app/services/eventAPI";

export const Navbar = () => {
  const { data, isLoading } = useMeQuery(null);

  if (isLoading || !data) return;

  return (
    <nav className="inline-flex gap-2 px-4 font-semibold">
      <NavLink to={"/list"}>List</NavLink>
      {data.role === "admin" && <NavLink to={"/manage"}>Manage</NavLink>}
    </nav>
  );
};
