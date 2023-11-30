import { Link } from "react-router-dom";

export const Tab = () => {
  return (
    <div className="inline-flex justify-between">
      <Link to={"/login"} className="text-2xl font-semibold">
        Login Form
      </Link>
      <Link to={"/register"} className="text-2xl font-semibold">
        Registration Form
      </Link>
    </div>
  );
};
