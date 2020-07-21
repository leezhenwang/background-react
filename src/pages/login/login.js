import './login.scss'
import React , {useState} from 'react';
import { Input, Button,Spin, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import servicePath from '../../config/apiUrl';
import axios from 'axios'
function Login(props){
  //react hook 必须写在函数里面
  const [userName , setUserName] = useState('')
  const [password , setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const checkLogin = ()=>{
    setIsLoading(true)
    if(!userName){
      message.error('用户名不能为空')
      return
    }else if(!password){
      message.error('密码不能为空')
      return
    }
    let paramsObj = {
      userName,
      password
    }
    axios({
      method:'post',
      url: servicePath.checkLogin,
      data: paramsObj,
      withCredentials: true
    }).then(res=>{
      setIsLoading(false)
      if(res.data.openId){
        localStorage.setItem('openId', res.data.openId)
        props.history.push("/index/add");
      }else{
        message.error('用户名或者密码错误')
      }
    }).catch(err=>{
      setIsLoading(false)
    })
    // setTimeout(()=>{
    //   setIsLoading(false)
    //   props.history.push("/index");
    // },1000)
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
          type="password"
          prefix={<LockOutlined />} 
          onChange={(e)=>{setPassword(e.target.value)}}
        />
        <Button onClick={()=>checkLogin()}>登录</Button>
      </Spin>
    </div>
  )
}
export default Login