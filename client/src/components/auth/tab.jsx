import { Link, useLocation } from "react-router-dom";

export const Tab = () => {
  const { pathname } = useLocation();

  return (
    <div className="inline-flex justify-between">
      <Link
        to={"/login"}
        className={`text-2xl font-semibold ${
          pathname === "/login" && "first-letter:font-bold underline"
        }`}
      >
        Login Form
      </Link>
      <Link
        to={"/register"}
        className={`text-2xl font-semibold ${
          pathname === "/register" && "first-letter:font-bold underline"
        }`}
      >
        Registration Form
      </Link>
    </div>
  );
};
