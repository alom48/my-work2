import React from 'react'
import Nav from './components/Nav'
import SideBar from './components/SideBar'

function Wrapper(props) {
    return (
        <>
           <Nav />
           <div class="wrraper">
                <div class="left-content">
                <SideBar />
                </div>
                <div class="right-content">
                {props.children}
                </div>
            </div> 
        </>
    )
}

export default Wrapper
