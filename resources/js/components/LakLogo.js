import React from 'react'

const LakLogo = (props) => {
    return (
        <img id="logo" src={ props.path } alt="logo" style={{ align: "middle", width: "20%", height: "20%" }} className={props.display ? "hide":"show"}/>
    )
}

export default LakLogo
