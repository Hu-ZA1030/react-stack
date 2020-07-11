import React from "react"

// 容器组件： 对UI组件进行包装或者修饰
// UI组件：普普通通的业务组件

// 无状态组件 也叫函数组件
// function Model(props){
//     return()
// }

// 这就是一个函数(纯函数)，同时也是容器组件
// 第一个参数：必须是组件,不是组件会报错
export default function hoc(WrappedComponent){
    return class extends React.Component{
        constructor(props){
            super(props)
            this.state = {
                msg:"hello Hoc",
                arr:[
                    {id:1,label:"中国"},
                    {id:2,label:"德国"},
                    {id:3,label:"英国"},
                    {id:4,label:"法国"},
                ]
            }
        }
        componentDidMount(){
            console.log("componentDidMount")
        }
        click(){
            console.log("child click",this)
        }
        createList(){
         let {arr} = this.state
         return arr.map(ele=>(
         <div key={ele.id}>{ele.label}</div>
         ))   
        }

        render(){
            return(
                <div>
                    <h3>Hoc header</h3>
                    <WrappedComponent msg={this.state.msg}
                    onTest={this.click.bind(this)}
                    onInit={this.createList.bind(this)}
                    >

                    </WrappedComponent>
                    <h3>hoc footer</h3>
                </div>
            )
        }
    }
}

