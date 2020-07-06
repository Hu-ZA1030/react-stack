 var path = require("path")
 var HtmlwebackPlugin = require("html-webpack-plugin")
 var {CleanWebpackPlugin} = require("clean-webpack-plugin")
 const webpack = require('webpack');


//将所有的配置放在一个变量中，然后通过module.export 暴露出来
var config = {
    mode:"production",
    // 入口
    entry:{
        main:path.resolve(__dirname,"./src/main.js")
        // 使用path 只能使用绝对路径
        // 当然也可以使用相对路径
    },
    // 出口
    output:{
        filename:"[name].[hash].js",
        path:path.resolve(__dirname,"./dist") // 打包到 ./dist 目录下
        // path："./dist" 不能使用这个相对路径
    },
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

     resolve:{
         alias:{
            //  当我们引入文件就可以使用 @ 引入
             "@":path.resolve(__dirname,"./src")
         }
     },

}

var env = process.env.NODE_ENV
// console.log("env--->",env) //development

// 通过if 判断来区分  开发环境和生产环境
if(env == "development"){
    // 切换mode
    config.mode = "development",
    // 热更新 需要的两个对象，我们之间push到数组中去
    // 用于模块热更新 ，webpack内置模块
    // 只对main.js入口文件之后的才会起作用
    config.plugins.push(new webpack.NamedModulesPlugin())
    config.plugins.push(new webpack.HotModuleReplacementPlugin())

    //本地服务
    config.devServer={
        //  host:"localhost"
        port:8000,
        contentBase:path.resolve(__dirname,"./public"),
        open:true, // 自动打开浏览器
        hot:true, //开启热更新
     }


}






 // 使用 commonJS语法 ，这里module.exports
module.exports = config