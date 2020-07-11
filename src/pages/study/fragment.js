// 片段: 讲道理，平常我们使用render函数，只能返回一个Dom元素,但如果我们想返回多个Dom元素这样的需求，我们就得使用 片段 ，来达成目的
import React from "react"

// 定义两个组件
function QfModel1(props){
    return(
        <div>
            <h2>我是一个组件1，请关注我</h2>
        </div>
    )
}
function QfModel2(props){
    return(
        <div>
            <h2>我是一个组件2，请关注我</h2>
        </div>
    )
}



export default class Fragment extends React.Component{
    render(){
        return(
            // 这里有两种写法可以使用React.Fragment，也可以是空标签
            // <React.Fragment>
            <>
                <QfModel1></QfModel1>
                <QfModel2></QfModel2>
            </>
            // </React.Fragment>

        )
    }
}