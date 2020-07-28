// let ipUrl = 'http://127.0.0.1:7001/admin/'//本地
// let ipUrl = '/admin/'//本地代理到线上
let ipUrl = 'http://129.204.206.80:7001/admin/'//线上
const servicePath = {
  checkLogin: `${ipUrl}checkLogin`, //  检查用户名密码是否正确
  getTypeInfo: `${ipUrl}getTypeInfo`,//获取文章类型
  addArticle: `${ipUrl}addArticle`,//添加文章
  updateArticle: `${ipUrl}updateArticle`,//更新文章
  getArticleList: `${ipUrl}getArticleList`,//获取文章列表
  deleteArticle: `${ipUrl}deleteArticle`,//获取文章列表
  getArticleById: `${ipUrl}getArticleById`,//获取文章列表
}
export default servicePath