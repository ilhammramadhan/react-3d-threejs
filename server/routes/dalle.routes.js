import express from 'express'
import * as dotenv from 'dotenv'
import {Configuration,OpenAIApi} from 'openai'


dotenv.config()
const router = express.Router()

const config = new Configuration({
  apiKey : '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'
})

const openai = new OpenAIApi(config)

router.route('/').get((req,res)=> {
  res.status(200).json({message : "Dalle Route"})
})

router.route('/').post(async(req,res)=> {
  try {
    const {prompt} = req.body
    console.log('body',prompt)
    const response = await openai.createImage({
      prompt,
      n:1,
      size : '1024x1024',
      response_format : 'b64_json'
    })
    console.log('response',response)
    const image = response.data.data[0].b64_json
    res.status(200).json({photo : image})
  } catch (error) {
    console.log(error)
    res.status(500).json({message : "Something Went Wrong"})
  }
})


export default router