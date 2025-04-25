import { createBrowserRouter, RouterProvider } from "react-router";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Chat } from "./pages/chat.tsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Chat />,
      },
    ],
  },
]);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
