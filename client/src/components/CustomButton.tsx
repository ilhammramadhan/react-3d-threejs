import React from 'react'
import state from '../store'
import { useSnapshot } from 'valtio';
export type Props = {
  type? : string;
  title?: string;
  handleClick? : any;
  customStyle? : string;
}

const CustomButton = (props : Props) => {
  const snap = useSnapshot(state)
  const {type , title,handleClick,customStyle} = props
  const generateStyle = (type : any) => {
    if (type === "filled"){
      return {
        backgroundColor : snap.color,
        color : '#fff'
      }
    }
  }
  return (
    <>
    <button
      className={`px-2 py-1.5 flex-1 rounded-md ${customStyle}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
    </>
  )
}

export default CustomButton