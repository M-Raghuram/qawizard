import prompts from './prompts'

export async function runModelForFix({images, logs, steps}){
  const system = prompts.systemForFixer
  const user = `Logs:\n${logs.slice(0,4000)}\n\nSteps:\n${steps.slice(0,4000)}\n\nImages: ${images.length} attached.`

  return {
    confidence: 0.78,
    verdict: 'test_fix_required',
    summary: 'Hard-coded selector for size missing; UI differs.',
    fixed_test_case: [
      'Open product page',
      'Detect available dynamic size',
      'Select first available',
      'Click add to cart'
    ],
    corrected_code_snippet: "await page.click('.size-selector button:first-child')",
    judge_reasoning: 'Mock mode: Replace size with dynamic selection.'
  }
}
export async function runModelForJudge({ images, logs, steps }) {
  return {
    status: "ok",
    verdict: "fix_required",
    confidence: 0.67,
    reasoning: "Mock judge: analysis complete.",
    images_count: images?.length || 0,
    logs_length: logs?.length || 0,
    steps_length: steps?.length || 0
  };
}
