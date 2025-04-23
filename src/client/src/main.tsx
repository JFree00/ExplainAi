import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
import ReactDOM from "react-dom/client";

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello World</div>,
    },
]);

const root = document.getElementById("root")!!;

ReactDOM.createRoot(root).render(
    <RouterProvider router={router} />
);
