## 目标

1、从零到一搭建React项目工程架构
2、学习React技术栈：React、React-Router、Mobx
3、硬件：win7/win10
4、环境：node.js v12+
5、构建工具：Webpack


## 起步

1、创建项目 npm init


## Webpack

是前端工程的构建工具
是前端资源打包器
webpack 之间的版本差异特别大，安装webpack时，根据项目的来安装指定的版本

安装webpack：
  cnpm install webpack -D
  cnpm install webpack -g
作用是能够使用 webpack命令：
  cnpm install webpack-cli -D
  cnpm install webpack-cli -g

手动创建 webpack.config.js

手动创建 入口文件 main.js  在根目录创建src文件夹，然后创建入口文件

编写webpack.config.js配置文件

打包命令：webpack --config webpack.config.js


重点：入口、出口、loader、plugin

#####入口
```
  // 入口
    entry:{
        main:path.resolve(__dirname,"./src/main.js")
        // 使用path 只能使用绝对路径
        // 当然也可以使用相对路径
    },
```
#####出口
```
// 出口
    output:{
        filename:"[name].[hash].js",
        path:path.resolve(__dirname,"./dist") // 打包到 ./dist 目录下
        // path："./dist" 不能使用这个相对路径
    },
```
#####plugin
插件的目的在于解决loader无法实现的事情，而plugin就是来存放我们的实例
```
 // plugin
    plugins:[
        // 把打包的js文件自动插入到html模板中去
        new HtmlwebackPlugin({
            title:"2001",  // 我们index.html的title,
            // 将我们的代码插入到index.html
            template:path.resolve(__dirname,"./public/index.html")
        }),
        // 删除我们生成的dist包,webpack安装是会报错，要根据官方文档
        new CleanWebpackPlugin(),  
    ],
```
#####loader
loader用于对模块进行转换，loader 可以使你在 import 或"加载"模块时预处理文件，不管什么都是模块，哪怕是一张图片也是模块，都能将其转换
```
 // loader  解决模块打包的
     module:{
        rules:[
            // {test:/\.css$/,use:['style-loader','css-loader']}, // 当你遇到 .css 文件时，就使用 style-load 和 css-loader
        
            // {test:/\.scss$/,use:['style-loader','css-loader',"sass-loader"]},
            {test:/\.(css|scss)$/,use:['style-loader','css-loader',"sass-loader"]},
            {test:/\.(png|svg|jpg|gif)$/,use:["file-loader"]},
            // exclude 不包含，就是忽略node_modules
            {test:/\.js$/,exclude:/node_modules/,use:["babel-loader"]}
        ]
     },

```

plugin插件：
  用于打包时的额外功能
  html-webpack-plugin
  clean-webpack-plugin

loaders用于编译打包文件模块，将其转换成浏览器能够识别的代码
  css -> 用到 style-loader  css-loader
  sass -> 用到 style-loader  css-loader  sass-loader  node-sass
  js -> babel-loader  @babel/core



本地服务： cnpm install webpack-dev-server -S
   webpack-dev-server
     open
     contentBase
     hot
  ```
  //本地服务
    config.devServer={
        //  host:"localhost"
        port:8000,
        contentBase:path.resolve(__dirname,"./public"),
        open:true, // 自动打开浏览器
        hot:true, //开启热更新
     }
  ```
  热更新：
    devServer.hot = true

    用于模块热更新 ，webpack内置模块
    只对main.js入口文件之后的才会起作用
    使用两个webpack的内置插件:
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()


生成环境与开发环境的区分：
  cross-env 使用这个包来指定 process.env.NODE_ENV 环境变量

  ```
// package.json 
    "build": "cross-env NODE_ENV=prodection webpack --config webpack.config.js",
    "server": "cross-env NODE_ENV=development webpack-dev-server --open",

// webpack.config.js
var env = process.env.NODE_ENV
// console.log("env--->",env) //development
if(env == "development"){  
    // 切换mode
    config.mode = "development",
    // 入口 ，出口，loader，plugins
  }
  ```
这里有两种方式：一个是生产环境 和 开发环境
当我们要开发项目的时候，我们使用  npm run server 命令来运行项目，在webpack会进行判断，我们的 ；
当我们项目完成需要打包的时候，我们就切换到prodection来打包，我们就使用命令npm run build
