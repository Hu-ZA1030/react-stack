import React from 'react'

export default class child1 extends React.Component{
    constructor(props){
        super(props)
    }
    childClick(){
        this.props.onRoleChange("冻结用户")
    }
    render(){
        console.log("111",this.props)
        let {role} = this.props
        return(
            <div>
                <h3>子组件 - 1</h3>
                <h3>
                    {role}
                    <button onClick={this.childClick.bind(this)}>改变</button>
                </h3>
            </div>
        )
    }
}