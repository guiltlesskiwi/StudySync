const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createChapter,
  getChapters,
  updateChapter,
  deleteChapter,
} = require("../controllers/chapterController");

router.post("/", protect, createChapter);
router.get("/", protect, getChapters);
router.put("/:id", protect, updateChapter);
router.delete("/:id", protect, deleteChapter);

module.exports = router;