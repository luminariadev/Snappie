import express from "express";
import {
  getAllFrames,
  addFrame,
  getFrameById,
  deleteFrame,
  updateFrame,
} from "../controllers/frameController.js";
import { uploadFrame } from "../middleware/uploadFrame.js";

const router = express.Router();

router.get("/", getAllFrames);
router.get("/:id", getFrameById);
router.post(
  "/",
  uploadFrame.fields([
    { name: "thumb", maxCount: 1 },
    { name: "frame1", maxCount: 1 },
    { name: "frame3", maxCount: 1 },
    { name: "frame4", maxCount: 1 },
  ]),
  addFrame
);

router.put(
  "/:id",
  uploadFrame.fields([
    { name: "thumb", maxCount: 1 },
    { name: "frame1", maxCount: 1 },
    { name: "frame3", maxCount: 1 },
    { name: "frame4", maxCount: 1 },
  ]),
  updateFrame
);

router.delete("/:id", deleteFrame);

export default router;
