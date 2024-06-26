import React from 'react'
import "./InputButtons";
export default function InputButtons(props) {
    const {value,eventHandler}=props
    var style=props?.style;
    var disabled=props?.disabled;
    var showloader=props?.showloader;
  return (
    <div className='buttonsupper' style={{position:"relative",display:"flex",justifyContent:"center",alignItems:"center"}}>
    <button onClick={eventHandler} style={style} disabled={disabled}>
      
    {
    showloader && <div className='loader'>
      <div id='insideloader'></div>
      </div>
    
    } 
      {showloader?null: value}
    
    
    </button>
    
    </div>
  )
}
