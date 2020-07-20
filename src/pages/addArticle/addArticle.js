import './addArticle.scss'
import React , {useState} from 'react';
import { Row, Col, Input, Select, Button, DatePicker} from 'antd';
import locale from "antd/lib/date-picker/locale/zh_CN";
import marked from "marked";
const { TextArea } = Input
const { Option } = Select
function AddArticle(props){
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
  function handleDateChange(date, dateString){
    console.log(date, dateString);
    setDate(date)
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
  return (
    <div className="artcile-contianer">
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <div className="input-container"><span>文章标题：</span><Input placeholder="请输入文章标题" onChange={handleTitleChange} value={title}/></div>
        </Col>
        <Col span={6} style={{display: 'flex'}}>
          <span style={{lineHeight: '32px'}}>文章类型：</span>
          <Select defaultValue="lucy" style={{ width: '100%' }} onChange={handleTypeChange} value={type ? type :  'lucy'} style={{flex: 1}}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
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

          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]} >
        <Col span={24}>
          <div className="btn-container">
            <Button type="primary">暂存文章</Button>
            <Button type="primary">发布文章</Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}
export default AddArticle