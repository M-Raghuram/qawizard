import { runModelForJudge } from '../../../utils/modelClient';

export default async function handler(req, res) {
  try {
    const body = req.body || {};
    const result = await runModelForJudge(body);
    res.status(200).json({ success: true, result });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
}
