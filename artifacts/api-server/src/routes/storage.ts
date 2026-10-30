import { Router, type IRouter } from "express";
import { findPublicObject } from "../lib/publicObjectStorage";

const router: IRouter = Router();

router.get("/storage/public-objects/*filePath", async (req, res) => {
  try {
    const rawPath = req.params.filePath;
    const relativePath = Array.isArray(rawPath) ? rawPath.join("/") : rawPath;
    const file = await findPublicObject(relativePath);
    if (!file) {
      res.status(404).json({ error: "File not found" });
      return;
    }

    const [metadata] = await file.getMetadata();
    res.setHeader("Content-Type", String(metadata.contentType || "application/octet-stream"));
    if (metadata.size) res.setHeader("Content-Length", String(metadata.size));
    res.setHeader("Cache-Control", "public, max-age=86400");
    const [contents] = await file.download();
    res.send(contents);
  } catch (error) {
    req.log.error({ err: error }, "Failed to serve public object");
    res.status(500).json({ error: "Failed to serve public object" });
  }
});

export default router;
