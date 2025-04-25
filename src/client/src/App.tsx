import { Header } from "./components/ui/header.tsx";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
