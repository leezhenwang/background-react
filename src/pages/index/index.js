import './index.scss'
import React, {useState} from 'react';
import { Layout, Menu, Breadcrumb, Divider } from 'antd';
import {
  FundProjectionScreenOutlined,
  SnippetsOutlined,
  ProfileOutlined,
  FileAddOutlined,
  MessageOutlined
} from '@ant-design/icons';
import AddArticle from '../addArticle/addArticle';
import {Route} from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function Index(){
  return <Layout className="layout-container">
    <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['22']}>
        <Menu.Item key="1" icon={<FundProjectionScreenOutlined />}>
          工作台
        </Menu.Item>
        <SubMenu key="2" icon={<SnippetsOutlined />} title="文章管理">
          <Menu.Item key="21"  icon={<ProfileOutlined />}>文章列表</Menu.Item>
          <Menu.Item key="22"  icon={<FileAddOutlined />}>添加文章</Menu.Item>
        </SubMenu>
        <Menu.Item key="3" icon={<MessageOutlined />}>
          留言管理
        </Menu.Item>
      </Menu>
    </Sider>
    <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <Header className="site-layout-background" style={{ padding: 0, background: '#fff' }} />
      <Content style={{ margin: '24px 16px 0', overflow: 'initial',background: '#fff' }}>
        <Breadcrumb style={{ margin: '16px 0',padding: '0 24px' }}>
          <Breadcrumb.Item>User</Breadcrumb.Item>
          <Breadcrumb.Item>Bill</Breadcrumb.Item>
        </Breadcrumb>
        <Divider />
        <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
          <Route path="/index/add/" exact component={AddArticle} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  </Layout>
};
export default Index