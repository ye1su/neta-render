import { createBrowserRouter } from "react-router-dom";
import { RectanglePage } from "./ShapePage/RectanglePage.tsx";
import App from "../App.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/rectangle",
        element: <RectanglePage />,
        options: {
          name: "长方体",
          group: 'Shape'
        }
      },

    ]
  }

]);
