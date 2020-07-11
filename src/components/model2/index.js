import React from "react"

import "./style.scss"

export default function Model2(props){
    return(
        <div className='model'>
            <div>{props.title}</div>
            <div>{props.children}</div>
            <div>{props.button}</div>
        </div>
    )
}
