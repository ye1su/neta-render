import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import { Layout, Card } from "antd";
import { CirclePage } from "./ShapePage/CirclePage.tsx";
import { RectanglePage } from "./ShapePage/RectanglePage.tsx";
import { StraightPage } from "./EdgePage/StraightPage.tsx";
import { ImagePage } from "./ShapePage/ImagePage.tsx";
import { EllipsePage } from "./ShapePage/EllipsePage.tsx";
import { OrthogonalPage } from "./EdgePage/OrthogonalPage.tsx";
import { PolygonPage } from "./ShapePage/PolygonPage.tsx";
import ForcePage from "./LayoutPage/ForcePage.tsx";
import DagrePage from "./LayoutPage/Dagre.tsx";
import { StylePage } from "./ShapePage/StylePage.tsx";
import { CombinationPage } from "./ShapePage/CombinationPage.tsx";
import { CraeteEdgePage } from "./ModePage/CraeteEdgePage.tsx";
import { ConditionPage } from "./AppPage/ConditionPage.tsx";
import { AndOrPage } from "./RegNodePage/AndOrPage.tsx";
import { CvsSelectPage } from "./RegNodePage/CvsSelectPage.tsx";
import { FreedomPage } from "./RegNodePage/FreedomPage.tsx";
import { TreePage } from "./LayoutPage/TreePage.tsx";
import { MindPage } from "./AppPage/MindPage.tsx";

const { Sider, Content } = Layout;

export const BASE_URL = "neta-render";

export const routes = [
  {
    path: `${BASE_URL}`,
    element: <App />,
  },
  {
    path: `${BASE_URL}/rectangle`,
    element: <RectanglePage />,
    options: {
      name: "长方体",
      group: "Shape",
    },
  },
  {
    path: `${BASE_URL}/circle`,
    element: <CirclePage />,
    options: {
      name: "圆形",
      group: "Shape",
    },
  },
  {
    path: `${BASE_URL}/image`,
    element: <ImagePage />,
    options: {
      name: "图片",
      group: "Shape",
    },
  },
  {
    path: `${BASE_URL}/ellipse`,
    element: <EllipsePage />,
    options: {
      name: "椭圆",
      group: "Shape",
    },
  },
  {
    path: `${BASE_URL}/polygon`,
    element: <PolygonPage />,
    options: {
      name: "自定义多边形",
      group: "Shape",
    },
  },
  {
    path: `${BASE_URL}/shapestyle`,
    element: <StylePage />,
    options: {
      name: "节点样式",
      group: "Shape",
    },
  },
  {
    path: `${BASE_URL}/combination`,
    element: <CombinationPage />,
    options: {
      name: "组合节点样式",
      group: "Shape",
    },
  },
  {
    path: `${BASE_URL}/anornode`,
    element: <AndOrPage />,
    options: {
      name: "且或节点",
      group: "Custom-Shape",
    },
  },
  {
    path: `${BASE_URL}/cvsSelect`,
    element: <CvsSelectPage />,
    options: {
      name: "下拉组件",
      group: "Custom-Shape",
    },
  },
  {
    path: `${BASE_URL}/freedom`,
    element: <FreedomPage />,
    options: {
      name: "自定义dom节点",
      group: "Custom-Shape",
    },
  },
  {
    path: `${BASE_URL}/straight`,
    element: <StraightPage />,
    options: {
      name: "直线",
      group: "Edge",
    },
  },
  {
    path: `${BASE_URL}/orthogonal`,
    element: <OrthogonalPage />,
    options: {
      name: "正交线",
      group: "Edge",
    },
  },

  {
    path: `${BASE_URL}/force`,
    element: <ForcePage />,
    options: {
      name: "力导图",
      group: "Layout",
    },
  },
  {
    path: `${BASE_URL}/dagre`,
    element: <DagrePage />,
    options: {
      name: "关系图",
      group: "Layout",
    },
  },
  {
    path: `${BASE_URL}/tree`,
    element: <TreePage />,
    options: {
      name: "树布局",
      group: "Layout",
    },
  },
  {
    path: `${BASE_URL}/createdge`,
    element: <CraeteEdgePage />,
    options: {
      name: "创建线",
      group: "Mode",
    },
  },
  {
    path: `${BASE_URL}/condition`,
    element: <ConditionPage />,
    options: {
      name: "条件组件",
      group: "App",
    },
  },
  {
    path: `${BASE_URL}/mind`,
    element: <MindPage />,
    options: {
      name: "脑图",
      group: "App",
    },
  },
].map((item) => {
  if (!item.options) {
    return item;
  }
  return {
    ...item,
    element: <Refresh title={item.options.name}>{item.element}</Refresh>,
  };
});

function Refresh({ children, title }) {
  return (
    <Layout
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <Layout>
        <Content>
          <Card
            style={{ width: "100%" }}
            title={title}
            styles={{
              body: { background: "rgb(245, 245, 245)", height: "100%" },
            }}
          >
            {children}
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
}

export const router = createBrowserRouter(routes);
