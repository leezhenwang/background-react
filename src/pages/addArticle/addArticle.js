import './addArticle.scss'
import React , {useState, useEffect} from 'react';
import { Row, Col, Input, Select, Button, DatePicker, message} from 'antd';
import locale from "antd/lib/date-picker/locale/zh_CN";
import marked from "marked";
import servicePath from '../../config/apiUrl';
import axios from 'axios'
import { CalendarOutlined,FireOutlined,FolderOutlined } from '@ant-design/icons';
const { TextArea } = Input
const { Option } = Select
function AddArticle(props){
  console.log(props)
  const [typeInfo,setTypeInfo] = useState([])
  const getTypeInfo =()=>{
    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      // header:{'Access-Control-Allow-Origin': '*'},
      withCredentials: true//允许携带cookies
    }).then(res=>{
      if(res.data.data === '没有登录'){
        localStorage.removeItem('openId')
        props.history.push('/')
      }else{
        setTypeInfo(res.data.data)
      }
    })
  }
  useEffect(() => {
    getTypeInfo()
  }, [])
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false
  });
  //文章标题
  const [title,setTitle] = useState(undefined)
  function handleTitleChange(e){
    setTitle(e.target.value)
  }
  //文章类型
  const [type,setType] = useState(undefined)
  function handleTypeChange(value) {
    console.log(`selected ${value}`);
    setType(value)
  }
  //日期
  const [date,setDate] = useState(undefined)
  const [dateString,setDateString] = useState(undefined)
  function handleDateChange(date, dateString){
    console.log(date, dateString);
    setDate(date)
    setDateString(dateString)
  }
  //文章介绍
  //文章介绍html
  const [introduceHtml,setIntroduceHtml] = useState(undefined)
  const [introduce,setIntroduce] = useState(undefined)
  function handleIntroduceChange (e){
    setIntroduce(e.target.value)
    setIntroduceHtml(marked(e.target.value))
  }
  //文章内容
  //文章html
  const [contentHtml,setContentHtml] = useState(undefined)
  const [content,setContent] = useState(undefined)
  function handleContentChange(e){
    setContent(e.target.value)
    setContentHtml(marked(e.target.value))
  }
  //保存文章
  const [articleId,setArticleId] = useState(undefined)
  function saveArticle(){
    if(!title){
      message.error('请输入文章标题')
      return false
    }else if(!type){
      message.error('必须选择文章类别')
      return false
    }else if(!introduce){
      message.error('请输入文章介绍')
      return false
    }else if(!content){
      message.error('请输入文章内容')
      return false
    }else{
      let paramsObj = {
        type_id: type,
        title,
        article_content: content,
        introduce,
        addTime: dateString ? (new Date(dateString).getTime()) : (new Date().getTime()),
        updateTime: new Date().getTime()
      }
      console.log(paramsObj)
      debugger
      if(props.match.path === '/index/add/' && !articleId){//添加新的文章时
        paramsObj.view_count = 0;
        axios({
          method: 'post',
          url: servicePath.addArticle,
          data: paramsObj,
          withCredentials: true
        }).then(res=>{
          setArticleId(res.data.insertId)
          if(res.isScuccess){
            message.success('文章保存成功')
          }else{
            message.error('文章保存失败');
          }
        })
      }else{//更新文章
        paramsObj.id = articleId
        axios({
          method: 'post',
          url: servicePath.updateArticle,
          data: paramsObj,
          withCredentials: true
        }).then(res=>{
          if(res.isScuccess){
            message.success('文章保存成功')
          }else{
            message.error('文章保存失败');
          }
        })
      }
    }
  }
  return (
    <div className="artcile-contianer">
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <div className="input-container"><span>文章标题：</span><Input placeholder="请输入文章标题" onChange={handleTitleChange} value={title}/></div>
        </Col>
        <Col span={6} style={{display: 'flex'}}>
          <span style={{lineHeight: '32px'}}>文章类型：</span>
          <Select style={{ width: '100%' }} onChange={handleTypeChange} value={type ? type :  undefined} style={{flex: 1}}>
            {
              typeInfo.map((item,index)=>{
                return <Option value={item.id} key={index}>{item.typeName}</Option>
              })
            }
          </Select>
        </Col>
        <Col span={6}>
          <span style={{lineHeight: '32px'}}>选择日期：</span>
          <DatePicker onChange={handleDateChange} value={date} locale={locale}/>
        </Col>
      </Row>
      <Row gutter={[20, 20]}>
        <Col span={24} style={{textAlign: 'left',display: 'flex'}}>
          <span>文章介绍：</span>
          <TextArea 
            className="textArea-container" 
            autoSize={{ minRows: 5}}
            placeholder="请输入文章介绍"
            style={{flex: 1}}
            value ={introduce}
            onChange={handleIntroduceChange}
          />
        </Col>
      </Row>
      <Row gutter={[20, 20]} style={{textAlign: 'left'}}>
        <Col span={12}>
          <span style={{lineHeight: '32px'}}>文章内容：</span>
          <TextArea 
            className="textArea-container" 
            autoSize={{ minRows: 35}}
            placeholder="请输入文章内容"
            value ={content}
            onChange={handleContentChange}
          />
        </Col>
        <Col span={12} style={{display: 'flex',flexDirection: 'column'}}>
          <span style={{lineHeight: '32px'}}>渲染结果：</span>
          <div className="render-container" style={{flex: 1,border: '1px solid #ccc'}}>
            <p style={{textAlign: 'center'}}>{title}</p>
            <div className="detail-show">
              <div className="show-item"><CalendarOutlined />{dateString ? dateString: '日期未选择'}</div>
              <div className="show-item"><FolderOutlined />{
                (()=>{
                  let obj = typeInfo.find(item=>{
                    return item.id === type
                  })
                  return obj ? obj.typeName : '暂未选择'
                })()
              }
              </div>
              <div className="show-item"><FireOutlined />100</div>
            </div>
            <div className="introduce-html"
              dangerouslySetInnerHTML={{
                __html: introduceHtml
              }}>
            </div>
            <div className="content-html"
              dangerouslySetInnerHTML={{
                __html: contentHtml
              }}>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]} >
        <Col span={24}>
          <div className="btn-container">
            <Button type="primary">暂存文章</Button>
            <Button type="primary" onClick={saveArticle}>发布文章</Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default AddArticle