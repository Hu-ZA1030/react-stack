// Hooks 它是一组函数API

// useState
// useEffect（副作用）:开启长连接、调接口、DOM操作、定时器等
// useContext
// 自定义Hooks

// 解决问题：类组件  函数组件（无状态组件）
// Hooks，让函数式组件可以拥有state、生命周期等特性

import React, { useState, useEffect } from 'react'
console.log('use', useState)
export default function TestHook(props) {

  let [count, setCount] = useState(20)
  let [msg, setMsg] = useState('hello hook')
  let [list, setList] = useState([])

  var timer = null
  function countChange() {
    setCount(count+1)
    setMsg(msg+'1')
  }

  // componentDidMount   mounted
  // componentDidUpdate  updated
  // componentWillUnmount  beforeDestroyed
  // 使用定时器

  // useEffect第一个参数，必须是一个函数，并且这个函数要有返回值
// 第二个参数是开关，若是定时器，第二个参数改变一次，定时器启动一次
  useEffect(()=>{
    // 调接口，开启长连接、开启定时
    // 做其它初始化的业务逻辑
    console.log('-----effect')
    timer = setInterval(()=>{
      setCount(count+1)
    }, 1000)
    return ()=>{
      // 清除长连接、清除定时器
      clearInterval(timer)
    }
  }, [msg,list]) // 开关

  // 使用长连接
  useEffect(()=>{
    // open websocket
    return ()=>{
      // close websocket
    }
  })

  useEffect(()=>{
    document.title = '你们'
    document.getElementById('box').style.color = 'red'
    return undefined
  })

  return (
    <div>
      <h1>Hooks测试</h1>
      <h3>{count}</h3>
      <button onClick={countChange}>增加</button>
      <hr/>
      <h3>{msg}</h3>
      <h3 id='box'>ref dom</h3>
    </div>
  )
}
