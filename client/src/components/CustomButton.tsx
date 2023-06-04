import React from 'react'
export type Props = {
  type? : string;
  title?: string;
  handleClick? : any;
  customStyle? : string;
}

const CustomButton = (props : Props) => {
  const {type , title,handleClick,customStyle} = props
  return (
    <div>CustomButton</div>
  )
}

export default CustomButton