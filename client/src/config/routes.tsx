import { Outlet, Route, Routes } from "react-router-dom";
import { useMeQuery } from "../app/services/eventAPI";
import { LoginPage, RegisterPage } from "../components/auth";
import { List, Manage } from "../components/events";

export const MainRouter = () => {
  const { data, isLoading } = useMeQuery(null);

  if (isLoading) return <></>;

  if (data?.id)
    return (
      <>
        <Routes>
          <Route path="/list" element={<List />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/*" element={<>Home</>} />
        </Routes>
        <Outlet />
      </>
    );

  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/*" element={<LoginPage />} />
      </Routes>
      <Outlet />
    </>
  );
};
