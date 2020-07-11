import React from "react"

// 高阶组件(也是函数)，实际上就是一个纯函数
// 纯函数：唯一的输入得到唯一的输出
// render也是纯函数

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
export default hoc(TestHoc)