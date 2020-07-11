import React from 'react'

export default class Child2 extends React.Component{
    constructor(props){
        super(props)
    }
    childclick(){
        this.props.onRoleChange("冻结用户")
    }
    render(){
        let {role} = this.props
        return(
            <div>
                <h3>子组件 - 2</h3>
                <h3>
                    {role}
                    <button role={role} onClick={this.childclick.bind(this)}>
                        改变
                    </button>
                </h3>
            </div>
        )
           
        
    }
}