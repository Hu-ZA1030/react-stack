import React from "react"
import {Child} from "@/components"
import "./style.scss"

export default class Condition extends React.Component{
    constructor(props){
        super(props)
        this.state={
            bol:false,
            color:"red",
            dis:"inline-block"
        }
    }
    changeStyle(){
        // let {color,dis} = this.state
        var num = Math.random()*10
        this.setState({
            color:num<=5?"red":"pink",
            dis:num>5?"inline-block":"none"
        })
        console.log(num)

    }
    render(){
        let {bol,color,dis} = this.state
        return(
            <div>
                <h1 className="box">条件渲染</h1>
                {/* {this.state.bol && "hello React"} */}
                {bol && <Child></Child>}
                <h1 className={bol?'red':'pink'}>你好！七月，请善待每一个人</h1>
                <button onClick={this.changeStyle.bind(this)}>改变样式</button>
                <div className={color}>烟波三月下扬州</div>
                <div style={{color:color,display:dis}}>林深时雾起，海蓝时浪涌，梦醒时无你</div>
            </div>
        )
    }
}
