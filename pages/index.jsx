import { useState } from 'react'
import UploadArea from '../components/UploadArea'
import ResultCard from '../components/ResultCard'

export default function Home(){
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function analyze({images, logs, steps}){
    setLoading(true)
    setResult(null)
    try{
      const form = new FormData()
      if(logs) form.append('logs', logs)
      if(steps) form.append('steps', steps)
      if(images && images.length){
        images.forEach((f,i)=>form.append(`image_${i}`, f))
      }
      const res = await fetch('/api/judge/fixer', {method:'POST', body: form})
      const json = await res.json()
      setResult(json)
    }catch(e){
      setResult({error: e.message})
    }finally{setLoading(false)}
  }

  return (
    <div className="container">
      <div className="header">
        <div className="logo">QW</div>
        <div>
          <h1>QA Wizard</h1>
          <div className="small">Judge. Fix. Conjure. — AI-powered test case fixer and bug judge</div>
        </div>
      </div>

      <div style={{height:18}} />

      <div className="grid">
        <div>
          <div className="card">
            <h3>Upload failure screenshot, logs, or paste failing steps</h3>
            <p className="small">QA Wizard will judge whether the failure is a real bug or a test issue, then propose a corrected test case and automation fix.</p>
            <UploadArea onAnalyze={analyze} loading={loading} />
          </div>
        </div>

        <div>
          <div className="card">
            <h4>Quick Guide</h4>
            <ol className="small">
              <li>Upload 1–3 screenshots showing failure</li>
              <li>Paste console/log excerpt (optional)</li>
              <li>Paste the failing test steps or automation script</li>
              <li>Click Analyze — QA Wizard will return JSON + human summary</li>
            </ol>
            <div style={{height:12}}/>
            <button className="button" onClick={()=>alert('Starter is free — deploy to Vercel.')}>Deploy to Vercel</button>
          </div>
        </div>
      </div>

      {result && <ResultCard result={result} />}
    </div>
  )
}
