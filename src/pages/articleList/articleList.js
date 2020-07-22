import { Table, Tag, Space, Button, Pagination } from 'antd';
import './articleList.scss'
import React , {useState, useEffect} from 'react';
import servicePath from '../../config/apiUrl';
import axios from 'axios'
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
        <Button type="primary">编辑</Button>
        <Button type="primary">删除</Button>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    title: '这里是title1',
    typeName: 1,
    addTime: 1593675367950,
    view_count: 1,
  },
  {
    key: '2',
    title: '这里是title1',
    typeName: 1,
    addTime: 1593675367950,
    view_count: 1,
  },{
    key: '3',
    title: '这里是title1',
    typeName: 2,
    addTime: 1593675367950,
    view_count: 2,
  },{
    key: '4',
    title: '这里是title1',
    typeName: 1,
    addTime: 1593675367950,
    view_count: 3,
  },{
    key: '5',
    title: '这里是title1',
    typeName: 1,
    addTime: 1593675367950,
    view_count: 3,
  },
  {
    key: '21',
    title: '这里是title1',
    typeName: 1,
    addTime: 1593675367950,
    view_count: 1,
  },
  {
    key: '22',
    title: '这里是title1',
    typeName: 1,
    addTime: 1593675367950,
    view_count: 1,
  },{
    key: '23',
    title: '这里是title1',
    typeName: 2,
    addTime: 1593675367950,
    view_count: 2,
  },{
    key: '24',
    title: '这里是title1',
    typeName: 1,
    addTime: 1593675367950,
    view_count: 3,
  },{
    key: '25',
    title: '这里是title1',
    typeName: 1,
    addTime: 1593675367950,
    view_count: 3,
  },
  {
    key: '11',
    title: '这里是title1',
    typeName: 1,
    addTime: 1593675367950,
    view_count: 1,
  },
  {
    key: '12',
    title: '这里是title1',
    typeName: 1,
    addTime: 1593675367950,
    view_count: 1,
  },{
    key: '13',
    title: '这里是title1',
    typeName: 2,
    addTime: 1593675367950,
    view_count: 2,
  },{
    key: '14',
    title: '这里是title1',
    typeName: 1,
    addTime: 1593675367950,
    view_count: 3,
  },{
    key: '15',
    title: '这里是title1',
    typeName: 1,
    addTime: 1593675367950,
    view_count: 3,
  },
];
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
  </>)
}
export default ArticleList;