import React from "react"

export default class List extends React.Component{
    constructor(props){
        super(props)
        this.state={
            arr:[
                {id:1,name:"张三"},
                {id:2,name:"李四"},
                {id:3,name:"王五"},
            ]
        }
    }
    initList2(){
        let {arr} = this.state
        var res = arr.map(ele=>(
            <div key={ele.id}>
                <span>{ele.id}</span>
                <span>-</span>
                <span>{ele.name}</span>
            </div>
        ))
        return res
    }
    // 方式二
    initList(){
        let {arr} = this.state
        let res = []
        arr.map(ele=>{
            // 数据处理
            ele.id = ele.id *100
            res.push(
                <div key={ele.id}>
                    <span>{ele.id}</span>
                    <span>-</span>
                    <span>{ele.name}</span>
                </div>
            )
        })
        return res
    }
    render(){
        let {arr} = this.state
        return(
        <div>
            <div>列表渲染</div>
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
            <br/>
            <div>
                {this.initList()}
            </div>
            <br/>
            <div>
                {this.initList2()}
            </div>
        </div>
            
        )
    }
}