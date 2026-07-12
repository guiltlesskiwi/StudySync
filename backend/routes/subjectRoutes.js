const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");

router.post("/", protect, createSubject);
router.get("/", protect, getSubjects);
router.put("/:id", protect, updateSubject);
router.delete("/:id", protect, deleteSubject);

module.exports = router;