import React from "react"

export default class Home extends React.Component{
    constructor(props){
        super(props)
        this.state={
            list:[
                {id:1,name:"张三"},
                {id:2,name:"李四"},
                {id:3,name:"王五"},
            ]
        }
    }
    SkipToDetail(ele){
        this.props.history.push("/home/detail/"+ele.id+"/"+ele.name)
    }
    createList(){
        let {list} = this.state
        return list.map(ele=>(
            <div key={ele.id} onClick={this.SkipToDetail.bind(this,ele)}>
                <span>{ele.id}</span>
                <span>--</span>
                <span>{ele.name}</span>
            </div>
        ))
    }
    render(){
        return(
            <div>
                <h1>首页</h1>
                {this.createList()}
            </div>
        )
    }
}