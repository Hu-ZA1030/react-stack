//  react 有多少种创建组件的的方法
// ES5组件  React.createElement()
// 类组件 class User extends React.Commonent{}
// 无状态组件： function User(props){}
// 高阶组件 function  Hoc(child){}  一个组件作为参数传入，返回一个新的组件
// Hocks 组件

import React from "react"
import {Child} from "@/components"

// 类组件
//  props 是父子之间的通信纽带
//  props 是只能读


class User extends React.Component{
    constructor(props){
        super(props)
        // 当 state 发生变化时，视图自动变化（单向数据流）
        this.state = {
            msg:"hello child"
        }
        this.click3 = this.click3.bind(this,"三")
    }

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

    // 点击改变state
    msgHandle(){
        this.setState({
            msg:"你好，世界"
        },function(){
            console.log("msg发生改变")
        })
    }

    render(){
        return(
            <div>
                <h1>我是User组件</h1>
                {/* bind()方法的第一个参数必须是this */}
                <button onClick={this.click1.bind(this,"1")}>点击事件1</button>
                <button onClick={(e)=>this.click2("2",e)}>点击事件2</button>
                <button onClick={this.click3}>点击事件3</button>
                <button onClick={this.msgHandle.bind(this)}>改变msg</button>
        <Child aaa="123456" bbb={this.state.msg}></Child>
            </div>
        )
    }
}

export default User