import React from 'react'
import "./InputButtons";
export default function InputButtons(props) {
    const {value,eventHandler}=props
  return (
    <>
    <button onClick={eventHandler}>{value}</button>
    </>
  )
}
