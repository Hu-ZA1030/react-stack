import React from "react"

// jsx  = javaScript XML 的语法糖
// jsx  就是一个变量
var ele = (
    <div>hello jsx</div>
)
  
export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            msg:"林深时起雾，海蓝时浪涌"
        }
    }
    init(){
        return ele
    }
    render(){
        return(
            <div>
                <h2>{this.state.msg}</h2>
                <h2>{this.init()}</h2>
            </div>
            
        )
    }
}