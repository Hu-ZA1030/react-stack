import React from "react"

import "./style.scss"

export default function Model(props){
    return(
        <div className="model">
            <div>标题</div>
            {props.children}
            <div>
                <button>取消</button>
                <button>确认</button>
            </div>
        </div>
    )
}
