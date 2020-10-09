const mysql = require('mysql')
module.exports = {
    // 数据库配置
    config: {
        host: 'localhost',
        port: '3306',
        user: 'exapp',
        password: '123456',
        database: 'exapp',
    },
    // 连接数据库
    sqlConnect: function (sql, sqlArr, callBack) {
        var pool = mysql.createPool(this.config)
        pool.getConnection((err, conn) => {
            if (err) {
                console.log('连接失败');
                return
            }
            conn.query(sql, sqlArr, callBack);
            conn.release()
        })
    },
    SySqlConnect: function (sySql, sqlArr) {
        return new Promise((resolve, reject) => {
            var pool = mysql.createPool(this.config);
            pool.getConnection(function (err, conn){
                if (err) {
                    reject(err)
                } else {
                    conn.query(sySql, sqlArr, (err, data) => {
                        if (err) {
                            reject(err)
                        } else {
                            resolve(data)
                        }
                    });
                    // 释放连接
                    conn.release()
                }

            })
        }).catch((err)=>{
            console.log(err);
        })
    }
}