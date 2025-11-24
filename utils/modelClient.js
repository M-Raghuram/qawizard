import prompts from "./prompts";
import OpenAI from "openai";

// Initialize OpenAI with your Vercel environment variable
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ----------------------------
// 1) REAL MODEL: BUG FIX MODEL
// ----------------------------
export async function runModelForFix({ images, logs, steps }) {
  try {
    const system = prompts.systemForFixer;

    const user = `
Logs:
${logs.slice(0, 4000)}

Steps:
${steps.slice(0, 4000)}

Images attached: ${images?.length || 0}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const ai_output = response.choices[0].message.content;

    return {
      success: true,
      raw: ai_output,
      verdict: "fix_required",
      confidence: 0.93,
      reasoning: ai_output,
    };
  } catch (err) {
    return {
      success: false,
      error: err.message,
    };
  }
}

// ----------------------------
// 2) REAL MODEL: QA JUDGE
// ----------------------------
export async function runModelForJudge({ images, logs, steps }) {
  try {
    const system = prompts.systemForJudge;

    const user = `
### QA JUDGE INPUT

Logs:
${logs.slice(0, 4000)}

Steps:
${steps.slice(0, 4000)}

Images Attached: ${images?.length || 0}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const ai_output = response.choices[0].message.content;

    return {
      success: true,
      status: "ok",
      verdict: "judge_result",
      confidence: 0.95,
      reasoning: ai_output,
      images_count: images?.length || 0,
      logs_length: logs?.length || 0,
      steps_length: steps?.length || 0,
    };
  } catch (err) {
    return {
      success: false,
      status: "error",
      error: err.message,
    };
  }
}
