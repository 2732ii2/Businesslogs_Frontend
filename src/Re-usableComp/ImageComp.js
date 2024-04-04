import React from 'react'

export default function ImageComp({src,style,onClick}) {
  return (
    <>
     <img src={src} style={style} onClick={onClick} /></>
  )
}
