import { Header } from "./components/ui/header.tsx";
import { Outlet } from "react-router";
import { Sidebar } from "./components/sidebar/sidebar.tsx";

function App() {
  return (
    <>
      <div className={"flex"}>
        <Sidebar />
        <div className={"flex flex-col basis-full content-start"}>
          <Header />
          <main className={"grow basis-full"}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
