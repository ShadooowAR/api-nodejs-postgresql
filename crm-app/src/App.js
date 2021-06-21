import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Clients from "./clients/clients";
import Projects from "./projects/projects";
import Contacts from "./contacts/contacts";
import Meetings from "./meetings/meetings";

import { Layout, Menu, Image } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  HomeOutlined,
  TeamOutlined,
  ContactsOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Router>
      <Layout style={{ height: "100vh" }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/clients">Clients</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ContactsOutlined />}>
              <Link to="/contacts">Contacts</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<FundProjectionScreenOutlined />}>
              <Link to="/projects">Projects</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<TeamOutlined />}>
              <Link to="/meetings">Meetings</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="site-layout"
          style={{ height: "100vh", overflowY: "auto" }}
        >
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 0,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route path="/clients">
                <Clients />
              </Route>
              <Route path="/contacts">
                <Contacts />
              </Route>
              <Route path="/projects">
                <Projects />
              </Route>
              <Route path="/meetings">
                <Meetings />
              </Route>
              <Route path="/">
                <div className="alignHomeImage">
                  <Image
                    preview={false}
                    width={550}
                    src="https://www.masip.es/wp-content/uploads/2019/03/Funciones-CRM.jpg"
                  />
                </div>
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
