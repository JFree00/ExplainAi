import { createBrowserRouter, RouterProvider } from "react-router";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Chat } from "./pages/chat.tsx";
import { ChatData, Sender } from "./types/chat-types.ts";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Chat />,
        action: async ({ request }) => {
          const url = new URL("http://localhost/chat");
          url.port = "3000";
          const formData = await request.formData();
          const input = formData.get("message");

          const res = await fetch(url, {
            method: request.method,
            headers: request.headers,
            body: input,
          });
          return {
            messages: [
              {
                content: input,
                sender: Sender.User,
              },
              {
                content: res.body,
                sender: Sender.System,
              },
            ],
          } as ChatData;
        },
      },
    ],
  },
]);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
