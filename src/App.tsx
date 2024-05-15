import React, { useMemo } from "react";
import { Container, Sidebar, Sidenav, Nav, Panel } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Outlet } from "react-router-dom";
import { router } from "./pages/routes";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();

  const NavEle = useMemo(() => {
    const navMap = {};
    const _routes = router.routes[0].children;
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


    const Ele = Object.values(navMap).map((item) => {
      return (
        <Nav.Menu
          key={item.key}
          eventKey={item.key}
          trigger="hover"
          title={item.key}
          placement="rightStart"
        >
          {item.children.map((info) => {
            return (
              <Nav.Item
                key={info.path}
                eventKey={info.path}
                onSelect={handleClick}
              >
                {info.name}
              </Nav.Item>
            );
          })}
        </Nav.Menu>
      );
    });

    return (
      <Panel header="导航栏">
        <Nav>{Ele}</Nav>
      </Panel>
    );
  }, [router.routes]);

  function handleClick(eventkey) {
    navigate(eventkey);
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Container style={{ width: "100%", height: "100%" }}>
        <Sidebar
          style={{ display: "flex", flexDirection: "column" }}
          width={260}
          collapsible
        >
          <Sidenav
            defaultOpenKeys={["Shape"]}
            appearance="inverse"
            expanded={true}
          >
            <Sidenav.Body
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "rgb(52, 152, 255)",
              }}
            >
              {NavEle}
            </Sidenav.Body>
          </Sidenav>
        </Sidebar>

        <Container>
          <Panel header="测试区">
            <Outlet />
          </Panel>
        </Container>
      </Container>
    </div>
  );
};

export default App;
