export default function ResultCard({result}){
  if(!result) return null
  return (
    <div style={{marginTop:18}} className="card">
      <h3>QA Wizard Result</h3>
      <div className="small">Confidence: {result.confidence ?? result.meta?.confidence ?? 'n/a'}</div>
      <div className="result">
        <pre style={{whiteSpace:'pre-wrap'}}>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  )
}
