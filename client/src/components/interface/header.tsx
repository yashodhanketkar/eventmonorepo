import { useMeQuery } from "../../app/services/eventAPI";
import { Navbar } from "./navbar";

export const Header = () => {
  const logOut = () => {
    localStorage.clear();
    location.href = "/";
  };

  const { data } = useMeQuery(null);

  return (
    <header className="inline-flex items-center justify-between w-full p-4 shadow bg-black/5">
      <span className="flex-grow text-xl font-semibold">Events</span>
      <Navbar />
      {data?.id && (
        <button
          className="px-2 py-1 rounded ring-1 ring-neutral-200 hover:bg-black/10"
          onClick={logOut}
        >
          Logout
        </button>
      )}
    </header>
  );
};
