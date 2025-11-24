import formidable from 'formidable'
import fs from 'fs'
import { runModelForFix } from '../../../../utils/modelClient'

export const config = { api: { bodyParser: false } }

export default async function handler(req, res){
  try{
    const form = formidable({ multiples: true })
    form.parse(req, async (err, fields, files) => {
      if(err) return res.status(500).json({error: 'form parse error', detail: err.message})

      const logs = fields.logs || ''
      const steps = fields.steps || ''
      const images = []
      Object.keys(files).forEach(k=>{
        const f = files[k]
        const buffer = fs.readFileSync(f.filepath)
        images.push({name: f.originalFilename, data: buffer.toString('base64')})
      })

      const result = await runModelForFix({images, logs, steps})
      res.status(200).json(result)
    })
  }catch(e){
    res.status(500).json({error: e.message})
  }
}
