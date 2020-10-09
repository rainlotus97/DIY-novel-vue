let fs = require('fs');
var dbConfig = require('../util/dbconfig')
var moment = require('moment')
// alicloud
const Core = require('@alicloud/pop-core');
const config = require('../util/aliconfig');
const { SySqlConnect } = require('../util/dbconfig');

// 配置
let client = new Core(config.alicloud)
let requestOption = {
    method: 'POST'
}
// 随机四位数
function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

// 手机号验证码
var validatePhoneCode = [];
let sendCodeP = (phone) => {

    for (const item of validatePhoneCode) {
        if (phone == item.phone) {
            return true
        }
    }
    return false
}
// 验证
let findCodeAndPhone = (phone, code) => {
    for (const item of validatePhoneCode) {
        if (phone == item.phone && code == item.code) {
            return 'login'
        }
    }
    return 'error'
}
//检测验证码登录是否第一次登录
let phoneLoginBind = async (phone, password) => {
    let sql = 'select * from user where username=? or phone=?';
    let sqlArr = [phone, phone];
    let res = await dbConfig.SySqlConnect(sql, sqlArr);
    if (res.length) {
        // 有登录信息
        res[0].userinfo = await getUserInfo(res[0].id);
        return res;
    } else {
        //用户第一次注册，绑定表
        let res = await regUser(phone, password);
        //获取用户的信息详情
        res[0].userinfo = await getUserInfo(res[0].id);
        return res;

    }
}
//用户注册
let regUser = async (phone, password) => {
    let userpic = 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=187504917,1597926590&fm=26&gp=0.jpg';
    let sql = `insert into user(username,userpic,password,phone,status,create_time) value(?,?,?,?,?,?)`;
    let sqlArr = [phone, userpic, password, phone,1, (new Date()).valueOf()];
    let res = await dbConfig.SySqlConnect(sql, sqlArr);
    if (res.affectedRows == 1) {//执行成功
        //执行成功，获取用户信息
        //获取用户信息方法
        let user = await getUser(phone);
        //绑定用户副表
        let userinfo = await createUserInfo(user[0].id);
        if (userinfo.affectedRows == 1) {
            return user;
        } else {
            return false;
        }
    } else {
        return false;
    }

}

//获取用户信息
let getUser = (username) => {
    let sql = `select * from user where username=? or phone=?`;
    let sqlArr = [username, username];
    return dbConfig.SySqlConnect(sql, sqlArr);
}

//创建副表
let createUserInfo = (user_id) => {
    let sql = `insert into userinfo(user_id,age,sex,job) values(?,?,?,?)`;
    let sqlArr = [user_id, 18, 2, '未设置'];
    return dbConfig.SySqlConnect(sql, sqlArr);
}

//获取注册用户的详情
let getUserInfo = (user_id) => {
    let sql = `select age,sex,job,path,birthday from userinfo where user_id=?`;
    let sqlArr = [user_id];
    return dbConfig.SySqlConnect(sql, sqlArr);
}
//查看用户是否有详情信息
let finUserInfo = async (user_id) => {
    let sql = `select * from userinfo where user_id=?`;
    let sqlArr = [user_id];
    let res = await dbConfig.SySqlConnect(sql, sqlArr);
    if (res.length) {
        return true;
    }
    return false;
}
//修改用户详细信息
let setUserInfo = async (user_id, age, sex, job, path, birthday) => {
    if (finUserInfo(user_id)) {
        let sql = `update userinfo  set age=?,sex=?,job=?,path=?,birthday=? where user_id=? `;
        let sqlArr = [age, sex, job, path, birthday, user_id]
        let res = await dbConfig.SySqlConnect(sql, sqlArr);
        if (res.affectedRows == 1) {
            let user = await getUser(user_id);
            let userinfo = await getUserInfo(user_id);
            user[0].userinfo = userinfo[0];
            return user;
        } else {
            // console.log(1);
            return false
        }
    } else {
        let sql = `insert into userinfo (user_id,age,sex,job,path,birthday) values(?,?,?,?,?,?)`;
        let sqlArr = [user_id, age, sex, job, path, birthday];
        let res = await dbConfig.SySqlConnect(sql, sqlArr);
        if (res.affectedRows == 1) {
            let user = await getUser(user_id);
            let userinfo = await getUserInfo(user_id);
            user[0].userinfo = userinfo[0];
            return user;
        } else {
            // console.log(2);

            return false
        }
    }
}
//修改用户名称
let setUserName = async (user_id, username) => {
    let sql = `update user set username=? where id=?`;
    let sqlArr = [username, user_id];
    let res = await dbConfig.SySqlConnect(sql, sqlArr);
    if (res.affectedRows == 1) {
        return true;
    } else {
        return false;
    }
}


// 真实验证码
sendCoreCode = (req, res) => {
    let phone = req.query.phone;
    let code = rand(1000, 9999);
    var params = {
        "RegionId": "cn-hangzhou",
        "PhoneNumbers": phone,
        "SignName": "ABC商城",
        "TemplateCode": "SMS_202547857",
        "TemplateParam": JSON.stringify({ "code": code })
    }
    client.request('SendSms', params, requestOption).then((result) => {
        console.log(result);
        if (result.Code == 'OK') {
            res.send({
                'code': 200,
                'msg': '发送成功'
            });
            validatePhoneCode.push({
                'phone': phone,
                'code': code
            })
            console.log(code);
        } else {
            res.send({
                'code': 400,
                'msg': '发送失败'
            })
        }
    })
}

// 模拟验证码
sendCode = (req, res) => {

    let phone = req.query.phone;

    if (sendCodeP(phone)) {
        res.send({
            'code': 400,
            'msg': '已经发送过验证码，稍后再发'
        })

    }

    let code = rand(1000, 9999);
    validatePhoneCode.push({
        phone,
        code
    })
    res.send({
        'code': 200,
        'msg': '发送成功',
        'Code':code
    })
    console.log(code);
}

// 验证码登录
codePhoneLogin = async (req, res) => {
    let { phone, code, password } = req.query;
    if (sendCodeP(phone)) {
        let status = findCodeAndPhone(phone, code)
        if (status == 'login') {
            let user = await phoneLoginBind(phone, password)
            res.send({
                'code': 200,
                'msg': '登陆成功',
                'data': user[0]
            })
        } else if (status == 'error') {
            res.send({
                'code': 400,
                'msg': '登陆失败'
            })
        }
    } else {
        res.send({
            'code': 400,
            'msg': '验证码错误'
        })
    }
}

// 获取用户名密码符合的结果
getuserOne=(username,password)=>{
    let sql = 'select * from user where phone=? and password=? or username=? and password=?';
    let sqlArr = [username, password, username, password];
    return dbConfig.SySqlConnect(sql, sqlArr); 
}

//手机号登录 手机号+密码
login=async (req,res)=>{
    let {username,password}=req.query;
    let phone = /^1\d{10}$/;
    if (phone.test(username)) {
        let data=await getuserOne(username,password)
        if(data[0] == undefined){
            res.send({
                'code': 400,
                'msg':'用户名或者密码出错！',
                'data':[]
            });
        }else{
            let user_id = data[0].id;
            await changeStatus(1,username);
            data=await getuserOne(username,password)
            let result = await getUserInfo(user_id); 
            data[0].userinfo = result[0];
            res.send({
                'code': 200,
                'msg': '登录成功',
                'data': data[0]
            });
        }

    }
}
// login = (req, res) => {
//     let username = req.query.username,
//         password = req.query.password;
//     let phone = /^1\d{10}$/;
//     let email = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
//     if (phone.test(username)) {
//         let sql = 'select * from user where phone=? and password=? or username=? and password=?';
//         let sqlArr = [username, password, username, password];
//         let callBack = async (err, data) => {
//             if (err) {
//                 console.log(err);
//                 res.send({
//                     'code': 400,
//                     'msg': '出错啦'
//                 });
//             } else if (data == '') {
//                 res.send({
//                     'code': 400,
//                     'msg': '用户名或者密码出错！',
//                     'data': []
//                 });
//             } else {
//                 let user_id = data[0].id;
//                 await changeStatus(1,user_id);
//                 let result = await getUserInfo(user_id);            
//                 data[0].userinfo = result[0];
//                 res.send({
//                     'code': 200,
//                     'msg': '登录成功',
//                     'data': data[0]
//                 });

//             }
//         }
//         dbConfig.sqlConnect(sql, sqlArr, callBack);
//     } else if (email.test(username)) {
//         let sql = `select * from user where email=? and password=?`;
//         let sqlArr = [username, password];
//         let callBack = async (err, data) => {
//             if (err) {
//                 console.log(err);
//                 res.send({
//                     code: 400,
//                     msg: '出错了'
//                 });
//             } else if (data == '') {
//                 res.send({
//                     code: 400,
//                     msg: '邮箱或者密码出错！'
//                 });
//             } else {
//                 let user_id = data[0].id;
//                 await changeStatus(1,user_id);
//                 let result = await getUserInfo(user_id);
//                 data[0].userinfo = result[0];
//                 res.send({
//                     code: 200,
//                     msg: '登录成功',
//                     data: data[0]
//                 });
//             }
//         }
//         dbConfig.sqlConnect(sql, sqlArr, callBack);
//     } else {
//         let sql = `select * from user where username=? and password=?`;
//         let sqlArr = [username, password];
//         let callBack = async (err, data) => {
//             if (err) {
//                 console.log(err);
//                 res.send({
//                     code: 400,
//                     msg: '出错了'
//                 });
//             } else if (data == '') {
//                 res.send({
//                     code: 400,
//                     msg: '邮箱或者手机号出错'
//                 });
//             } else {
//                 let user_id = data[0].id;
//                 await changeStatus(1,user_id);

//                 let result = await getUserInfo(user_id);
//                 data[0].userinfo = result[0];
//                 res.send({
//                     code: 200,
//                     msg: '登录成功',
//                     data: data[0]
//                 });
//             }
//         }
//         dbConfig.sqlConnect(sql, sqlArr, callBack);
//     }

// }


//修改资料
editUserInfo = async (req, res) => {
    let { user_id, username, age, sex, job, path, birthday } = req.query;
    let result = await setUserName(user_id, username);
    if (result) {
        let data = await setUserInfo(user_id, age, sex, job, path, birthday);
        console.log(data);
        if (data.length) {
            res.send({
                'code': 200,
                'data': data[0]
            })
        } else {
            res.send({
                'code': 400,
                'msg': '修改失败'
            })
        }
    } else {
        res.send({
            'code': 400,
            'msg': '修改失败2'
        })
    }
}
//检查用户密码
checkUserPwd = async (id) => {
    let sql = `select password from user where id=?`;
    let sqlArr = [id];
    let res = await dbConfig.SySqlConnect(sql, sqlArr);
    console.log(res[0].password)
    if (res.length) {
        return res[0].password;
    } else {
        return 0;
    }
}
//修改用户密码
setPassword = async (req, res) => {
    let { user_id, oldpassword, newpassword } = req.query;
    let userPwd = await checkUserPwd(user_id);
    if (userPwd) {
        console.log(userPwd, oldpassword)
        if (userPwd == oldpassword) {
            let sql = `update user set password=? where id=?`;
            let sqlArr = [newpassword, user_id];
            let result = await dbConfig.SySqlConnect(sql, sqlArr);
            if (result.affectedRows) {
                res.send({
                    code: 200,
                    msg: '修改密码成功！'
                })
            } else {
                res.send({
                    code: 400,
                    msg: '修改密码失败！'
                })
            }
        } else {
            res.send({
                code: 400,
                msg: '原密码输入错误！'
            })
        }
    } else {
        let sql = `update user set password=? where id=?`;
        let sqlArr = [newpassword, user_id];
        let result = await dbConfig.SySqlConnect(sql, sqlArr);
        if (result.affectedRows) {
            res.send({
                code: 200,
                msg: '修改密码成功！'
            })
        } else {
            res.send({
                code: 400,
                msg: '修改密码失败！'
            })
        }
    }
}

// 绑定用户邮箱接口
bindEmail = async (req, res) => {
    let { user_id, email } = req.query;
    let sql = `update user set email=? where id=?`;
    let sqlArr = [email, user_id];
    let result = await dbConfig.SySqlConnect(sql, sqlArr);
    console.log(result);
    if (result.affectedRows == 1) {
        res.send({
            code: 200,
            msg: '邮箱绑定成功'
        })
    } else {
        res.send({
            code: 400,
            msg: '邮箱绑定失败'
        })
    }
}
//图片上传
editUserImg = (req, res) => {
    if (req.file.length === 0) {
        res.render('error', { message: '上传文件不能为空！' });
    } else {
        let file = req.file;
        fs.renameSync('./public/uploads/' + file.filename, './public/uploads/' + file.originalname);
        res.set({
            'content-type': 'application/JSON; charset=utf-8'
        })
        let { user_id } = req.query;
        let imgUrl = 'http://localhost:3000/public/uploads/' + file.originalname;
        let sql = `update user set userpic=? where id=?`;
        let sqlArr = [imgUrl, user_id];
        dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
            if (err) {
                console.log(err);
                throw '出错了';
            } else {
                if (data.affectedRows == 1) {
                    res.send({
                        code: 200,
                        msg: '修改成功',
                        url: imgUrl
                    })
                } else {
                    res.send({
                        code: 400,
                        msg: '修改失败'
                    })
                }
            }
        })
    }

}

//批量多图上传
uploadMoreImg = (req, res) => {
    console.log('------------------------')
    if (req.files.length === 0) {
        res.render('error', { message: '上传文件不能为空！' });
    } else {
        let sql = `insert into image (url,create_time,user_id) values `;
        let sqlArr = [];
        for (var i in req.files) {
            res.set({
                'content-type': 'application/json; charset=utf8'
            });
            let file = req.files[i];
            fs.renameSync('./public/uploads/' + file.filename, './public/uploads/' + file.originalname);
            let { user_id } = req.query;
            let url = 'http://localhost:3000/uploads/' + file.originalname;
            if (req.files.length - 1 == i) {
                sql += '(?)'
            } else {
                sql += '(?),'
            }
            sqlArr.push([url, (new Date().valueOf()), user_id])
        }
        //批量存储到数据库
        dbConfig.sqlConnect(sql, sqlArr, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                if (data.affectedRows > 0) {
                    res.send({
                        code: 200,
                        affectedRows: data.affectedRows,
                        msg: '上传成功'
                    });
                } else {
                    res.send({
                        code: 400,
                        msg: '上传失败'
                    });
                }
            }
        })
    }
}

//发布视频
publlish = async (req, res) => {
    let { user_id, title, url, path, isopen, postimg } = req.query;
    let sql = 'insert into post (user_id,title,url,path,isopen,postimg,create_time) values (?,?,?,?,?,?,?)';
    let sqlArr = [user_id, title, url, path, isopen, postimg, (new Date()).valueOf()];
    let post_id = await dbConfig.SySqlConnect(sql, sqlArr).then(res => {
        console.log(res);
        return res.insertId;
    }).catch(err => {
        return false;
    })
    if (post_id) {
        res.send({
            code: 200,
            msg: '发布成功'
        })
    } else {
        res.send({
            code: 400,
            msg: '发布失败'
        })
    }
}

// 修改status状态
changeStatus=(num,phone)=>{
    let sql = `update user set status=? where phone=?`;
    let sqlArr = [num,phone];
    return dbConfig.SySqlConnect(sql, sqlArr); 
}

//退出
logout =async (req, res) => {
    let { phone } = req.query;  
    let result = await changeStatus(0,phone);
    let data=await getLogout(phone)
    if(result.affectedRows == 1){
        res.send({
            code: 200,
            msg: '退出成功',
            data
        })
    }else{
        res.send({
            code: 400,
            msg: '退出失败'
        })
    }
    
}
//设置history
createHistory = (user_id, num_title, pic, url,book_name) => {
    let sql = `insert into history(user_id, num_title, pic, url,book_name,createtime) values(?,?,?,?,?,?)`;
    let sqlArr = [user_id, num_title, pic, url,book_name,(new Date()).valueOf()];
    return dbConfig.SySqlConnect(sql, sqlArr);
}
// 返回设置history成功与否状态
setHistory = async (req, res) => {
    let {user_id, num_title, pic, url,book_name} = req.query;
    let data = await createHistory(user_id, num_title, pic, url,book_name)
    if (data) {
        res.send({
            'code': 200,
            'msg': '浏览历史设置成功'
        })
    } else {
        res.send({
            'code': 400,
            'msg': '浏览历史设置失败'
        })
    }
}

gethistory = async (user_id) => {
    let sql = `select * from history where user_id=?`;
    let sqlArr = [user_id];
    return dbConfig.SySqlConnect(sql, sqlArr);
}
// 获取浏览历史
history = async (req, res) => {
    let { user_id } = req.query;
    let history = await gethistory(user_id)
    res.send({
        history
    })
}

deletehistory = (num_title,user_id) => {
    let sql = `delete from history where num_title=? and user_id=?`;
    let sqlArr = [num_title,user_id];
    return dbConfig.SySqlConnect(sql, sqlArr);
}
//删除浏览历史
delHistory = async (req, res) => {
    let { num_title, user_id } = req.query;
    await deletehistory(num_title,user_id)
    let history = await gethistory(user_id)
    res.send({
        history
    })
}


// 清空浏览历史
delALLHistory=async (req,res)=>{
    let {user_id}=req.query;
    let sql = `delete from history where user_id=?`;
    let sqlArr = [user_id];
    let data=await dbConfig.SySqlConnect(sql, sqlArr);
    if(data){
        let result=gethistory(user_id)
        res.send({
            'code':200,
            'msg':'删除成功',
            'data':result
        })
    }else{
        res.send({
            'code':400,
            'msg':'删除失败'
        })
    }
}


//创建books
createCollect = (user_id, name, pic, url) => {
    let sql = `insert into collect(user_id,name,pic,url) values(?,?,?,?)`;
    let sqlArr = [user_id, name, pic, url];
    return dbConfig.SySqlConnect(sql, sqlArr);
}
// 返回创建books成功与否状态
setBooks = async (req, res) => {
    let { user_id, name, pic, url } = req.query;
    let data = await createCollect(user_id, name, pic, url)
    if (data) {
        res.send({
            'code': 200,
            'msg': '设置书籍成功'
        })
    } else {
        res.send({
            'code': 400,
            'msg': '设置书籍失败'
        })
    }
}

getbooks = async (user_id) => {
    let sql = `select * from collect where user_id=?`;
    let sqlArr = [user_id];
    return dbConfig.SySqlConnect(sql, sqlArr);
}
// 获取收藏书籍
books = async (req, res) => {
    let { user_id } = req.query;
    let books = await getbooks(user_id)
    res.send({
        books
    })
}

deletebook = (name,user_id) => {
    let sql = `delete from collect where name=? and user_id=?`;
    let sqlArr = [name,user_id];
    return dbConfig.SySqlConnect(sql, sqlArr);
}
//取消收藏
delBook = async (req, res) => {
    let { name, user_id } = req.query;
    await deletebook(name,user_id)
    let books = await getbooks(user_id)
    res.send({
        books
    })
}

// 获取所有用户
getAllUsers = async (req, res) => {
    let sql = `select * from user`;
    let sqlArr = [];
    let data = await dbConfig.SySqlConnect(sql, sqlArr);
    res.send({
        'code': 200,
        'msg': '获取所有用户成功',
        data
    })
}
// 获取推出状态时的信息
getLogout = async (phone, res) => {
    let sql = `select * from user where phone=?`;
    let sqlArr = [phone];
    let data = await dbConfig.SySqlConnect(sql, sqlArr);
    return data;
}



module.exports = {
    sendCode,

    codePhoneLogin,

    sendCoreCode,

    login,

    editUserInfo,
    setPassword,
    bindEmail,

    logout,

    editUserImg,
    uploadMoreImg,
    publlish,

    setBooks,
    books,
    delBook,
    getAllUsers,

    setHistory,
    history,
    delHistory,
    delALLHistory
}