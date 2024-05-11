import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import { CirclePage } from "./ShapePage/CirclePage.tsx";
import { RectanglePage } from "./ShapePage/RectanglePage.tsx";
import { StraightPage } from "./EdgePage/StraightPage.tsx";
import { ImagePage } from "./ShapePage/ImagePage.tsx";

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
      {
        path: "/circle",
        element: <CirclePage />,
        options: {
          name: "圆形",
          group: 'Shape'
        }
      },
      {
        path: "/image",
        element: <ImagePage />,
        options: {
          name: "图片",
          group: 'Shape'
        }
      },

      {
        path: "/straight",
        element: <StraightPage />,
        options: {
          name: "直线",
          group: 'Edge'
        }
      },

    ]
  }

]);
