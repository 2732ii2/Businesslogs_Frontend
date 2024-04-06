import React from 'react'
import "./InputButtons";
export default function InputButtons(props) {
    const {value,eventHandler}=props
    var style=props?.style;
    var disabled=props?.disabled;
    var showloader=props?.showloader;
  return (
    <div style={{position:"relative"}}>
    <button onClick={eventHandler} style={style} disabled={disabled}>{value}</button>
    {showloader && <div className='loader'>
      <div id='insideloader'></div>
      </div>
    }
    </div>
  )
}
