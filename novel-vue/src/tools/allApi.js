//搜索-热词
export const hotWord =`http://b.zhuishushenqi.com/hotword/list?type=normal&packageName=com.ushaqi.zhuishushenqi`;        //GET

//搜索-全站热搜
export const hotSearch =`http://b.zhuishushenqi.com/book/hot-word?appName=zhuishu&packageName=com.ushaqi.zhuishushenqi`;        //GET

//搜索-书籍 (步骤一)       
export const searchBook =`http://yuenov.com:17777/app/open/api/book/search`;        //POST 需要参数：keyWord、pageNum、pageSize

//搜索-获得书籍详情(步骤二) 
export const bookDetail = `http://47.114.147.221/?xsname=`;          //GET 需要参数:xsname（此参数就是上一步骤的keyWord书名）

//搜索-获得书籍目录(步骤三) 
export const bookDirectory = `http://47.114.147.221/?xsurl1=`;          //GET 需要参数:上一步的'url'参数

//搜索-获得小说内容(步骤四) 
export const novelContent = `http://47.114.147.221/?xsurl2=`;

//书城-精选             //GET
export const hotSelect = `http://b.zhuishushenqi.com/category/native-page?node=72b04c43ab40499b84a2ffb79bf51398&pl=android&sex=male&cv=&groupid=1%2C-1%2C-1%2C-1%2C-1&packageName=com.ushaqi.zhuishushenqi&token=uvuNs0kRL7nag4AV4bec5f20df1872b61396568a7e04a1968b80f4a3932cdef2cca1efdaba506d9c6da10425affab84ba0cf4e3dc14bdeba6ab75e22385af3a74607a30ac1213586819bef887e07901940337d56d6dbb53f&ishome=true&page=1&userid=5f5f26bb2e7292430d2882a3&city=%E6%97%A0%E9%94%A1&time=1600081411970`;

//通过http://pt.yuenov.com:16666/app/open/api/rank/getList获得不同榜单的rankId, channelId
//书城-书籍分类                         //GET   参数有： channelId , rankId , pageNum , pageSize
export const bookSort = `http://pt.yuenov.com:16666/app/open/api/rank/getPage`;

//书城-新人推荐         //GET
export const bookRecommend = `http://b.zhuishushenqi.com/category/native-page?node=823199126bd64514aeab8f5d8851d0f5&pl=android&sex=male&cv=&groupid=1%2C-1%2C-1%2C-1%2C-1&packageName=com.ushaqi.zhuishushenqi&token=uvuNs0kRL7nag4AV4bec5f20df1872b61396568a7e04a1968b80f4a3932cdef2cca1efdaba506d9c6da10425affab84ba0cf4e3dc14bdeba6ab75e22385af3a74607a30ac1213586819bef887e07901940337d56d6dbb53f&ishome=false&page=1&userid=5f5f26bb2e7292430d2882a3&city=%E6%97%A0%E9%94%A1&time=1600081411970`;

//书城-新书             //GET
export const newBook = `http://pt.yuenov.com:16666/app/open/api/rank/getPage?channelId=1&rankId=106&pageNum=1&pageSize=100`

//书城-男频             //GET
export const boyBook = `http://b.zhuishushenqi.com/category/native-page?node=d9a25e6f474146c38f78688d14930a50&pl=android&sex=male&cv=&groupid=1%2C-1%2C-1%2C-1%2C-1&packageName=com.ushaqi.zhuishushenqi&token=uvuNs0kRL7nag4AV4bec5f20df1872b61396568a7e04a1968b80f4a3932cdef2cca1efdaba506d9c6da10425affab84ba0cf4e3dc14bdeba6ab75e22385af3a74607a30ac1213586819bef887e07901940337d56d6dbb53f&ishome=false&page=1&userid=5f5f26bb2e7292430d2882a3&city=%E6%97%A0%E9%94%A1&time=1600081411970`

//书城-女频             //GET
export const girlBook = `http://b.zhuishushenqi.com/category/native-page?node=d322f092a8104c9784feff4680ef18c1&pl=android&sex=male&cv=&groupid=1%2C-1%2C-1%2C-1%2C-1&packageName=com.ushaqi.zhuishushenqi&token=uvuNs0kRL7nag4AV4bec5f20df1872b61396568a7e04a1968b80f4a3932cdef2cca1efdaba506d9c6da10425affab84ba0cf4e3dc14bdeba6ab75e22385af3a74607a30ac1213586819bef887e07901940337d56d6dbb53f&ishome=false&page=1&userid=5f5f26bb2e7292430d2882a3&city=%E6%97%A0%E9%94%A1&time=1600081411970`

//漫画-界面             //GET
export const cartoonPage = `https://api.zhuishushenqi.com/v2/mweb/home?size=8&pl=ios&node=5a04005af958913a73b2ecdc`

//搜索-获得漫画详情(步骤一) 
export const cartoonDetail = `http://47.114.147.221/?mhname=`;          //GET 需要参数:xsname（此参数就是上一步骤的keyWord书名）

//搜索-获得漫画目录(步骤二) 
export const cartoonDirectory = `http://47.114.147.221/?mhurl1=`;          //GET 需要参数:上一步的'url'参数

//搜索-获得漫画内容(步骤三) 
export const cartoonContent = `http://47.114.147.221/?mhurl2=`;




// 后台数据库接口如下(全是get请求)：

// 模拟验证码 phone
export const sendcode = `http://localhost:3000/users/sendCode`;

// 真实验证码 phone
export const sendCoreCode = `http://localhost:3000/users/sendCoreCode`;

// 手机号验证码登录 phone，code，password
export const codePhoneLogin = `http://localhost:3000/users/codePhoneLogin`;

// 用户名,密码登录  username，password
export const login = `http://localhost:3000/users/login`;

//模拟登出 
export const logout = `http://localhost:3000/users/logout`;



// 存储book列表(点击收藏)
// user_id,name,pic,url
export const setBooks = `http://localhost:3000/users/setBooks`;

//  获取收藏书籍(书架)
export const books = `http://localhost:3000/users/books`;

// 取消收藏 name,user_id
export const delBook = `http://localhost:3000/users/delBook`;

//获取所有用户
export const getAllUsers = `http://localhost:3000/users/getAllUsers`;

//设置浏览历史记录  user_id, num_title, pic, url,book_name
export const setHistory = `http://localhost:3000/users/setHistory`;

// 获取浏览历史 user_id
export const history = `http://localhost:3000/users/history`;

// 删除浏览历史 num_title, user_id 
export const delHistory = `http://localhost:3000/users/delHistory`;

// 清空浏览历史  user_id
export const delALLHistory = `http://localhost:3000/users/delALLHistory`;

