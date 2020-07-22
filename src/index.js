//其余删掉
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './pages/main';
import 'antd/dist/antd.css';
import './common.scss'
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';

ReactDOM.render(
  <ConfigProvider locale={zhCN}><Main/></ConfigProvider>,
  document.getElementById('root')
);
