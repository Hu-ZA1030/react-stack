import React from "react"
export default class Life extends React.Component{
    // 挂载阶段
    /*
      构造器
      不能使用 setState(),也不能把props赋值给state
    */ 
   constructor(props){
    //调用 父类的构造器
    super(props)
    this.state = {

    }
    console.log("constructor------>")
   }

//   很少用
// static getDerivedStateFromProps(){
//   console.log("getDerivedStateFromProps------>")
//   return null
// }

//非常重要的一个生命周期
// 表示DOM 准备就绪，动态数据都已经初始化完成
// 在这这生命周期会一般写 开启长连接，开启定时器，调接口
componentDidMount(){
  console.log("componentDidMount------->")
}



// 更新阶段

// 这个生命周期函数是Diff 运输g的开关
// 意思是：当前页面是否更新？ 返回值是一个布尔值
// 但是一般也很少使用
shouldComponentUpdate(){
  console.log("shouldComponentUpdate------->")
  return true
}

// 使用很少，返回值必须是对象，它与下面的生命周期函数配合使用，但是现在他使用很少
// getSnapshotBeforeUpdate(){
//   console.log("getSnapshotBeforeUpdate------->")
//   return null
// }

// DOM 更新完成时
componentDidUpdate(){
  console.log("componentDidUpdate---------->")
}



//卸载阶段
// 表示组件将要关闭，
// 关闭长连接，清楚定时器，和 componentDidMount相对应
componentWillUnmount(){
  console.log("componentWillUnmount--------->")
}



render(){
  console.log("render-----》唯一一个必须的要的钩子函数")
}


}


/**
 * 
 * 总结：
 *  react 生命周期函数分为三个阶段： 挂载阶段，更新阶段， 卸载阶段
 * 每一个阶段都有对应的一些重要的生命周期函数：
 * 挂载阶段(3):constructor() render()  componentDidMount()
 * 更新阶段(3):shouldComponentUpdate() render() componentDidUpdate()
 * 卸载阶段：ComponentWillUnmount()
 * 
 * 
 * 
 * 
 * */ 