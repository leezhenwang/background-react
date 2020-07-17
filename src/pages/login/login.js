import './login.scss'
import React , {useState} from 'react';
import { Input, Button,Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
function Login(props){
  //react hook 必须写在函数里面
  const [userName , setUserName] = useState('')
  const [password , setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const checkLogin = ()=>{
    setIsLoading(true)
    setTimeout(()=>{
      setIsLoading(false)
      props.history.push("/index");
    },1000)
  }
  return (
    <div className="login-container">
      <Spin tip={'加载中...'} spinning={isLoading}>
        <span className="login-text">请先登录</span>
        <Input 
          placeholder="请输入账号" 
          prefix={<UserOutlined />} 
          onChange={(e)=>{setUserName(e.target.value)}}
        />
        <br/>
        <Input 
          placeholder="请输入密码" 
          prefix={<LockOutlined />} 
          onChange={(e)=>{setPassword(e.target.value)}}
        />
        <Button onClick={()=>checkLogin()}>登录</Button>
      </Spin>
    </div>
  )
}
export default Login