import { useRef, useState } from 'react'
export default function UploadArea({onAnalyze, loading}){
  const fileRef = useRef()
  const [images, setImages] = useState([])
  const [logs, setLogs] = useState('')
  const [steps, setSteps] = useState('')

  function onFiles(e){
    const files = Array.from(e.target.files)
    setImages(files)
  }
  async function submit(){
    if(loading) return
    await onAnalyze({images, logs, steps})
  }
  return (
    <div>
      <div className="upload card">
        <input ref={fileRef} type="file" multiple accept="image/*" onChange={onFiles} />
        <div style={{height:8}} />
        <div className="small">Selected: {images.length} file(s)</div>
        <div style={{height:8}} />
        <textarea placeholder="Paste logs or console output (optional)" rows={6} value={logs} onChange={e=>setLogs(e.target.value)} style={{width:'100%',marginTop:8}} />
        <div style={{height:8}} />
        <textarea placeholder="Paste failing test steps or automation script (optional)" rows={6} value={steps} onChange={e=>setSteps(e.target.value)} style={{width:'100%'}} />
        <div style={{height:12}} />
        <div style={{display:'flex',gap:8}}>
          <button className="button" onClick={submit} disabled={loading}>{loading? 'Analyzing...': 'Analyze with QA Wizard'}</button>
          <button className="button" style={{background:'#334155'}} onClick={()=>{setImages([]); setLogs(''); setSteps('')}}>Clear</button>
        </div>
      </div>
    </div>
  )
}
