const express = require("express");
const multer = require("multer");
const { uploadImage, getImage } = require("../controllers/image.controller");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 }
});

router.post("/", upload.single("image"), uploadImage);
router.get("/:id", getImage);

module.exports = router;
