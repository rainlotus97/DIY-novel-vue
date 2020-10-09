let fs = require('fs');
let multer = require('multer')

var express = require('express');
var router = express.Router();
var User=require('../controllers/UserController')
let upload =multer({dest:'./public/uploads/'}).single('file')
let moreUpload = multer({dest:'./public/uploads/'}).array("file",5);

/* GET users listing. */
// 模拟验证码
router.get('/sendCode',User.sendCode);

// 真实验证码
router.get('/sendCoreCode',User.sendCoreCode);

// 手机号验证码登录
router.get('/codePhoneLogin',User.codePhoneLogin)

// 用户名,密码登录
router.get('/login',User.login)

// 修改个人信息
router.get('/editUserInfo',User.editUserInfo)

// 设置密码
router.get('/setPassword',User.setPassword)

// 绑定邮箱
router.get('/bindEmail',User.bindEmail)

//图片上传
router.get('/editUserImg',upload,User.editUserImg)

// 多图片上传
router.get('/uploadMoreImg',moreUpload,User.uploadMoreImg);

// 模拟登出
router.get('/logout',User.logout)

// 获取收藏书籍
router.get('/books',User.books)


// 存储book列表
// user_id,name,pic,url
router.get('/setBooks',User.setBooks)

// 取消收藏
//name,user_id
router.get('/delBook',User.delBook)

// 获取所有用户
router.get('/getAllUsers',User.getAllUsers)

//返回设置history成功与否状态
// user_id, num_title, pic, url,book_name
router.get('/setHistory',User.setHistory)

// 获取浏览历史 user_id
router.get('/history',User.history)

// 删除浏览历史 num_title, user_id 
router.get('/delHistory',User.delHistory)

//  清空浏览历史  user_id
router.get('/delALLHistory',User.delALLHistory)


// 发布视频
router.get('/publlish',User.publlish)

module.exports = router;
