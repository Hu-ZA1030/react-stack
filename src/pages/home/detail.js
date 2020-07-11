import React from "react"

export default class Detail extends React.Component{
    componentDidMount(){
        // this.props 可以获取地址栏传递参数
        console.log("detail",this.props)
    }
    render(){
        // 获取传递过来的数据
        let {match} = this.props
        return(
            <div>
                <span>{match.params.id}</span>
                <span>-</span>
                <span>{match.params.name}</span>
            </div>
        )
    }
}