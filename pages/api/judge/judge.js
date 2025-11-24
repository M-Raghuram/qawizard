import formidable from "formidable";
import { runModelForJudge } from "../../../../utils/modelClient";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  try {
    const form = new formidable.IncomingForm({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ success: false, error: "Form parse error" });
      }

      const images = files.images || [];
      const logs = fields.logs || "";
      const steps = fields.steps || "";

      const result = await runModelForJudge({
        images,
        logs,
        steps
      });

      return res.status(200).json({ success: true, result });
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
