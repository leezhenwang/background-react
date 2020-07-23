import { Table, Tag, Space, Button, Modal, message } from 'antd';
import './articleList.scss'
import React , {useState, useEffect} from 'react';
import servicePath from '../../config/apiUrl';
import axios from 'axios';

const ArticleList = (props)=>{
  const [pagination,setPagination] = useState({
    current: 1,
    total: 0,
    pageSize: 20,
  })
  //获取文章列表
  const [articleList,setArticleList] = useState([])
  const getArticleList = (page,pageSize)=>{
    axios({
      method: 'get',
      url: `${servicePath.getArticleList}?page=${page}&pageSize=${pageSize}`,
      withCredentials: true,
      // header:{ 'Access-Control-Allow-Origin':'*' }
    }).then(res=>{
      setArticleList(res.data.list)
      setPagination({current: page,pageSize: pageSize,total: res.data.total})
    })
  }
  useEffect(()=>{
    getArticleList(1,pagination.pageSize)
  },[])
  const handlePageChange=(newCurrent,newPageSize)=>{
    console.log(newCurrent,newPageSize)
    const {current,pageSize} = pagination
    let newPagination

    if(pageSize === newPageSize ){//仅改变页数时
      newPagination = {...pagination,current: newCurrent}
      getArticleList(newCurrent,pageSize)
    }else{//改变pagesize时
      newPagination = {...pagination,current: 1,pageSize: newPageSize}
      getArticleList(1,newPageSize)
    }
  }
  // const onShowSizeChange =(pageSize)=>{
  //   console.log(pageSize)
  // }
  //删除文章
  const [visible,setVisible] = useState(false)
  const [confirmLoading,setConfirmLoading] = useState(false)
  const [articleId,setArticleId] = useState(false)
  const handleModalOk = ()=>{
    setConfirmLoading(true)
    axios({
      method: 'get',
      url: `${servicePath.deleteArticle}?id=${articleId}`,
      withCredentials: true,
      // header:{ 'Access-Control-Allow-Origin':'*' }
    }).then(()=>{
      message.success('删除成功')
      getArticleList(1,pagination.pageSize)
    }).catch(err=>{
      message.error('删除失败')
    }).finally(()=>{
      setConfirmLoading(false)
      setVisible(false)
    })
  }
  const deleteArticle = (id)=>{
    setVisible(true)
    setArticleId(id)
  }
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '文章类别',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: '发布时间',
      dataIndex: 'addTime',
      key: 'addTime',
    },
    {
      title: '浏览量',
      key: 'view_count',
      dataIndex: 'view_count',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={()=>props.history.push(`/index/edit/${record.id}`)}>编辑</Button>
          <Button type="primary" onClick={()=>deleteArticle(record.id)}>删除</Button>
        </Space>
      ),
    },
  ];
  return (<>
    <Table 
      columns={columns} 
      dataSource={articleList} 
      rowKey={record => record.id}
      pagination={{
        simple:false,
        current:pagination.current,
        total:pagination.total,
        pageSizeOptions:['10','20','30','40','50'],
        showSizeChanger:true,
        pageSize:pagination.pageSize,
        showTotal: (count=pagination.total)=>{
          return '共'+count+'条数据'
        },
        // onShowSizeChange:(pageSize)=>{onShowSizeChange(pageSize)},
        onChange:(current,pageSize)=>{
          handlePageChange(current,pageSize)
        }
      }}/>
      <Modal
        title="确定要删除这篇博客文章吗？"
        visible={visible}
        onOk={handleModalOk}
        confirmLoading={confirmLoading}
        onCancel={()=>setVisible(false)}
      >
        <p>点击确定文章将会永远被删除，无法恢复</p>
      </Modal>
  </>)
}
export default ArticleList;