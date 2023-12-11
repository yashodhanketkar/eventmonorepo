import { Footer, Header } from "../components/interface";
import { MainRouter } from "./routes";

export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="p-4 mb-auto">
        <MainRouter />
      </main>
      <Footer />
    </div>
  );
};
