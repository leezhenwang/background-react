import './addArticle.scss'
import React , {useState} from 'react';
import { Row, Col, Input, Select} from 'antd';
const { TextArea } = Input
const { Option } = Select
function AddArticle(props){
  const [selectValue,setSelectValue] = useState(undefined )
  function handleChange(value) {
    console.log(`selected ${value}`);
    setSelectValue(value)
  }
  return (
    <div className="artcile-contianer">
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <div className="input-container"><span>文章标题：</span><Input placeholder="请输入文章标题" /></div>
        </Col>
        <Col span={6}>
          <Select defaultValue="lucy" style={{ width: '100%' }} onChange={handleChange} value={selectValue ? selectValue :  'lucy'}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </Col>
        <Col span={6}></Col>
      </Row>
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <TextArea 
            className="textArea-container" 
            autoSize={{ minRows: 35}}
            placeholder="请输入文章内容"
          />
        </Col>
        <Col span={12}>
          <div className="render-container">

          </div>
        </Col>
      </Row>
    </div>
  )
}
export default AddArticle