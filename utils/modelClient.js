import prompts from './prompts'
import OpenAI from "openai";

/**
 * FIXER MODEL (real)
 */
export async function runModelForFix({ images, logs, steps }) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAIKEY,   // <-- must match your Vercel Env name
    });

    const system = prompts.systemForFixer;
    const user = `Logs:\n${logs}\n\nSteps:\n${steps}\n\nImages: ${images?.length}`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user }
      ]
    });

    return JSON.parse(response.choices[0].message.content);
  } catch (err) {
    console.error("Fix model error", err);
    return {
      confidence: 0,
      verdict: "error",
      summary: "Failed to call AI model.",
      error: err.message
    };
  }
}

/**
 * JUDGE MODEL (real)
 */
export async function runModelForJudge({ images, logs, steps }) {
  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAIKEY,   // <-- must match your Vercel Env name
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a QA test result judge." },
        {
          role: "user",
          content: `Logs: ${logs}\n\nSteps: ${steps}\nImages: ${images?.length}`
        }
      ]
    });

    return {
      success: true,
      result: JSON.parse(response.choices[0].message.content)
    };
  } catch (err) {
    console.error("Judge model error", err);
    return {
      success: false,
      error: err.message
    };
  }
}
