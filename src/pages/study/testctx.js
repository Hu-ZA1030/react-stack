//  测试上下文的组件
import React from "react"

import {ThemeContext} from "@/utils/theme"
export default class Testctx extends React.Component{
    render(){
        console.log("ctx",this.context)
        let ctx = this.context
       return(
           <div style={{color:ctx.color,background:ctx.background}}> 
               <h3>测试上下文</h3>
            </div>
       )
    }
}

Testctx.contextType = ThemeContext