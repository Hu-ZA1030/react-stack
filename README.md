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

  类组件：
  props  是父子组件之间通信的纽带 ，{this.props}


##### JSX
  JSX 是 JavaScript 和 XML 的一种语法糖
  例如：
  ```
    var ele = {
      <h1>hello word</h1>
    }
  ```
  JSX的特点：
    JSX 不是强制性的，但是 JSX提高代码的可读性； 
    JSX 是一个变量，同时它也是对象，它是可以嵌套；
    JSX 中可以使用表达式，用单括号进行包裹；
      表达式:是指一个具体的值，而语法是可以用分号结束


##### 事件绑定
  事件怎么拿到事件对象，（事件冒泡，阻止默认事件）
  bind 的方式和箭头函数方式是不一样
  事件如何来传参??
  注意： react 的事件绑定都通过使用 驼峰命名，而且在事件前面还必须使用 on
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

##### 条件渲染
下面代码： 通过点击按钮来改变样式，通过条件渲染来判断，注意:style他是一个对象，本身就带有括号，所以，它是两个括号

```
 changeStyle(){
        var num = Math.random()*10
        this.setState({
            color:num<=5?"red":"pink",
            dis:num>5?"inline-block":"none"
        })
        console.log(num)

    }

<button onClick={this.changeStyle.bind(this)}>改变样式</button>
<div className={color}>烟波三月下扬州</div>
<div style={{color:color,display:dis}}>林深时雾起，海蓝时浪涌，梦醒时无你</div>
```


###### 列表循环
一般在项目开发过程中，列表循环都是非常重要，前端开发，当从后端调取数据，大部分还都是同列表循环将数据渲染到网页上,然而，react 的列表循环要注意，我们大部分还都是 jsx对象，那么，map的回调函数的花括号省略，而是用小括号 “map(ele=>())”
```
<div>
    {
        //方式一
    arr.map(ele => (
    <div key={ele.id}>
        <span>{ele.id}</span>
        <span>-</span>
        <span>{ele.name}</span>
    </div>
    ))
    }
</div>
```

##### 表单
表单一直是一个非常复杂的组件，react 将表达分为 受控表单和非受控表单;
受控表单：自己表单的变化回过头直接影响自己
非受控表单：不受响应式系统的影响，类似DOM操作

```
  // 方法复用
    formChange(key,e){
        this.setState({
            [key]:e.target.value
        })

    }

  {/* 受控表单 */}
  <input value={username} onChange={this.userHandle.bind(this)}/><br/>

  {/* 不算严格的受控表单 */}
  <input type="text" defaultValue={password}
  onInput={this.inputHandle.bind(this)}/><br/>

  {/* 非受控表单 */}
  <input id="mobile" type="text"/><br/>
  <input ref="address" type="text"/><br/>
  <input type="file"/>
  <button onClick={this.submit.bind(this)}>提交数据</button>

```

上述代码出现ES6计算属性名称的语法：
```
    this.setState({
        [key]:e.target.value
      })
```
等同于 ES5中：
```
var partialState = {};
partialState[name] = value;
this.setState(partialState);
```
拓展： 上述表单中使用ref属性，ref不仅可以操作表单，还可以操作DOM，更重要，它还可以操作我们的组件

#### 组合
  其实不管是vue还是react都是这样讲：一切皆组件！那么，在组件重用上，我们是使用继承还是组合？？？
  继承是面向对象的一种思想，在组件上也可以实现组件复用，但是！通过继承的方式来达到组件的复用，不觉得麻烦，而且繁琐，单写继承的名字就老长老长，那么，我们就推荐使用组合这样的方式。
  
  组合：在组件中嵌套组件提高组件的复用性
  例如：

  ```
  <Model1>
    <LogoutPane></LogoutPane>
  </Model1>

  // 子组件  通过{props.children} 来提供位置
  // LogoutPane 就是放置在{props.children}
  <div className="model">
    <div>标题</div>
    {props.children}
    <div>
        <button>取消</button>
        <button>确认</button>
    </div>
  </div>
  ```
#### react生命周期  
  react 生命周期分三个阶段：  
    一，挂载阶段 二，更新阶段  三，卸载阶段
  在每一个阶段都会有若干的钩子函数，在挂载阶段有三个重要的钩子函数，更新阶段也有三个重要的钩子函数，卸载阶段只有一个钩子函数：

##### 挂载阶段
```
    /*
      构造器
      不能使用 setState(),也不能把props赋值给state
    */ 
   constructor(props){
    //调用 父类的构造器
    super(props)
    this.state = {

    }
    console.log("constructor------>")
   }

//   很少用
// static getDerivedStateFromProps(){
//   console.log("getDerivedStateFromProps------>")
//   return null
// }

//非常重要的一个生命周期
// 表示DOM 准备就绪，动态数据都已经初始化完成
// 在这这生命周期会一般写 开启长连接，开启定时器，调接口
componentDidMount(){
  console.log("componentDidMount------->")
}

render(){
  console.log("render-----》唯一一个必须的要的钩子函数")
}
```
##### 更新阶段
```
// 这个生命周期函数是Diff 运算的开关
// 意思是：当前页面是否更新？ 返回值是一个布尔值
// 但是一般也很少使用
shouldComponentUpdate(){
  console.log("shouldComponentUpdate------->")
  return true
}

// 使用很少，返回值必须是对象，它与下面的生命周期函数配合使用，但是现在他使用很少
// getSnapshotBeforeUpdate(){
//   console.log("getSnapshotBeforeUpdate------->")
//   return null
// }

// render 在挂载和更新阶段都存在的钩子函数，因为只要state变化，它就会执行
//render(){
  //console.log("render-----》唯一一个必须的要的钩子函数")
//}

// DOM 更新完成时
componentDidUpdate(){
  console.log("componentDidUpdate---------->")
}
```
##### 卸载阶段
```
// 表示组件将要关闭，
// 关闭长连接，清楚定时器，和 componentDidMount相对应
componentWillUnmount(){
  console.log("componentWillUnmount--------->")
}
```
 * 总结：
 *  react 生命周期函数分为三个阶段： 挂载阶段，更新阶段， 卸载阶段
 * 每一个阶段都有对应的一些重要的生命周期函数：
 * 挂载阶段(3):constructor() render()  componentDidMount()
 * 更新阶段(3):shouldComponentUpdate() render() componentDidUpdate()
 * 卸载阶段：ComponentWillUnmount()

### 高阶指南
#### 片段（碎片）
平常我们的组件都是返回一个元素，回想一下，我们每次写组件，是不是都会用一个<div>包裹，然后返回出来，那如果想返回多个组价应该怎么做？？
 片段也就是碎片可以做到返回多个组件
 
```
// 这里有两种写法可以使用React.Fragment，也可以是空标签
// <React.Fragment>
<>
    <QfModel1></QfModel1>
    <QfModel2></QfModel2>
</>
// </React.Fragment>
```

#### 上下文
上下文其实是一种理念，在官网上，对上下文这样定义的：目的是为了共享那些对于一个组件树而言是“全局”的数据，
案例：当我们要更换主题，我们就可以使用上下文，而各种主题便是我们全局数据，我们通过获取主题，然后渲染到我们组件上
注：在传递数据的时候，我们避免使用 props传递数据，而是使用 this.context,来传递数据

指定 contextType 读取当前的 theme context
Testctx.contextType = ThemeContext
  
#### 高阶组件
定义： 高阶组件的参数是组件，返回值为新组件的纯函数
纯函数：唯一的输入得到唯一的输出
其实，render()也是纯函数

容器组件：对UI组件进行包装或者修饰
UI组件：普普通通的业务组件
无状态组件 也叫函数组件：
 function Model(props){
     return()
 }

```
// 定义一个组件
import hoc from "@/utils/hoc"
class TestHoc extends React.Component{
    render(){
        console.log(this.props) // 将hoc中定义的参数传递过来
        return(
           <div>
              <h1>测试高阶组件</h1> 
              {this.props.msg}
              {this.props.onInit()}
           </div> 
        )
    }
}
// hoc是一个高阶组件，也就是一个函数，将上面的TestHoc组件作为参数传递进去,然后抛出
export default hoc(TestHoc)

//在新页面定义一个高阶组价，他的参数必须是组件，否则就会报错
export default function hoc(WrappedComponent){
    return class extends React.Component{
        constructor(props){
          super(props)
          this.state = {
            msg:"hello Hoc",
            arr:[
                {id:1,label:"中国"},
                {id:2,label:"德国"},
                {id:3,label:"英国"},
                {id:4,label:"法国"},
            ]
          }
        }
        componentDidMount(){
            console.log("componentDidMount")
        }
        click(){
            console.log("child click",this)
        }
        createList(){
         let {arr} = this.state
         return arr.map(ele=>(
         <div key={ele.id}>{ele.label}</div>
         ))   
        }
        render(){
          return(
            <div>
                <h3>Hoc header</h3>
                <WrappedComponent msg={this.state.msg}
                onTest={this.click.bind(this)}
                onInit={this.createList.bind(this)}
                >
                </WrappedComponent>
                <h3>hoc footer</h3>
            </div>
          )
        }
    }
}
```

高阶组价是对UI组件的修饰，组合是对组件进行嵌套

#### 使用propType 进行类型检查
从 react v15.5 起将使用prop-type库代替，所以我们需要安装这个库，来进行类型检查
安装：npm install --save prop-types

```
// prop-types 用于规范子组件的自定义属性
import PropTypes from 'prop-types'
class Child3 extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div>
        <h3>子组件 - 3</h3>
        <h3>{this.props.aaa}</h3>
      </div>
    )
  }
}
// 检测数据类型
Child3.propTypes = {
  aaa: PropTypes.string,
  bbb: PropTypes.bool.isRequired
}
export default Child3


import { Child3 } from '@/components'
export default class TestType extends React.Component {
  render() {
    return(
      <div>
        <Child3 aaa={'1000'} bbb={true}></Child3>
      </div>
    )
  }
}

```

#### hooks
hooks 是V16版本以上才出现
hooks他是一套组API(函数)
那么，Hooks有什么API？？
useState
useEffect
usecontext
自定义Hooks

同样，Hooks能解决啥问题嘞？？
大家都知道，组件的创建有好多种方式，例如，类组件，函数组件(无状态组件)，两者相比下，函数组件性能好，但是没有生命周期，没有this,处于项目性能考虑，我们大部分还是想使用函数组件，那么，Hooks就解决了我们函数组件拥有生命周期，state等特性

Hooks的使用：
```
// 导入
import React, { useState, useEffect } from 'react'
console.log('use', useState)
export default function TestHook(props) {

  let [count, setCount] = useState(20)
  let [msg, setMsg] = useState('hello hook')
  let [list, setList] = useState([])

  var timer = null
  function countChange() {
    setCount(count+1)
    setMsg(msg+'1')
  }

  // componentDidMount   mounted
  // componentDidUpdate  updated
  // componentWillUnmount  beforeDestroyed
  // 使用定时器

  // useEffect第一个参数，必须是一个函数，并且这个函数要有返回值
  // 第二个参数是开关，若是定时器，第二个参数改变一次，定时器启动一次
  useEffect(()=>{
    // 调接口，开启长连接、开启定时
    // 做其它初始化的业务逻辑
    console.log('-----effect')
    timer = setInterval(()=>{
      setCount(count+1)
    }, 1000)
    return ()=>{
      // 清除长连接、清除定时器
      clearInterval(timer)
    }
  }, [msg,list]) // 开关

  // 使用长连接
  useEffect(()=>{
    // open websocket
    return ()=>{
      // close websocket
    }
  })

  useEffect(()=>{
    document.title = '你们'
    document.getElementById('box').style.color = 'red'
    return undefined
  })

  return (
    <div>
      <h1>Hooks测试</h1>
      <h3>{count}</h3>
      <button onClick={countChange}>增加</button>
      <hr/>
      <h3>{msg}</h3>
      <h3 id='box'>ref dom</h3>
    </div>
  )
}

```

### 路由（重重点）
前言：React的路由是有其他人管理滴，所以！在React官网上没有找到Router，那么，我们应该去哪里找React的路由嘞？？
在npm 的官网上搜索：react-router,你会发现一个很神奇的事情，react-router会给你提示：
{
   If you are writing an application that will run in the browser, you should instead install react-router-dom. Similarly, if you are writing a React Native application, you should instead install react-router-native
}
大概的意思是如果项目在browser运行，你就应该去下载react-router-dom，同样，如果你项目是在App上运行，就应该去下载react-router-native，嘿嘿，react在路由上与Vue还有有差异的，根据不同设备来下载路由。
然后，我们在npm官网上搜索 react-router-dom，此时，你又会发现一个神奇的事，它只有简简单单的下载和引入就莫得了？？？
其实我们还是需要去找找它：
React Router is built and maintained by React Training.，它会带我们找到一个奇奇怪怪的官网，然后又懵了，这也不是react-router文档啊，当你一直往下划，在底部导航，你会发现一个 react-router的导航，点击进入文档

路由：HashRouter 和 BrowserRouter(相对于Vue中的history模式)

React的路由和Vue的路由差别还是比较大，React的路由大部分还是要自己写

1：下载，引入路由
import {
    HashRouter,
    NavLink,
    Route,
    Switch,
    Redirect, 
} from "react-router-dom"

// pages抛出组件(抛出是对象格式)
import routes from "@/pages"

2:创建路由地址
```
 // 遍历循环，生成左边导航
  // exact 精准匹配
  // activeClassName 高亮样式
  createNavList(){
      return routes.map(ele=>(
          <div key={ele.id} className="link">
              <NavLink 
                  to={ele.path}
                  exact
                  activeClassName="on">
                  {ele.text}
              </NavLink>
          </div>
      ))
  }
// 遍历循环，生成右边主题内容
// 这里不能嵌套div，因为Router 和 Switch 是直接的父子关系，中间不能有其他元素包裹，保证匹配是path有且只有一对成立
createRoute(){
    var res = []
    routes.map(ele=>{
        res.push(
            <Route
                key={ele.id}
                exact
                path={ele.path}
                component={ele.component}>
            </Route>
        )
        if(ele.children){
            ele.children.map(ele=>{
                res.push(
                    <Route
                        key={ele.id}
                        exact
                        path={ele.path}
                        component={ele.component}>
                    </Route>
                )
            })
        }
    })
    return res
}
```
3：在APP中创建组件路由
```
 <HashRouter>
  <div>
      <div className="left">
          {this.createNavList()}
      </div>
      <div className="right">
          {/* 
              这是一组匹配规则，从上到下进行匹配，若匹配到，则不会往下继续匹配，哪怕后面也能匹配成功
          */}
          <Switch>
              {this.createRoute()}
              <Redirect
                  from="/*"
                  to="/">
              </Redirect>
          </Switch>
      </div>
  </div>
</HashRouter>
```


