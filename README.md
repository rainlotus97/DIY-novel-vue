# DIY-novel-vue
自定义小说漫画听书+mysql后台，vue开发

# 关于LoginShare

### 这个是后台用户提供API接口的服务器。

将db文件夹的文件用mysql的相关可视化工具运行一遍，将util下的两个文件根据自己实情进行修改，特别是aliconfig.js中的配置，需要你自己去阿里云官方开通短信验证服务，把代码进行修改，controllers下的UserController.js也需要按自身的情况修改一下。

安装运行操作流程：

1. npm i
2. npm run serve
3. 记得把mysql开开，不开报错我不管。

# 关于novel-vue

这个是主程序软件，接口多种多样，导致性能方面不友好，阅读界面太反人类，以后有时间改。数据的接口目前还没有太大问题，部分书籍要么搜不到，要么就是有章节目录没有内容。毕竟盗版，解决不了。

安装运行操作流程：

1. npm i
2. npm run serve

# 总结：

总体上页面的美观上下了一丢丢功夫，但实际效用有点差强人意，以上！
