import React, { useMemo } from "react";
import { List, Divider } from "antd";
import { BASE_URL, routes } from "./pages/routes";

const App = () => {
  const NavEle = useMemo(() => {
    const navMap: Record<string, any> = {};
    const _routes = routes.slice(1);
    _routes.forEach((route) => {
      const { group } = route.options;
      if (!navMap[group]) {
        navMap[group] = { key: group, children: [] };
      }
      navMap[group].children.push({
        path: route.path,
        ...route.options,
      });
    });

    return navMap;
  }, []);

  function handleClick(info) {
    if (location.origin.indexOf(BASE_URL) > -1) {
      const path = info.path.replace(/neta-render/, "");
      window.open(`${location.origin}/${path}`);
    } else {
      window.open(`${location.origin}/${info.path}`);
    }
  }

  return (
    <div style={{ padding: "20px" }}>
      {Object.keys(NavEle).map((eleKey) => {
        return (
          <List
            key={eleKey}
            header={
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {eleKey}
              </div>
            }
            bordered
            dataSource={NavEle[eleKey].children}
            renderItem={(item) => (
              <List.Item style={{ display: "flex", justifyContent: "center" }}>
                <a onClick={() => handleClick(item)}>{item.name}</a>
              </List.Item>
            )}
          />
        );
      })}
    </div>
  );
};

export default App;
