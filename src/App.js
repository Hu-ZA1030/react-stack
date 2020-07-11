// 引入 react
import React from "react"
import "@/assets/css/style.scss"
import {Jsx,Event,Condition,List,Form,Combine,Stat,Fragment,Testctx,Testhoc} from "./pages"

import  {ThemeContext,theme} from "@/utils/theme"

// 路由
import {
    HashRouter,
    NavLink,
    Route,
    Switch,
    Redirect,
} from "react-router-dom"

import routes from "@/pages"

 class App extends React.Component{
     constructor(props){
        super(props)
        this.state={
            curTheme:theme.dark
        }
        
     }
     // 点击 更换主题
     changeTheme(){
        var i = Math.random()
        if(i<0.3){
            this.setState({curTheme:theme.dark})
        }else if(i<0.6 && i>0.3){
            this.setState({curTheme:theme.light})
        }else{
            this.setState({curTheme:theme.pink})
        }
     }
    // 遍历循环，生成左边导航
    // exact 精准匹配
    // activeClassName 高亮样式
    createNavList(){
        return routes.map(ele=>(
            <div key={ele.id} className="link">
                <NavLink 
                    to={ele.path}
                    exact
                    activeClassName="on">
                    {ele.text}
                </NavLink>
            </div>
        ))
    }
    // 遍历循环，生成右边主题内容
    // 这里不能嵌套div，因为Router 和 Switch 是直接的父子关系，中间不能有其他元素包裹，保证匹配是path有且只有一对成立
    createRoute(){
        var res = []
        routes.map(ele=>{
            res.push(
                <Route
                    key={ele.id}
                    exact
                    path={ele.path}
                    component={ele.component}>
                </Route>
            )
            if(ele.children){
                ele.children.map(ele=>{
                    res.push(
                        <Route
                            key={ele.id}
                            exact
                            path={ele.path}
                            component={ele.component}>
                        </Route>
                    )
                })
            }
        })
        return res
    }
     render(){ 
         let {curTheme} = this.state
         console.log(this.state)
        return(
            <HashRouter>
                <div>
                    <div className="left">
                        {this.createNavList()}
                    </div>
                    <div className="right">
                        {/* 
                            这是一组匹配规则，从上到下进行匹配，若匹配到，则不会往下继续匹配，哪怕后面也能匹配成功
                        */}
                        <Switch>
                            {this.createRoute()}
                            <Redirect
                                from="/*"
                                to="/">
                            </Redirect>
                        </Switch>
                    </div>
                </div>

            </HashRouter>

        )
     }
 }

 export default App