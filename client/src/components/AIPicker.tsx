import React from 'react'
import CustomButton from './CustomButton'

export type Props = {
  prompt : string,
  setPrompt : (data : string) => void
  generatingImg : boolean
  handleSubmit : (data:string) => void
}


const AIPicker = (props : Props) => {
  const {prompt,setPrompt,generatingImg,handleSubmit} = props
  return (
    <div className='aipicker-container'>
      <textarea 
        placeholder='Ask AI....'
        value={prompt}
        rows={5}
        onChange={(e) => setPrompt(e.target.value)}
        className='aipicker-textarea'
      />
       <div className='flex flex-wrap gap-3'>
        {generatingImg ? (
          <CustomButton 
            type='outline'
            title='AI Logo'
            handleClick={()=> handleSubmit('logo')}
            customStyle='text-xs'
          />
        ) : (
          <CustomButton 
            type='filled'
            title='AI Full'
            handleClick={()=> handleSubmit('full')}
            customStyle='text-xs'
          />
        )}
        </div> 
    </div>
  )
}

export default AIPicker