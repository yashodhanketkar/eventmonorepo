// import { CssBaseline } from "@mui/material";
import { Footer, Header } from "../components/interface";
import { MainRouter } from "../config/routes";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <CssBaseline /> */}
      <Header />
      <main className="p-4 mb-auto">
        <MainRouter />
      </main>
      <Footer />
    </div>
  );
};
