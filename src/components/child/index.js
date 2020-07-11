import React from 'react'

// 无状态组件,没有state，只有props
function Child(props){
    return(
        <div>
            <h1>我是user子组件</h1> 
            {/* 接收父组件传递过来参数 */}
            <span>{props.aaa}</span> 
            <span>{props.bbb}</span>
        </div>
    )
}

export default Child