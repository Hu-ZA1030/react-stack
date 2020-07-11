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

##### 入口
```
  // 入口
    entry:{
        main:path.resolve(__dirname,"./src/main.js")
        // 使用path 只能使用绝对路径
        // 当然也可以使用相对路径
    },
```
##### 出口
```
// 出口
    output:{
        filename:"[name].[hash].js",
        path:path.resolve(__dirname,"./dist") // 打包到 ./dist 目录下
        // path："./dist" 不能使用这个相对路径
    },
```
##### plugin
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
##### loader
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


##### eslint
目的： 约束代码规范，在多人开发中统一代码规范，也就是说规范 js的语法
安装：
    cnpm install eslint -d
    cnpm install eslint-loader -D
然后创建一个 .eslintrc.json 文件进行配置，
```
{
"parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        // "semi": "error" 错误 h  2
        // "semi": "warn" // 警告  1
        "semi": "0" , //  或者off 就不会报分号错误
        "no-console":"off",
        "no-multi-spaces":"error"
    }
}
```
```
devServer{
  overlay:{ // 报错时出现浮层
            errors:true
        }
}

```

##### 使用 React
安装 ：
  cnpm install react react-dom -S
  cnpm @babel/preset-react -D
  同时也得添加一个配置文件： .babelrc.json
  ```
  {
    "presets": ["@babel/preset-react","@babel/preset-env"]
  }
  ```
babel就是用来编译js代码，这里我们也是得编译我们代码

安装 preset-env
cnpm install @babel/preset-env
作用： 为了使用较新的语法而安装babel/preset-env

##### 组件创建
使用 RouterDom，它必须在Router后面引入
使用 RouterDom.render() 方法来挂载

面试题： react有多少种创建组件的方式??
  react 有多少种创建组件的的方法
  ES5组件  React.createElement()
  类组件 class User extends React.Commonent{}
  无状态组件： function User(props){}
  高阶组件 function  Hoc(child){}  一个组件作为参数传入，返回一个新的组件
  Hocks 组件


##### JSX
  JSX 是 JavaScript 和 XML 的一种语法糖
  例如：
    var ele = {
      <h1>hello word</h1>
  
  JSX的特点：
    JSX 不是强制性的，但是 JSX提高代码的可读性； 
    JSX 是一个变量，同时它也是对象，它是可以嵌套；
    JSX 中可以使用表达式，用单括号进行包裹；
      表达式:是指一个具体的值，而语法是可以用分号结束


##### 事件绑定
  事件怎么拿到事件对象，（事件冒泡，阻止默认事件）
  bind 的方式和箭头函数方式是不一样
  事件如何来传参??
```
//绑定点击事件的方式：
    // 第一种 bind绑定
    click1(arg,e){
        console.log("click1",arg,this,e)
    }
    // 第二种 箭头函数
    click2(arg,e){
        console.log("click2",arg,this,e)
    }
    // 第三种 构造函数用 bind
    click3(){
        console.log("click3",this)
    }

  render(){
        return(
            <div>
                <h1>我是User组件</h1>
                {/* bind()方法的第一个参数必须是this */}
                <button onClick={this.click1.bind(this,"1")}>点击事件1</button>
                <button onClick={(e)=>this.click2("2",e)}>点击事件2</button>
                <button onClick={this.click3}>点击事件3</button>
                <Child aaa="123456"></Child>
            </div>
        )
    }
```  