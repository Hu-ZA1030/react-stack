import React from "react"

export default class Ref extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            msg:"我是ref子组件"
        }
    }
    childFn(){
        console.log("-------",this.state.msg)
        console.log("父组件传递的参数",this.props.aaa)
    }
    render(){
        return(
            <div>
                <h3>我是ref子组件</h3>
            </div>
        )
    }
}