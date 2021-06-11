import React from 'react'

const TabMain = () => {
    return (
        <div className="tabs is-centered is-fullwidth  has-text-danger has-text-weight-normall is-size-6 p-0 has-background-white" >
                <ul>
                    <li className="is-active"><a href="#">نرم افزار </a></li>
                    <li><a href="#">برق</a></li>
                    <li><a href="#">مکانیک</a></li>
                    <li><a href="#">معماری</a></li>
                    <li><a href="#">الکترونیک</a></li>
                </ul> 
        </div>
    )
}

export default TabMain ; 
