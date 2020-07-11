import React from "react"
import {Child1,Child2} from "@/components"

export default class State extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            role:"管理员"
        }
    }
    childFn(arg){
        console.log("父")
        this.setState({
            role:arg
        })
    }
    changeRole(){
        this.setState({
            role:"普通管理员"
        })
    }
    render(){
        let {role} = this.state
        return(
            <div>
                <h1>状态提升,父子组件传值</h1>
                <Child1 role={role} onRoleChange={this.childFn.bind(this)}></Child1>
                <Child2 role={role} onRoleChange={this.childFn.bind(this)}></Child2>
                <button onClick={this.changeRole.bind(this)}>改变角色</button>
            </div>
        )
    }
}