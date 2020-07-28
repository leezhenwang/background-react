import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Login from './login/login'
import Index from './index/index'
function Main(){
  return (
    <Router basename="/admin/"> 
      <Route path="/" exact component={Login} />     
      <Route path="/login/" exact component={Login} />
      <Route path="/index/" component={Index} />
    </Router>
  )
}
export default Main